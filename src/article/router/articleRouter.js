import express from 'express';
import { articleDependency } from '../settings/articleDependency.js';
import {upload} from '../../../configuration/multer.js';

const {articleController} = articleDependency();

const articleRouter = express.Router();

articleRouter.get('/article', 
    async (req, res) => articleController.readAllArticle(req, res)
);
articleRouter.get('/article/read/:id', 
    async (req, res) => articleController.readArticleByID(req, res)
);
articleRouter.get('/article/category/:category', 
    async (req, res) => articleController.readArticleByCategory(req, res)
);
articleRouter.get('/article/mainfeatured', 
    async (req, res) => articleController.readMainFeaturedArticle(req, res)
);
articleRouter.get('/article/featured', 
    async (req, res) => articleController.readFeaturedArticle(req, res)
);
articleRouter.get('/article/count', 
    async (req, res) => articleController.countArticle(req, res)
);
articleRouter.get('/article/edit/:id', 
    async (req, res) => articleController.editArticle(req, res)
);
articleRouter.post('/article/create', 
    upload.single('image'), 
    async (req, res) => articleController.createArticle(req, res)
);
articleRouter.delete('/article/delete/:id', 
    async (req, res) => articleController.deleteArticle(req, res)
);
articleRouter.put('/article/update/:id',
    upload.single('image'), 
    async (req, res) => articleController.updateArticle(req, res)
);

// articleRouter.get('/api/articles-description-page-get', 
//     ArticlesOnDescriptionPage
// );


export default articleRouter;