import express from 'express';
import { testimonialDependency } from '../settings/testimonialDependency.js';
import { upload } from '../../../configuration/multer.js';

const testimonialRouter = express.Router();

const { testimonialController } = testimonialDependency();

testimonialRouter.post('/testimonial/create',
    upload.single('image'),
    async (req, res) => testimonialController.createTestimonial(req, res)
);

testimonialRouter.get('/testimonial',
    async (req, res) => testimonialController.readTestimonial(req, res)
);

testimonialRouter.get('/testimonial/edit/:id',
    async (req, res) => testimonialController.editTestimonial(req, res)
);

testimonialRouter.put('/testimonial/update/:id',
    upload.single('image'),
    async (req, res) => testimonialController.updateTestimonial(req, res)
);

testimonialRouter.delete('/testimonial/delete/:id',
    async (req, res) => testimonialController.deleteTestimonial(req, res)
);

export default testimonialRouter;