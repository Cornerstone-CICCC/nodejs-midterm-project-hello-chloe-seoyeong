import { Router } from "express";
import pageController from "../controllers/page.controller";
import { checkLoggedIn } from "../middlewares/user.middleware";
import gameController from "../controllers/game.controller";

const pageRouter = Router();

pageRouter.get("/join", checkLoggedIn, pageController.getJoin);
pageRouter.post("/join", pageController.postJoin);
pageRouter.get("/login", checkLoggedIn, pageController.getLogin);
pageRouter.post("/login", pageController.postLogin);
pageRouter.get("/gamelist", gameController.getGameList);
// pageRouter.get("/gamelist", gameController.getInMemoryGame);
pageRouter.get("/logout", pageController.getLogout);

export default pageRouter;
