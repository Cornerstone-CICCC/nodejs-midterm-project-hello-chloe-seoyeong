import { Request, Response, NextFunction } from "express";

export const checkLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.isLoggedIn) {
    res.status(303).redirect("/");
    return;
  }
  next();
};

export const checkLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.isLoggedIn === "false") {
    res.status(303).redirect("/login");
    return;
  }
  next();
};
