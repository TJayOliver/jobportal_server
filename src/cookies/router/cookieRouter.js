import express from "express";
import userConsent from "../controller/cookieController.js";

const cookieRouter = express.Router();

cookieRouter.post("/cookie", userConsent);

export default cookieRouter;
