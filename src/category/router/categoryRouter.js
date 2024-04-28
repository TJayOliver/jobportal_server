import express from 'express';
import {categoryDependency} from '../settings/categoryDependency.js'

const categoryRouter = express.Router();

const {categoryController} = categoryDependency();

categoryRouter.get('/category', 
    async (req, res) => categoryController.readAllCategory(req, res)
);
categoryRouter.get('/category/count', 
    async (req, res) => categoryController.countCategory(req, res)
);
categoryRouter.get('/category/edit/:id', 
    async (req, res) => categoryController.editCategory(req, res)
);
categoryRouter.post('/category/create', 
    async (req, res) => categoryController.createCategory(req, res)
);
categoryRouter.delete('/category/delete/:id', 
    async (req, res) => categoryController.deleteCategory(req, res)
);
categoryRouter.put('/category/update/:id',
    async (req, res) => categoryController.updateCategory(req, res)
);

export default categoryRouter;