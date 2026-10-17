import Car from "../models/Car.js";
import Review from "../models/Review.js";
import { seedCars } from "../data/seedCars.js";

/**
 * Retrieve all vehicles in hiring fleet with filters and search.
 */
export async function getAllCars(req, res, next) {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      seats,
      sort = "rating",
      availableOnly,
    } = req.query;

    const query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (availableOnly === "true") {
      query.isAvailable = true;
    }

    if (minPrice || maxPrice) {
      query.dailyRate = {};
      if (minPrice) query.dailyRate.$gte = Number(minPrice);
      if (maxPrice) query.dailyRate.$lte = Number(maxPrice);
    }

    if (seats) {
      query["specs.seats"] = Number(seats);
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { "specs.fuelType": searchRegex },
      ];
    }

    // Sort mapping
    let sortOption = { rating: -1, createdAt: -1 };
    if (sort === "price_asc") sortOption = { dailyRate: 1 };
    if (sort === "price_desc") sortOption = { dailyRate: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };

    let cars = await Car.find(query).sort(sortOption).lean();

    // In-memory fallback if database has not been seeded yet
    if (!cars || cars.length === 0) {
      let filtered = [...seedCars];
      if (category && category !== "all") {
        filtered = filtered.filter((c) => c.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(s) ||
            c.location.toLowerCase().includes(s) ||
            c.description.toLowerCase().includes(s)
        );
      }
      if (minPrice) filtered = filtered.filter((c) => c.dailyRate >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter((c) => c.dailyRate <= Number(maxPrice));

      return res.status(200).json({
        success: true,
        count: filtered.length,
        isFallbackData: true,
        data: filtered,
      });
    }

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieve single vehicle by slug or ObjectId with associated customer reviews.
 */
export async function getCarDetails(req, res, next) {
  try {
    const { identifier } = req.params;

    let car = null;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      car = await Car.findById(identifier).lean();
    }
    if (!car) {
      car = await Car.findOne({ slug: identifier.toLowerCase() }).lean();
    }

    // Fallback lookup from seed data if not found in db
    if (!car) {
      const match = seedCars.find(
        (c) => c.slug === identifier.toLowerCase() || c.name.toLowerCase().includes(identifier.toLowerCase())
      );
      if (match) {
        return res.status(200).json({
          success: true,
          isFallbackData: true,
          data: match,
          reviews: [],
        });
      }

      return res.status(404).json({
        success: false,
        error: `Vehicle not found for identifier: ${identifier}`,
      });
    }

    const reviews = await Review.find({ carSlug: car.slug })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      data: car,
      reviews,
    });
  } catch (error) {
    next(error);
  }
}
