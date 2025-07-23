import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  let details = err.details || undefined;
  let type = err.type || "server_error";

  // Map known error types/status codes
  if (err.name === "ValidationError" || status === 422) {
    status = 422;
    type = "validation_error";
    message = message || "Validation failed";
  } else if (status === 400) {
    type = "bad_request";
  } else if (status === 401) {
    type = "unauthorized";
  } else if (status === 403) {
    type = "forbidden";
  } else if (status === 404) {
    type = "not_found";
  } else if (status === 409) {
    type = "conflict";
  } else if (status === 500) {
    type = "server_error";
  }

  // Log error
  if (process.env.NODE_ENV !== "test") {
    console.error("Error:", err);
  }

  // Build response
  const response: any = {
    success: false,
    type,
    message,
  };
  if (details) response.details = details;
  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }
  res.status(status).json(response);
}
