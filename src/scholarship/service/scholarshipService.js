import { myCache, cacheTime } from "../../../configuration/cache.config.js";
import { nanoid } from "nanoid";

class ScholarshipService {
  constructor(database) {
    this.database = database;
  }

  async createScholarshipService({
    image,
    scholarshipname,
    deadline,
    description,
    eligibility,
    duration,
    programsoffered,
    documentsrequired,
    benefits,
    applicationinformation,
    hostuniversity,
    agent,
    featured,
    scholarshiptype,
    programs,
    scholarshipcategory,
    country,
    author,
  }) {
    try {
      const scholarshipData = {
        id: nanoid(),
        image,
        scholarshipname,
        deadline,
        description,
        eligibility,
        duration,
        programsoffered,
        documentsrequired,
        benefits,
        applicationinformation,
        hostuniversity,
        agent,
        featured,
        scholarshiptype,
        programs,
        scholarshipcategory,
        country,
        author,
      };
      const scholarship = await this.database.createScholarship(
        scholarshipData
      );
      return scholarship;
    } catch (error) {
      console.error("create scholarship {service}:", error.message);
    }
  }

  async countScholarshipService() {
    try {
      const scholarshipCount = await this.database.countScholarship();
      let count = "";
      scholarshipCount.map((newData) => {
        const number = Object.values(newData);
        count += number;
      });
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
      const scholarship = await this.database.readScholarshipByCategory(
        scholarshipcategory
      );
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
      const scholarship = await this.database.searchScholarshipByCountry(
        country
      );
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

  async updateScholarshipService({
    id,
    image,
    scholarshipname,
    deadline,
    description,
    eligibility,
    duration,
    programsoffered,
    documentsrequired,
    benefits,
    applicationinformation,
    hostuniversity,
    agent,
    featured,
    scholarshiptype,
    programs,
    scholarshipcategory,
    country,
    author,
  }) {
    try {
      const scholarshipData = {
        id,
        image,
        scholarshipname,
        deadline,
        description,
        eligibility,
        duration,
        programsoffered,
        documentsrequired,
        benefits,
        applicationinformation,
        hostuniversity,
        agent,
        featured,
        scholarshiptype,
        programs,
        scholarshipcategory,
        country,
        author,
      };
      const scholarship = await this.database.updateScholarship(
        scholarshipData
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
