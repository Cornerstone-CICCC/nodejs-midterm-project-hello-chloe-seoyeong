import { Router } from "express";
import pageController from "../controllers/page.controller";
import { checkLoggedIn } from "../middlewares/user.middleware";

const pageRouter = Router();

pageRouter.get("/", pageController.getHome);
pageRouter.get("/join", checkLoggedIn, pageController.getJoin);
pageRouter.post("/join", pageController.postJoin);
pageRouter.get("/login", checkLoggedIn, pageController.getLogin);
pageRouter.post("/login", pageController.postLogin);

export default pageRouter;
