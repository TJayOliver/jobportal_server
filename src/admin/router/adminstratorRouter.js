import express from "express";
import { upload } from "../../../configuration/multer.js";
import { administratorDependencies } from "../settings/administratorDependency.js";
import passport from "../../../configuration/authentication.js";
import adminLimiter from "../../../configuration/rateLimiter.js";

const { administratorController } = administratorDependencies();

const administratorRouter = express.Router();

administratorRouter.get("/admin", async (req, res) =>
  administratorController.getAdmin(req, res)
);

administratorRouter.post(
  "/admin/signin",
  adminLimiter,
  passport.authenticate("local"),
  async (req, res) => administratorController.signInAdmin(req, res)
);

administratorRouter.delete("/admin/signout", async (req, res) =>
  administratorController.signOutAdmin(req, res)
);

administratorRouter.post(
  "/admin/create",
  upload.single("image"),
  async (req, res) => administratorController.createAdmin(req, res)
);

administratorRouter.get("/admin/read/:id", async (req, res) =>
  administratorController.getAdminByID(req, res)
);

administratorRouter.post("/admin/name", async (req, res) =>
  administratorController.getAdminByName(req, res)
);

administratorRouter.delete("/admin/delete/:id", async (req, res) =>
  administratorController.deleteAdmin(req, res)
);

export default administratorRouter;
