import ArticleController from "../controller/articleController.js";
import ArticleService from "../service/articleService.js";
import ArticleDatabase from "../database/articleDatabase.js";

export const articleDependency = () => {
  const externalDatabase = new ArticleDatabase();
  const articleService = new ArticleService(externalDatabase);
  const articleController = new ArticleController(articleService);

  return { articleController };
};
