import { nanoid } from "nanoid";
import { myCache, cacheTime } from "../../../configuration/cache.config.js";
import {
  generateDescription,
  generateScholarshipHeading,
  generateScholarshipLink,
  generatePost,
} from "../../../lib/geminiAI.js";

class ScholarshipService {
  constructor(database) {
    this.database = database;
  }

  async createScholarshipService(scholarshipData) {
    try {
      const generatedScholarshipName = await generateScholarshipHeading(
        scholarshipData.post
      );
      const generatedPost = await generatePost(
        "scholarship",
        scholarshipData.post
      );
      const generatedWebsite = await generateScholarshipLink(
        scholarshipData.post
      );
      const generatedDescription = await generateDescription(
        scholarshipData.post
      );

      const scholarshipContent = {
        id: nanoid(),
        scholarshipname: generatedScholarshipName,
        deadline: scholarshipData.deadline,
        description: generatedDescription,
        post: generatedPost,
        featured: scholarshipData.featured,
        scholarshiptype: scholarshipData.scholarshiptype,
        programs: scholarshipData.programs,
        scholarshipcategory: scholarshipData.scholarshipcategory,
        country: scholarshipData.country,
        website: generatedWebsite,
        author: scholarshipData.author,
      };
      const scholarship = await this.database.createScholarship(
        scholarshipContent
      );
      return scholarship;
    } catch (error) {
      console.error("create scholarship {service}:", error.message);
      return error;
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
    //const cacheKey = "readallscholarships";
    try {
      /*  const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData; */
      const scholarship = await this.database.readScholarship();
      //myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read all scholarship {service}:", error.message);
    }
  }

  async readFeaturedScholarshipService(value) {
    //const cacheKey = "readFeaturedScholarship";
    try {
      /*  const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData; */
      const scholarship = await this.database.readFeaturedScholarship(value);
      /* myCache.set(cacheKey, scholarship, cacheTime); */
      return scholarship;
    } catch (error) {
      console.error("read featured scholarship {service}:", error.message);
    }
  }

  async readScholarshipByCategoryService(scholarshipcategory) {
    //const cacheKey = "readScholarshipByCategory";
    try {
      /* const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData; */
      const scholarship = await this.database.readScholarshipByCategory(
        scholarshipcategory
      );
      //myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read scholarship by category {service}:", error.message);
    }
  }

  async readScholarshipByIDService(id) {
    //const cacheKey = "readScholarshipByID";
    try {
      /* const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData; */
      const scholarship = await this.database.readScholarshipByID(id);
      //myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read scholarship by id {service}:", error.message);
    }
  }

  async searchScholarshipByNameOrCountryService(scholarshipname) {
    //const cacheKey = "readScholarshipByID";
    try {
      /* const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData; */
      const scholarship = await this.database.searchScholarshipByNameOrCountry(
        scholarshipname
      );
      //myCache.set(cacheKey, scholarship, cacheTime);
      return scholarship;
    } catch (error) {
      console.error("read scholarship by name {service}:", error.message);
    }
  }

  async searchScholarshipByRecentAndOldestService(filter) {
    try {
      const scholarship =
        await this.database.searchScholarshipByRecentAndOldest(filter);
      return scholarship;
    } catch (error) {
      console.error(
        "search scholarship by recent and oldest {service}:",
        error.message
      );
    }
  }

  async searchScholarshipByFiltersService(filter) {
    try {
      const scholarship = await this.database.searchScholarshipByFilters(
        filter
      );
      return scholarship;
    } catch (error) {
      console.error("search scholarship by filters {service}:", error.message);
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
      const scholarshipContent = {
        id: scholarshipData.id,
        scholarshipname: scholarshipData.scholarshipname,
        deadline: scholarshipData.deadline,
        description: scholarshipData.description,
        post: scholarshipData.post,
        featured: scholarshipData.featured,
        scholarshiptype: scholarshipData.scholarshiptype,
        programs: scholarshipData.programs,
        scholarshipcategory: scholarshipData.scholarshipcategory,
        country: scholarshipData.country,
      };
      const scholarship = await this.database.updateScholarship(
        scholarshipContent
      );
      return scholarship;
    } catch (error) {
      console.error("update scholarship {service}:", error.message);
    }
  }

  async deleteScholarshipService(id) {
    try {
      const scholarship = await this.database.deleteScholarship(id);
      return scholarship;
    } catch (error) {
      console.error("delete scholarship {service}:", error.message);
    }
  }
}

export default ScholarshipService;
