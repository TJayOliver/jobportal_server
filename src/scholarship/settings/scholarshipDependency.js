import ScholarshipController from "../controller/scholarshipController.js";
import ScholarshipService from "../service/scholarshipService.js";
import ScholarshipDatabase from "../database/scholarshipDatabase.js";

export const scholarshipDependency = () => {
  const externalDatabase = new ScholarshipDatabase();
  const scholarshipService = new ScholarshipService(externalDatabase);
  const scholarshipController = new ScholarshipController(scholarshipService);

  return { scholarshipController };
};
