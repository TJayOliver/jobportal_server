import AdministratorController from "../controller/administratorController.js";
import AdministratorService from "../service/administratorService.js";
import AdministratorDatabase from "../database/administratorDatabase.js";

export const administratorDependencies = () => {
  const externalDatabase = new AdministratorDatabase();
  const administratorService = new AdministratorService(externalDatabase);
  const administratorController = new AdministratorController(
    administratorService
  );

  return { administratorController };
};
