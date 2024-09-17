import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

interface JwtPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const isAuthDisabled = () => {
  return process.env.DISABLE_AUTH === "true";
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    
  if (isAuthDisabled()) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token do formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Adiciona os dados decodificados ao `req.user`
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

export default authenticateToken;
