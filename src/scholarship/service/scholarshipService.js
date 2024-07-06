import { nanoid } from "nanoid";
import { myCache, cacheTime } from "../../../configuration/cache.config.js";
import { storeToFirebase, deleteFromFirebase } from "../../../lib/storeFirebase.js";

class ScholarshipService {
  constructor(database) {
    this.database = database;
  }

  async createScholarshipService(scholarshipData) {
    try {
      const uploaded = await storeToFirebase(scholarshipData.image);
      const imageUrl = uploaded.imageURL;
      const imageName = uploaded.imageName;
      if (!uploaded.error) {
        const scholarshipContent = {
          id: nanoid(),
          image: imageUrl,
          imagename: imageName,
          scholarshipname: scholarshipData.scholarshipname,
          deadline: scholarshipData.deadline,
          description: scholarshipData.description,
          post: scholarshipData.post,
          agent: scholarshipData.agent,
          featured: scholarshipData.featured,
          scholarshiptype: scholarshipData.scholarshiptype,
          programs: scholarshipData.programs,
          scholarshipcategory: scholarshipData.scholarshipcategory,
          country: scholarshipData.country,
          author: scholarshipData.author,
        };
        const scholarship = await this.database.createScholarship(scholarshipContent);
        return scholarship;
      } else {
        return { error: uploaded.error };
      }
    } catch (error) {
      console.error("create scholarship {service}:", error.message);
    }
  }

  async countScholarshipService() {
    try {
      const count = await this.database.countScholarship();
      return count;
    } catch (error) {
      console.error("count scholarship {service}:", error.message);
    }
  }

  async readAllScholarshipService() {
    const cacheKey = "readallscholarships";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const scholarship = await this.database.readScholarship();
      myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read all scholarship {service}:", error.message);
    }
  }

  async readScholarshipByCountryService(country) {
    const cacheKey = "readscholarshipbycountry";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const scholarship = await this.database.readScholarshipByCountry(country);
      myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      connsole.error("read scholarship by country {service}:", error.message);
    }
  }

  async readFeaturedScholarshipService(value) {
    const cacheKey = "readFeaturedScholarship";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const scholarship = await this.database.readFeaturedScholarship(value);
      myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read featured scholarship {service}:", error.message);
    }
  }

  async readScholarshipByCategoryService(scholarshipcategory) {
    const cacheKey = "readScholarshipByCategory";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const scholarship = await this.database.readScholarshipByCategory(scholarshipcategory);
      myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read scholarship by category {service}:", error.message);
    }
  }

  async readScholarshipByIDService(id) {
    const cacheKey = "readScholarshipByID";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const scholarship = await this.database.readScholarshipByID(id);
      myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read scholarship by id {service}:", error.message);
    }
  }

  async searchScholarshipByCountryService(country) {
    const cacheKey = "readScholarshipByID";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const scholarship = await this.database.searchScholarshipByCountry(country);
      myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read scholarship by country {service}:", error.message);
    }
  }

  async editScholarshipService(id) {
    try {
      const scholarship = await this.database.editScholarship(id);
      return scholarship;
    } catch (error) {
      console.error("edit scholarship {service}:", error.message);
    }
  }

  async updateScholarshipService(scholarshipData) {
    try {
      // admin wants to update the old image
      if (scholarshipData.image !== undefined) {
        const deleteImage = await this.readScholarshipByIDService(scholarshipData.id);
        const deleteImageName = deleteImage.imagename;
        const deletedImageFromFirebase = await deleteFromFirebase(deleteImageName);
        if (deletedImageFromFirebase) {
          const uploaded = await storeToFirebase(scholarshipData.image);
          const imageUrl = uploaded.imageURL;
          const imageName = uploaded.imageName;
          if (!uploaded.error) {
            const scholarshipContent = {
              id: scholarshipData.id,
              image: imageUrl,
              imagename: imageName,
              scholarshipname: scholarshipData.scholarshipname,
              deadline: scholarshipData.deadline,
              description: scholarshipData.description,
              post: scholarshipData.post,
              agent: scholarshipData.agent,
              featured: scholarshipData.featured,
              scholarshiptype: scholarshipData.scholarshiptype,
              programs: scholarshipData.programs,
              scholarshipcategory: scholarshipData.scholarshipcategory,
              country: scholarshipData.country,
            };
            const scholarship = await this.database.updateScholarship(scholarshipContent);
            return scholarship;
          } else {
            return { error: uploaded.error };
          }
        } else {
          return { error: "Image wasn't deleted from firebase" };
        }
      } else {
        // admin wants to keep the old image
        const retrieveOldImage = await this.readScholarshipByIDService(id);
        const retrievedOldImageName = retrieveOldImage.imagename;
        const retrievedImageNameLink = retrieveOldImage.image;
        const scholarshipContent = {
          id: scholarshipData.id,
          image: retrievedImageNameLink,
          imagename: retrievedOldImageName,
          scholarshipname: scholarshipData.scholarshipname,
          deadline: scholarshipData.deadline,
          description: scholarshipData.description,
          post: scholarshipData.post,
          agent: scholarshipData.agent,
          featured: scholarshipData.featured,
          scholarshiptype: scholarshipData.scholarshiptype,
          programs: scholarshipData.programs,
          scholarshipcategory: scholarshipData.scholarshipcategory,
          country: scholarshipData.country,
        };
        const scholarship = await this.database.updateScholarship(scholarshipContent);
        return scholarship;
      }
    } catch (error) {
      console.error("update scholarship {service}:", error.message);
    }
  }

  async deleteScholarshipService(id) {
    try {
      const getImage = await this.readScholarshipByIDService(id);
      const image = getImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(image);
      if (deletedImageFromFirebase) {
        const scholarship = await this.database.deleteScholarship(id);
        return scholarship;
      } else {
        return { error: "Could Not Delete Image From Firebase" };
      }
    } catch (error) {
      console.error("delete scholarship {service}:", error.message);
    }
  }
}

export default ScholarshipService;
