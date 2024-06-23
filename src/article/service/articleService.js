import { cacheTime, myCache } from "../../../configuration/cache.config.js";
import { nanoid } from "nanoid";
import { storeToFirebase, deleteFromFirebase } from "../../../lib/storeFirebase.js";

class ArticleService {
  constructor(database) {
    this.database = database;
  }

  async createArticleService(articleData) {
    try {
      const uploaded = await storeToFirebase(jobDetails.image);
      const imageUrl = uploaded.imageURL;
      const imageName = uploaded.imageName;
      if (!uploaded.error) {
        const articleContent = {
          id: nanoid(),
          image: imageUrl,
          imagename: imageName,
          title: articleData.title,
          author: articleData.author,
          post: articleData.post,
          featured: articleData.post,
          mainfeatured: articleData.featured,
          category: articleData.category,
        };
        const article = await this.database.createArticle(articleContent);
        return article;
      } else {
        return { error: uploaded.error };
      }
    } catch (error) {
      console.error("service {create article}:", error.message);
    }
  }

  async countArticleService() {
    try {
      const count = await this.database.countArticle();
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
      const article = await this.database.readArticleByCategory(articleCategory);
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

  async updateArticleService(articleData) {
    try {
      // admin wants to update the old image
      if (articleData.image !== undefined) {
        const deleteImage = await this.readArticleByIdService(articleData.id);
        const deleteImageName = deleteImage.imagename;
        const deletedImageFromFirebase = await deleteFromFirebase(deleteImageName);
        if (deletedImageFromFirebase) {
          const uploaded = await storeToFirebase(articleData.image);
          const imageUrl = uploaded.imageURL;
          const imageName = uploaded.imageName;
          if (!uploaded.error) {
            const articleContent = {
              id: articleData.id,
              image: imageUrl,
              imagename: imageName,
              title: articleData.title,
              post: articleData.post,
              featured: articleData.featured,
              mainfeatured: articleData.mainfeatured,
              category: articleData.category,
            };
            const article = await this.database.updateArticle(articleContent);
            return article;
          } else {
            return { error: uploaded.error };
          }
        } else {
          return { error: "Image wasn't deleted from firebase" };
        }
      } else {
        // admin wants to keep the old image
        const retrieveOldImage = await this.readArticleByIdService(id);
        const retrievedOldImageName = retrieveOldImage.imagename;
        const retrievedImageNameLink = retrieveOldImage.image;
        const articleContent = {
          id: articleData.id,
          image: retrievedImageNameLink,
          imagename: retrievedOldImageName,
          title: articleData.title,
          post: articleData.post,
          featured: articleData.featured,
          mainfeatured: articleData.mainfeatured,
          category: articleData.category,
        };
        const article = await this.database.updateArticle(articleContent);
        return article;
      }
    } catch (error) {
      console.error("service {update article}", error.message);
    }
  }

  async deleteArticleService(id) {
    try {
      const getImage = await this.readArticleByIdService(id);
      const image = getImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(image);
      if (deletedImageFromFirebase) {
        const article = await this.database.deleteArticle(id);
        return article;
      } else {
        return { error: "Could Not Delete Image From Firebase" };
      }
    } catch (error) {
      console.error("service {delete article}", error.message);
    }
  }
}

export default ArticleService;
