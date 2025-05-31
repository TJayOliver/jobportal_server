import express from "express";
import { jobDependency } from "../settings/jobDependency.js";

const jobRouter = express.Router();

const { jobController } = jobDependency();

jobRouter.get("/job", async (req, res) => jobController.readAllJobs(req, res));
jobRouter.get("/job/read/:id", async (req, res) =>
  jobController.readJobByID(req, res)
);
jobRouter.get("/job/category/:jobcategory", async (req, res) =>
  jobController.readJobByCategory(req, res)
);
jobRouter.get("/job/featured", async (req, res) =>
  jobController.readFeaturedJob(req, res)
);
jobRouter.get("/job/count", async (req, res) =>
  jobController.countJob(req, res)
);
jobRouter.get("/job/edit/:id", async (req, res) =>
  jobController.editJob(req, res)
);
jobRouter.post("/job/create", async (req, res) =>
  jobController.createJob(req, res)
);
jobRouter.post("/job/search", async (req, res) =>
  jobController.searchJobByPosition(req, res)
);
jobRouter.post("/job/filtersearch", async (req, res) =>
  jobController.searchJobByRecentAndOldest(req, res)
);
jobRouter.post("/job/checkboxfilter", async (req, res) =>
  jobController.searchJobByFilters(req, res)
);
jobRouter.put("/job/update/:id", async (req, res) =>
  jobController.updateJob(req, res)
);
jobRouter.delete("/job/delete/:id", async (req, res) =>
  jobController.deleteJob(req, res)
);

export default jobRouter;
