import { nanoid } from "nanoid";
import { storeToFirebase, deleteFromFirebase } from "../../../lib/storeFirebase.js";

class TestimonialService {
  constructor(database) {
    this.database = database;
  }

  async createTestimonialService(testimonialDetails) {
    try {
      const uploaded = await storeToFirebase(testimonialDetails.image);
      const imageUrl = uploaded.imageURL;
      const imageName = uploaded.imageName;
      if (!uploaded.error) {
        const details = {
          id: nanoid(),
          name: testimonialDetails.name,
          image: imageUrl,
          imagename: imageName,
          quote: testimonialDetails.quote,
          position: testimonialDetails.position,
          author: testimonialDetails.author,
        };
        const testimonial = await this.database.createTestimonial(details);
        return testimonial;
      } else {
        return { error: uploaded.error };
      }
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

  async updateTestimonialService(testimonialDetails) {
    try {
      // admin wants to update the old image
      if (testimonialDetails.image !== undefined) {
        const deleteImage = await this.editTestimonialService(testimonialDetails.id);
        const deleteImageName = deleteImage.imagename;
        const deletedImageFromFirebase = await deleteFromFirebase(deleteImageName);
        if (deletedImageFromFirebase) {
          const uploaded = await storeToFirebase(testimonialDetails.image);
          const imageUrl = uploaded.imageURL;
          const imageName = uploaded.imageName;
          if (!uploaded.error) {
            const testimonialContent = {
              id: nanoid(),
              name: testimonialDetails.name,
              image: imageUrl,
              imagename: imageName,
              quote: testimonialDetails.quote,
              position: testimonialDetails.position,
            };
            const testimonial = await this.database.updateTestimonial(testimonialContent);
            return testimonial;
          } else {
            return { error: uploaded.error };
          }
        } else {
          return { error: "Image wasn't deleted from firebase" };
        }
      } else {
        // admin wants to keep the old image
        const retrieveOldImage = await this.editTestimonialService(id);
        const retrievedOldImageName = retrieveOldImage.imagename;
        const retrievedImageNameLink = retrieveOldImage.image;
        const testimonialContent = {
          id: nanoid(),
          image: retrievedImageNameLink,
          imagename: retrievedOldImageName,
          imagename: imageName,
          quote: testimonialDetails.quote,
          position: testimonialDetails.position,
        };
        const testimonial = await this.database.updateTestimonial(testimonialContent);
        return testimonial;
      }
    } catch (error) {
      console.error("update testimonial {service}", error.message);
    }
  }

  async deleteTestimonialService(id) {
    try {
      const getImage = await this.editTestimonialService(id);
      const image = getImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(image);
      if (deletedImageFromFirebase) {
        const testimonial = await this.database.deleteTestimonial(id);
        return testimonial;
      } else {
        return { error: "Could Not Delete Image From Firebase" };
      }
    } catch (error) {
      console.error("delete testimonial {service}", error.message);
    }
  }
}

export default TestimonialService;
