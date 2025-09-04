import { Response } from "express";

export function sendError(
  res: Response,
  status: number,
  path: string,
  message: string
) {
  return res.status(status).json({
    error: "Validation error",
    details: [{ path, message }],
  });
}
