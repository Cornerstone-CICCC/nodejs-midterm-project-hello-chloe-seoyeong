"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoggedOut = exports.checkLoggedIn = void 0;
const checkLoggedIn = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        next();
        return;
    }
    res
        .status(403)
        .json({ message: "You are not allowed to access this resource!" });
};
exports.checkLoggedIn = checkLoggedIn;
const checkLoggedOut = (req, res, next) => {
    if (req.session && req.session.isLoggedIn === "false") {
        res.status(303).redirect("/login");
        return;
    }
    next();
};
exports.checkLoggedOut = checkLoggedOut;
