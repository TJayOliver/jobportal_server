import TestimonialController from "../controller/testimonialController.js";
import TestimonialService from "../service/testimonialService.js";
import TestimonialDatabase from "../database/testimonialDatabase.js";

export const testimonialDependency = () => {
  const externalDatabase = new TestimonialDatabase();
  const testimonialService = new TestimonialService(externalDatabase);
  const testimonialController = new TestimonialController(testimonialService);

  return { testimonialController };
};
