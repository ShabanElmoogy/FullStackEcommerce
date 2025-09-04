import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number | string;
  role?: string;
}

export function verifyToken(allowedRoles: string[] = []) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
        id: string | number;
        role: string;
      };

      if (!decoded.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.userId = decoded.id;
      req.role = decoded.role;

      if (allowedRoles.length && !allowedRoles.includes(decoded.role.lowerCase())) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
