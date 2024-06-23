class TestimonialController {
  constructor(service) {
    this.service = service;
  }

  async createTestimonial(req, res) {
    const { name, quote, position, author } = req.body;
    const image = req.file;
    try {
      const details = {
        name,
        image,
        quote,
        position,
        author,
      };
      const testimonial = await this.service.createTestimonialService(details);
      if (testimonial.error) return res.status(500).json({ message: "Error in Uploading Image" });
      return res.status(201).json({ message: "Successfully Created" });
    } catch (error) {
      console.error("create testimonial {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readTestimonial(req, res) {
    try {
      const testimonial = await this.service.readTestimonialService();
      return res.status(201).json({ message: "Successfully Created", data: testimonial });
    } catch (error) {
      console.error("read testimonial {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editTestimonial(req, res) {
    const { id } = req.params;
    try {
      const testimonial = await this.service.editTestimonialService(id);
      return res.status(201).json({ message: "Successfully Retrieved", data: testimonial });
    } catch (error) {
      console.error("edit testimonial {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateTestimonial(req, res) {
    const { id } = req.params;
    const { name, quote, position } = req.body;
    const image = req.file;
    try {
      const details = {
        id,
        name,
        image,
        quote,
        position,
      };
      const testimonial = await this.service.updateTestimonialService(details);
      if (testimonial.error) return res.status(500).json({ message: testimonial.error });
      return res.status(201).json({ message: "Successfully Updated" });
    } catch (error) {
      console.error("update testimonial {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteTestimonial(req, res) {
    const { id } = req.params;
    try {
      const testimonial = await this.service.deleteTestimonialService(id);
      if (testimonial.error) return res.status(500).json({ message: testimonial.error });
      return res.status(201).json({ message: "Successfully Deleted" });
    } catch (error) {
      console.error("delete testimonial {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default TestimonialController;
