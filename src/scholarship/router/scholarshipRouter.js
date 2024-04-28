import express from 'express';
import {scholarshipDependency} from '../settings/scholarshipDependency.js'
import { upload } from '../../../configuration/multer.js';

const {scholarshipController} = scholarshipDependency();

const scholarshipRouter = express.Router();

scholarshipRouter.get('/scholarship', 
    async (req, res) => scholarshipController.readAllScholarships(req, res)
);
scholarshipRouter.get('/scholarship/read/:id', 
    async (req, res) => scholarshipController.readScholarshipByID(req, res)
);
scholarshipRouter.get('/scholarship/category/:scholarshipcategory', 
    async (req, res) => scholarshipController.readScholarshipByCategory(req, res)
);
scholarshipRouter.get('/scholarship/featured', 
    async (req, res) => scholarshipController.readFeaturedScholarship(req, res)
);
scholarshipRouter.get('/scholarship/count', 
    async (req, res) => scholarshipController.countScholarship(req, res)
);
scholarshipRouter.get('/scholarship/edit/:id', 
    async (req, res) => scholarshipController.editScholarship(req, res)
);
scholarshipRouter.get('/scholarship/country/:countryname', 
    async (req, res) => scholarshipController.readScholarshipByCountry(req, res)
);
scholarshipRouter.post('/scholarship/search', 
    async (req, res) => scholarshipController.searchScholarshipByCountry(req, res)
);
scholarshipRouter.post('/scholarship/create', 
    upload.single('image'), 
    async (req, res) => scholarshipController.createScholarship(req, res)
);
scholarshipRouter.put('/scholarship/update/:id',
    upload.single('image'), 
    async (req, res) => scholarshipController.updateScholarship(req, res)
);
scholarshipRouter.delete('/scholarship/delete/:id', 
    async (req, res) => scholarshipController.deleteScholarship(req, res)
);


export default scholarshipRouter;