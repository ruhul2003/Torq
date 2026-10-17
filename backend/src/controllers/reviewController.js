import Review from "../models/Review.js";
import Car from "../models/Car.js";

/**
 * Retrieve reviews with optional carSlug filter.
 */
export async function getReviews(req, res, next) {
  try {
    const { carSlug, limit = 20 } = req.query;

    const query = {};
    if (carSlug) {
      query.carSlug = carSlug.toLowerCase();
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Submit verified car hire review and recalculate vehicle rating score.
 */
export async function createReview(req, res, next) {
  try {
    const {
      carSlug,
      userName,
      userEmail,
      rating,
      title,
      comment,
      aspects = { vehiclePerformance: 5, conciergeService: 5, deliveryCondition: 5 },
    } = req.body;

    if (!carSlug || !userName || !userEmail || !rating || !comment) {
      return res.status(400).json({
        success: false,
        error: "Vehicle, reviewer name, email, rating, and comment are required.",
      });
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5.",
      });
    }

    const car = await Car.findOne({ slug: carSlug.toLowerCase() });

    const newReview = await Review.create({
      car: car?._id || undefined,
      carSlug: carSlug.toLowerCase(),
      carName: car?.name || carSlug,
      userName: userName.trim(),
      userEmail: userEmail.toLowerCase().trim(),
      rating: numRating,
      title: title || "Exhilarating Luxury Experience",
      comment: comment.trim(),
      aspects,
      isVerifiedHire: true,
    });

    // Recalculate vehicle rating if car exists in database
    if (car) {
      const allCarReviews = await Review.find({ carSlug: car.slug });
      const avg =
        allCarReviews.reduce((sum, r) => sum + r.rating, 0) / allCarReviews.length;
      car.rating = Math.round(avg * 10) / 10;
      car.reviewsCount = allCarReviews.length;
      await car.save();
    }

    res.status(201).json({
      success: true,
      message: "Thank you for reviewing your Torq motoring experience.",
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a review (Admin).
 */
export async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found.",
      });
    }

    // Recalculate rating
    const car = await Car.findOne({ slug: review.carSlug });
    if (car) {
      const remainingReviews = await Review.find({ carSlug: car.slug });
      if (remainingReviews.length > 0) {
        const avg =
          remainingReviews.reduce((sum, r) => sum + r.rating, 0) /
          remainingReviews.length;
        car.rating = Math.round(avg * 10) / 10;
        car.reviewsCount = remainingReviews.length;
      } else {
        car.rating = 5.0;
        car.reviewsCount = 0;
      }
      await car.save();
    }

    res.status(200).json({
      success: true,
      message: "Review successfully removed.",
    });
  } catch (error) {
    next(error);
  }
}
