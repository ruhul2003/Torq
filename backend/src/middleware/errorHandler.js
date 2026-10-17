/**
 * 404 Route Not Found Middleware
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Global API Error Handling Middleware
 */
export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Luxury Server Error";
  let details = null;

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    details = Object.values(err.errors).map((e) => e.message);
  }

  // Handle Mongoose Invalid ObjectId Cast Error
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format for parameter: ${err.path}`;
  }

  // Handle MongoDB Duplicate Key Error (11000)
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate record found. An entry with that ${duplicateField} already exists.`;
  }

  console.error(`[Error] [${req.method} ${req.url}]:`, err.message);

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export default errorHandler;
