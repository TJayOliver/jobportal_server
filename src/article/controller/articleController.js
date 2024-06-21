import { storeToFirebase, deleteFromFirebase } from "../../../lib/storeFirebase.js";
import { nanoid } from "nanoid";

class ArticleController {
  constructor(service) {
    this.service = service;
  }

  async createArticle(req, res) {
    const { title, author, post, featured, mainfeatured, category } = req.body;
    const image = req.file;
    try {
      const imageName = nanoid(6) + image.originalname;
      const imageUrl = await storeToFirebase(imageName);
      const articleData = {
        title,
        author,
        post,
        featured,
        mainfeatured,
        category,
        image: imageUrl,
        imagename: imageName,
      };
      const article = await this.service.createArticleService(articleData);
      return res.status(201).json({ message: "Successfully Created" });
    } catch (error) {
      console.error("controller {create article}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async countArticle(req, res) {
    try {
      const article = await this.service.countArticleService();
      return res.status(201).json({ data: article });
    } catch (error) {
      console.error("controller {count article}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readAllArticle(req, res) {
    const callCookie = res.locals.callCookie;
    const country = res.locals.country;
    try {
      const articles = await this.service.readAllArticleService();
      return res.status(201).json({
        message: "Successfully Retrieved",
        callCookie,
        country,
        data: articles,
      });
    } catch (error) {
      console.error("controller {read all articles}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readArticleByID(req, res) {
    const { id } = req.params;
    try {
      const article = await this.service.readArticleByIdService(id);
      return res.status(201).json({ message: "Successfully Received", data: [article] });
    } catch (error) {
      console.error("controller {read article by id}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readArticleByCategory(req, res) {
    const { category } = req.params;
    try {
      const article = await this.service.readArticleByCategoryService(category);
      return res.status(201).json({ message: "Retrieved Successfully", data: article });
    } catch (error) {
      console.error("controller {read article by category}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readFeaturedArticle(req, res) {
    try {
      const value = "true";
      const article = await this.service.readFeaturedArticleService(value);
      return res.status(201).json({ message: "Successfully Received", data: article });
    } catch (error) {
      console.error("controller {read featured article}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readMainFeaturedArticle(req, res) {
    try {
      const value = "true";
      const article = await this.service.readMainFeaturedArticleService(value);
      return res.status(201).json({ message: "Successfully Retrieved", data: article });
    } catch (error) {
      console.error("controller {read main featured article}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editArticle(req, res) {
    const { id } = req.params;
    try {
      const article = await this.service.editArticleService(id);
      return res.status(201).json({ message: "Successfully Deleted", data: article });
    } catch (error) {
      console.error("controller {edit article}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateArticle(req, res) {
    const { id } = req.params;
    const { title, post, featured, mainfeatured, category } = req.body;
    const image = req.file;
    try {
      if (image !== undefined) {
        // admin wants to update the image and other text
        const deleteImage = await this.service.readArticleByIdService(id);
        const deleteImageName = deleteImage.imagename;
        const deletedImageFromFirebase = await deleteFromFirebase(deleteImageName);
        if (deletedImageFromFirebase) {
          const imageName = nanoid(6) + image.originalname;
          const imageUrl = await storeToFirebase(imageName);
          const articleData = {
            id,
            title,
            post,
            featured,
            mainfeatured,
            category,
            image: imageUrl,
            imagename: imageName,
          };
          await this.service.updateArticleService(articleData);
          return res.status(201).json({ message: "Successfully Updated" });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        // admin wants to keep the old image
        const retrieveOldImage = await this.service.readArticleByIdService(id);
        const retrievedOldImageName = retrieveOldImage.imagename;
        const retrievedImageNameLink = retrieveOldImage.image;
        const articleData = {
          id,
          title,
          post,
          featured,
          mainfeatured,
          category,
          image: retrievedImageNameLink,
          imagename: retrievedOldImageName,
        };
        await this.service.updateArticleService(articleData);
        return res.status(201).json({ message: "Successfully Updated" });
      }
    } catch (error) {
      // console.error("controller {update article}:", error.message);
      // return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteArticle(req, res) {
    const { id } = req.params;
    try {
      const getImage = await this.service.readArticleByIdService(id);
      const image = getImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(image);
      if (deletedImageFromFirebase) {
        await this.service.deleteArticleService(id);
        return res.status(201).json("Successfully Deleted");
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.error("controller {delete article}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default ArticleController;
