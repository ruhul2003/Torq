export function requestLogger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 500
        ? "\x1b[31m" // red
        : res.statusCode >= 400
        ? "\x1b[33m" // yellow
        : res.statusCode >= 300
        ? "\x1b[36m" // cyan
        : "\x1b[32m"; // green
    const resetColor = "\x1b[0m";

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl || req.url} ${statusColor}${res.statusCode}${resetColor} - ${duration}ms`
    );
  });

  next();
}

export default requestLogger;
