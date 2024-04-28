import express from "express";
import { subscriberDependencies } from "../settings/subscriberDependency.js";
import { check } from "express-validator";

const validate = [
  check("email").isEmail().withMessage("Please enter a valid email address"),
];

const { subscriberController } = subscriberDependencies();

const subscriberRouter = express.Router();

subscriberRouter.get("/subscriber/read", async (req, res) =>
  subscriberController.readSubcriber(req, res)
);

subscriberRouter.post("/subscriber/create", validate, async (req, res) =>
  subscriberController.createSubscriber(req, res)
);

subscriberRouter.post("/subscriber/notify", async (req, res) =>
  subscriberController.notifySubscribers(req, res)
);

subscriberRouter.delete("/unsubscribe/:id", async (req, res) =>
  subscriberController.unSubscribe(req, res)
);

export default subscriberRouter;
