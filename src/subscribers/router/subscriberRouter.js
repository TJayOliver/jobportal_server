import express from "express";
import { subscriberDependencies } from "../settings/subscriberDependency.js";
import { check } from "express-validator";
import adminLimiter from "../../../configuration/rateLimiter.js";

const validate = [
  check("email").isEmail().withMessage("Please enter a valid email address"),
];

const { subscriberController } = subscriberDependencies();

const subscriberRouter = express.Router();

subscriberRouter.get("/subscriber/read", async (req, res) =>
  subscriberController.readSubcriber(req, res)
);

subscriberRouter.get("/messages", async (req, res) =>
  subscriberController.readMessages(req, res)
);

subscriberRouter.post("/subscriber/create", validate, async (req, res) =>
  subscriberController.createSubscriber(req, res)
);

subscriberRouter.post("/subscriber/notify", async (req, res) =>
  subscriberController.notifySubscribers(req, res)
);

subscriberRouter.delete("/messages/delete", async (req, res) =>
  subscriberController.deleteMessages(req, res)
);

subscriberRouter.post(
  "/unsubscribe",
  adminLimiter,
  validate,
  async (req, res) => subscriberController.unSubscribe(req, res)
);

export default subscriberRouter;
