import Part from "../models/Part.js";
import { seedParts } from "../data/seedParts.js";

/**
 * Retrieve all OEM car parts with rich filtering, search, and sorting.
 * Includes graceful in-memory fallback if database is currently syncing.
 */
export async function getAllParts(req, res) {
  try {
    const {
      category,
      brand,
      condition,
      inStock,
      search,
      vehicle,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    if (category && category !== "all") {
      query.category = category.toLowerCase();
    }

    if (brand && brand !== "all") {
      query.oemBrand = new RegExp(brand, "i");
    }

    if (condition && condition !== "all") {
      query.condition = condition;
    }

    if (inStock === "true" || inStock === true) {
      query.inStock = true;
      query.stockQuantity = { $gt: 0 };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (vehicle) {
      query.compatibility = { $regex: vehicle, $options: "i" };
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { partNumber: searchRegex },
        { oemBrand: searchRegex },
        { description: searchRegex },
        { subcategory: searchRegex },
        { compatibility: searchRegex },
      ];
    }

    let sortOptions = { isFeatured: -1, createdAt: -1 };
    if (sort === "price_asc") sortOptions = { price: 1 };
    if (sort === "price_desc") sortOptions = { price: -1 };
    if (sort === "rating") sortOptions = { rating: -1 };
    if (sort === "name_asc") sortOptions = { name: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    let parts = await Part.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    // Fallback to in-memory seed dataset if DB collection is unpopulated
    if (!parts || parts.length === 0) {
      const count = await Part.countDocuments();
      if (count === 0) {
        let memoryItems = [...seedParts];
        if (category && category !== "all") {
          memoryItems = memoryItems.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
        }
        if (brand && brand !== "all") {
          memoryItems = memoryItems.filter((p) =>
            p.oemBrand.toLowerCase().includes(brand.toLowerCase())
          );
        }
        if (search) {
          const q = search.toLowerCase();
          memoryItems = memoryItems.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.partNumber.toLowerCase().includes(q) ||
              p.oemBrand.toLowerCase().includes(q)
          );
        }
        return res.status(200).json({
          success: true,
          count: memoryItems.length,
          total: memoryItems.length,
          page: 1,
          pages: 1,
          data: memoryItems,
        });
      }
    }

    const total = await Part.countDocuments(query);

    res.status(200).json({
      success: true,
      count: parts.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
      data: parts,
    });
  } catch (error) {
    console.error("[PartController] getAllParts error:", error);
    // Return static seed fallback on error for maximum uptime
    res.status(200).json({
      success: true,
      count: seedParts.length,
      total: seedParts.length,
      page: 1,
      pages: 1,
      data: seedParts,
    });
  }
}

/**
 * Retrieve single car part details by slug, partNumber, or ID.
 */
export async function getPartDetails(req, res) {
  try {
    const { identifier } = req.params;

    let part = null;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      part = await Part.findById(identifier).lean();
    }

    if (!part) {
      part = await Part.findOne({
        $or: [
          { slug: identifier.toLowerCase() },
          { partNumber: identifier.toUpperCase() },
        ],
      }).lean();
    }

    // Fallback to static seed data if not in DB
    if (!part) {
      part = seedParts.find(
        (p) =>
          p.slug === identifier.toLowerCase() ||
          p.partNumber === identifier.toUpperCase()
      );
    }

    if (!part) {
      return res.status(404).json({
        success: false,
        error: `Original car part '${identifier}' not found in Torq inventory`,
      });
    }

    // Fetch related parts in same category
    let related = await Part.find({
      category: part.category,
      _id: { $ne: part._id },
    })
      .limit(4)
      .lean();

    if (!related || related.length === 0) {
      related = seedParts
        .filter((p) => p.category === part.category && p.slug !== part.slug)
        .slice(0, 4);
    }

    res.status(200).json({
      success: true,
      data: part,
      related,
    });
  } catch (error) {
    console.error("[PartController] getPartDetails error:", error);
    res.status(500).json({
      success: false,
      error: "Unable to retrieve car part details",
    });
  }
}

/**
 * Get featured flagship parts for showcase displays.
 */
export async function getFeaturedParts(req, res) {
  try {
    let parts = await Part.find({ isFeatured: true }).limit(8).lean();
    if (!parts || parts.length === 0) {
      parts = seedParts.filter((p) => p.isFeatured);
    }
    res.status(200).json({
      success: true,
      count: parts.length,
      data: parts,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      data: seedParts.filter((p) => p.isFeatured),
    });
  }
}

/**
 * Get catalog categories and aggregate statistics.
 */
export async function getPartCategories(req, res) {
  try {
    const categories = [
      { id: "all", name: "All Components", icon: "Layers" },
      { id: "brakes", name: "Braking Systems", icon: "Disc" },
      { id: "exhaust", name: "Titanium Exhausts", icon: "Flame" },
      { id: "powertrain", name: "Powertrain & Turbos", icon: "Cpu" },
      { id: "suspension", name: "Suspension & Handling", icon: "Activity" },
      { id: "aerodynamics", name: "Aerodynamics & Carbon", icon: "Wind" },
      { id: "wheels", name: "Wheels & Chassis", icon: "CircleDot" },
      { id: "interior", name: "Cockpit & Steering", icon: "Compass" },
      { id: "electronics", name: "Electronics & ECUs", icon: "Zap" },
    ];

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * Create a new OEM part record (Admin / Authorized catalog management).
 */
export async function createPart(req, res) {
  try {
    const partData = req.body;
    if (!partData.slug && partData.name) {
      partData.slug = partData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const newPart = await Part.create(partData);
    res.status(201).json({
      success: true,
      message: "OEM car part registered successfully",
      data: newPart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Update an existing car part record.
 */
export async function updatePart(req, res) {
  try {
    const { id } = req.params;
    const updated = await Part.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: "Part not found" });
    }

    res.status(200).json({
      success: true,
      message: "Part updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

/**
 * Remove a part record from active inventory.
 */
export async function deletePart(req, res) {
  try {
    const { id } = req.params;
    const removed = await Part.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ success: false, error: "Part not found" });
    }
    res.status(200).json({
      success: true,
      message: "Part removed from catalog",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
