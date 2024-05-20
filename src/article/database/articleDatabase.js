import { articleModel } from "../../../schema/mongoSchema.js";

class ArticleDatabase {
  async createArticle(articleData) {
    try {
      const article = await articleModel.create(articleData);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async countArticle() {
    try {
      const article = await articleModel.countDocuments();
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readAllArticles() {
    try {
      const articles = await articleModel.find();
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async readArticleById(articleID) {
    try {
      const article = await articleModel.findOne({ id: articleID });
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readArticleByCategory(articlecategory) {
    try {
      const article = await articleModel.find({ category: articlecategory });
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readFeaturedArticle(articleValue) {
    try {
      const article = await articleModel
        .find({ featured: articleValue })
        .sort({ title: -1 });
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readMainFeaturedArticle(articleValue) {
    try {
      const article = await articleModel
        .find({ mainfeatured: articleValue })
        .limit(1)
        .sort({ datecreated: -1 });
      return article;
    } catch (error) {
      throw error;
    }
  }

  async editArticle(articleID) {
    try {
      const article = await articleModel.find({ id: articleID });
      return article;
    } catch (error) {
      throw error;
    }
  }

  async updateArticle(articleData) {
    try {
      const id = articleData?.id;
      const {
        image,
        imagename,
        title,
        post,
        featured,
        mainfeatured,
        category,
      } = articleData;
      const update = {
        image,
        imagename,
        title,
        post,
        featured,
        mainfeatured,
        category,
      };
      const article = await articleModel.updateOne({ id: id }, update);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(articleID) {
    try {
      const article = await articleModel.deleteOne({ id: articleID });
      return article;
    } catch (error) {
      throw error;
    }
  }
}

export default ArticleDatabase;
