import { testimonialModel } from "../../../schema/mongoSchema.js";

class TestimonialDatabase {
  async createTestimonial(details) {
    try {
      const testimonial = await testimonialModel.create(details);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async readTestimonial() {
    try {
      const testimonial = await testimonialModel
        .find()
        .sort({ datecreated: 1 })
        .limit(3);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async editTestimonial(id) {
    try {
      const testimonial = await testimonialModel.find({ id: id });
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async updateTestimonial(details) {
    try {
      const id = details?.id;
      const { name, image, quote, position } = details;
      const update = { name, image, quote, position };
      const testimonial = await testimonialModel.updateOne({ id: id });
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async deleteTestimonial(id) {
    try {
      const testimonial = await testimonialModel.deleteOne({ id: id });
      return testimonial;
    } catch (error) {
      throw error;
    }
  }
}

export default TestimonialDatabase;
