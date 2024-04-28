import { cacheTime, myCache } from "../../../configuration/cache.config.js";
import { nanoid } from "nanoid";

class ArticleService {
  constructor(database) {
    this.database = database;
  }

  async createArticleService({
    title,
    post,
    featured,
    mainfeatured,
    author,
    category,
    image,
  }) {
    try {
      const articleData = {
        id: nanoid(),
        title,
        author,
        post,
        featured,
        mainfeatured,
        category,
        image,
      };
      const article = await this.database.createArticle(articleData);
      return article;
    } catch (error) {
      console.error("service {create article}:", error.message);
    }
  }

  async countArticleService() {
    try {
      const article = await this.database.countArticle();
      let count = "";
      article.map((newData) => {
        const number = Object.values(newData);
        count += number;
      });
      return count;
    } catch (error) {
      console.error("service {count article}:", error.message);
    }
  }

  async readAllArticleService() {
    const cacheKey = "readArticle";
    try {
      const cachedData = await myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const article = await this.database.readAllArticles();
      myCache.set(cacheKey, article, cacheTime);
      return article;
    } catch (error) {
      console.error("service {real all articles}", error.message);
    }
  }

  async readArticleByIdService(id) {
    const cacheKey = "readArticleById";
    try {
      const cachedData = await myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const article = await this.database.readArticleById(id);
      myCache.set(cacheKey, article, cacheTime);
      return article;
    } catch (error) {
      console.error("service {read article by id}", error.message);
    }
  }

  async readArticleByCategoryService(articleCategory) {
    const cacheKey = "articleCategory";
    try {
      const data = await myCache.get(cacheKey);
      if (data) return data;
      const article = await this.database.readArticleByCategory(
        articleCategory
      );
      myCache.set(cacheKey, article, cacheTime);
      return article;
    } catch (error) {
      console.error("service {read article by category}", error.message);
    }
  }

  async readFeaturedArticleService(articleValue) {
    const cacheKey = "readfeaturedarticle";
    try {
      const data = await myCache.get(cacheKey);
      if (data) return data;
      const article = await this.database.readFeaturedArticle(articleValue);
      myCache.set(cacheKey, article, cacheTime);
      return article;
    } catch (error) {
      console.error("service {read featured article}", error.message);
    }
  }

  async readMainFeaturedArticleService(articleValue) {
    const cacheKey = "readmainfeaturedarticle";
    try {
      const data = await myCache.get(cacheKey);
      if (data) return data;
      const article = await this.database.readMainFeaturedArticle(articleValue);
      myCache.set(cacheKey, article, cacheTime);
      return article;
    } catch (error) {
      console.error("service {read main featured article}:", error.message);
    }
  }

  async editArticleService(id) {
    try {
      const article = await this.database.editArticle(id);
      return article;
    } catch (error) {
      console.error("service {edit article}:", error.message);
    }
  }

  async updateArticleService({
    id,
    title,
    post,
    featured,
    mainfeatured,
    category,
    image,
  }) {
    try {
      const articleData = {
        id,
        title,
        post,
        featured,
        mainfeatured,
        category,
        image,
      };
      const article = await this.database.updateArticle(articleData);
      return article;
    } catch (error) {
      console.error("service {update article}", error.message);
    }
  }

  async deleteArticleService(id) {
    try {
      const article = await this.database.deleteArticle(id);
      return article;
    } catch (error) {
      console.error("service {delete article}", error.message);
    }
  }
}

export default ArticleService;
