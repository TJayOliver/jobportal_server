import { executeQuery } from "../../../configuration/mysql.config.js";

class TestimonialDatabase {
  async createTestimonial(details) {
    try {
      const query = `INSERT 
            INTO testimonial (id, name, image, quote, position, author) 
            VALUES (?,?,?,?,?,?)`;
      const parameter = [
        details.id,
        details.name,
        details.image,
        details.quote,
        details.position,
        details.author,
      ];
      const testimonial = await executeQuery(query, parameter);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async readTestimonial() {
    try {
      const query = `SELECT * FROM testimonial`;
      const testimonial = await executeQuery(query);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async editTestimonial(id) {
    try {
      const query = `SELECT * FROM testimonial WHERE id = ?`;
      const parameter = [id];
      const testimonial = await executeQuery(query, parameter);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async updateTestimonial(details) {
    try {
      const query = `UPDATE testimonial SET
            name = ?,
            image = ?,
            quote = ?,
            position = ?
            WHERE id = ?`;
      const parameter = [
        details.name,
        details.image,
        details.quote,
        details.position,
        details.id,
      ];
      const testimonial = await executeQuery(query, parameter);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async deleteTestimonial(id) {
    try {
      const query = `DELETE FROM testimonial WHERE id = ?`;
      const parameter = [id];
      const testimonial = await executeQuery(query, parameter);
      return testimonial;
    } catch (error) {
      throw error;
    }
  }
}

export default TestimonialDatabase;
