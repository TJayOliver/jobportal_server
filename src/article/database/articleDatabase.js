import { executeQuery } from "../../../configuration/mysql.config.js";

class ArticleDatabase {
  async createArticle(articleData) {
    try {
      const query = `INSERT INTO articles
            (id,image,author,title,post,featured,mainfeatured, category)
            VALUES(?,?,?,?,?,?,?,?)`;
      const parameter = [
        articleData.id,
        articleData.image,
        articleData.author,
        articleData.title,
        articleData.post,
        articleData.featured,
        articleData.mainfeatured,
        articleData.category,
      ];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async countArticle() {
    try {
      const query = `SELECT COUNT (id) FROM articles`;
      const article = await executeQuery(query);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readAllArticles() {
    try {
      const query = `SELECT *,
            DATE_FORMAT(datecreated, '%d/%m/%y') 
            AS datecreated 
            FROM articles 
            ORDER BY datecreated 
            DESC`;
      const articles = await executeQuery(query);
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async readArticleById(articleID) {
    try {
      const query = `
            SELECT *, 
            DATE_FORMAT(datecreated, '%d/%M/%Y') AS datecreated 
            FROM articles WHERE id=?`;
      const parameter = [articleID];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readArticleByCategory(articlecategory) {
    try {
      const query = `SELECT *, 
            DATE_FORMAT(datecreated, '%d/%m/%y') AS datecreated 
            FROM articles 
            WHERE category=? 
            LIMIT 4`;
      const parameter = [articlecategory];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readFeaturedArticle(articleValue) {
    try {
      const query = `SELECT *,
            DATE_FORMAT(datecreated, '%d/%m/%y') 
            AS datecreated 
            FROM articles 
            WHERE featured=? 
            LIMIT 3`;
      const parameter = [articleValue];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async readMainFeaturedArticle(articleValue) {
    try {
      const query = `SELECT *,
            DATE_FORMAT(datecreated, '%d/%m/%y') AS datecreated FROM articles 
            WHERE mainfeatured=? 
            LIMIT 1`;
      const parameter = [articleValue];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async editArticle(articleID) {
    try {
      const query = `SELECT * FROM articles WHERE id=?`;
      const parameter = [articleID];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async updateArticle(articleData) {
    try {
      const query = `
            UPDATE articles 
            SET 
            image=?, 
            title=?, 
            post=?, 
            featured=?, 
            mainfeatured=?, 
            category=? 
            WHERE id=?`;
      const parameter = [
        articleData.image,
        articleData.title,
        articleData.post,
        articleData.featured,
        articleData.mainfeatured,
        articleData.category,
        articleData.id,
      ];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(articleID) {
    try {
      const query = `DELETE FROM articles WHERE id=?`;
      const parameter = [articleID];
      const article = await executeQuery(query, parameter);
      return article;
    } catch (error) {
      throw error;
    }
  }
}

export default ArticleDatabase;
