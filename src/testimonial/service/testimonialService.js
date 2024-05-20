import { nanoid } from "nanoid";

class TestimonialService {
  constructor(database) {
    this.database = database;
  }

  async createTestimonialService({
    name,
    image,
    imagename,
    quote,
    position,
    author,
  }) {
    const details = {
      id: nanoid(),
      name: name,
      image: image,
      imagename: imagename,
      quote: quote,
      position: position,
      author: author,
    };
    try {
      const testimonial = await this.database.createTestimonial(details);
      return testimonial;
    } catch (error) {
      console.error("create testimonial {service}", error.message);
    }
  }

  async readTestimonialService() {
    try {
      const testimonial = await this.database.readTestimonial();
      return testimonial;
    } catch (error) {
      console.error("read testimonial {service}", error.message);
    }
  }

  async editTestimonialService(id) {
    try {
      const testimonial = await this.database.editTestimonial(id);
      return testimonial;
    } catch (error) {
      console.error("edit testimonial {service}", error.message);
    }
  }

  async updateTestimonialService(details) {
    try {
      const testimonial = await this.database.updateTestimonial(details);
      return testimonial;
    } catch (error) {
      console.error("update testimonial {service}", error.message);
    }
  }

  async deleteTestimonialService(id) {
    try {
      const testimonial = await this.database.deleteTestimonial(id);
      return testimonial;
    } catch (error) {
      console.error("delete testimonial {service}", error.message);
    }
  }
}

export default TestimonialService;
