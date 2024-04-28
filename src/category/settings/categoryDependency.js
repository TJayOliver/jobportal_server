import CategoryController from "../controller/categoryController.js";
import CategoryService from "../service/categoryService.js";
import CategoryDatabase from "../database/categoryDatabase.js";

export const categoryDependency = () => {
  const externalDatabase = new CategoryDatabase();
  const categoryService = new CategoryService(externalDatabase);
  const categoryController = new CategoryController(categoryService);

  return { categoryController };
};
