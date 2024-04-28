import JobController from "../controller/jobController.js";
import JobService from "../service/jobService.js";
import JobDatabase from "../database/jobDatabase.js";

export const jobDependency = () => {
  const externalDatabase = new JobDatabase();
  const jobService = new JobService(externalDatabase);
  const jobController = new JobController(jobService);

  return { jobController };
};
