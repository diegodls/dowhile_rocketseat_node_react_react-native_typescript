import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPlayLoad{
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ errorCode: "token.invalid" });
  }

  const [, token] = authToken.split(" ");
  //DESESTRUTURAÇÃO DO TOKEN, ele vem como "Bearer 01234", ignora a primeira posição('Bearer') e pega o segundo('01234');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPlayLoad;

    request.user_id = sub;

    return next();

  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}