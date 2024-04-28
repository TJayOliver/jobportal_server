import { myCache, cacheTime } from "../../../configuration/cache.config.js";
import { nanoid } from "nanoid";

class JobService {
  constructor(database) {
    this.database = database;
  }

  async createJobService({
    image,
    overview,
    salary,
    featured,
    company,
    website,
    duration,
    position,
    location,
    responsibility,
    requirements,
    qualification,
    author,
    jobcategory,
  }) {
    try {
      const jobDetails = {
        id: nanoid(),
        image,
        overview,
        salary,
        featured,
        company,
        website,
        duration,
        position,
        location,
        responsibility,
        requirements,
        qualification,
        author,
        jobcategory,
      };
      const job = await this.database.createJob(jobDetails);
      return job;
    } catch (error) {
      console.error("create job {service}:", error.message);
    }
  }

  async countJobService() {
    try {
      let job = "";
      const jobs = await this.database.countJob();
      jobs.map((newData) => {
        const counter = Object.values(newData);
        job += counter;
      });
      return job;
    } catch (error) {
      console.error("count job {service}:", error.message);
    }
  }

  async readAllJobsService() {
    const cacheKey = "readAllJobs";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const job = await this.database.readAllJobs();
      myCache.set(cacheKey, job, cacheTime);
      return job;
    } catch (error) {
      console.error("read all jobs {service}:", error.message);
    }
  }

  async readFeaturedJobService(value) {
    const cacheKey = "readFeaturedJob";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const job = await this.database.readFeaturedJob(value);
      myCache.set(cacheKey, job, cacheTime);
      return job;
    } catch (error) {
      console.error("read featured job {service}:", error.message);
    }
  }

  async readJobByCategoryService(jobcategory) {
    const cacheKey = "readJobByCategory";
    try {
      const cachedData = myCache.get(cacheKey);
      if (cachedData) return cachedData;
      const job = await this.database.readJobByCategory(jobcategory);
      myCache.set(cacheKey, job, cacheTime);
      return job;
    } catch (error) {
      console.error("read job by category {service}:", error.message);
    }
  }

  async readJobByIDService(id) {
    try {
      const job = await this.database.readJobByID(id);
      return job;
    } catch (error) {
      console.error("read job by id {service}:", error.message);
    }
  }

  async searchJobService(jobDetails) {
    try {
      const job = await this.database.searchJob(jobDetails);
      return job;
    } catch (error) {
      console.error("search job {service}:", error.message);
    }
  }

  async editJobService(id) {
    try {
      const job = await this.database.editJob(id);
      return job;
    } catch (error) {
      console.error("edit job {service}:", error.message);
    }
  }

  async updateJobService({
    id,
    overview,
    image,
    salary,
    featured,
    company,
    website,
    duration,
    position,
    location,
    responsibility,
    requirements,
    qualification,
    jobcategory,
  }) {
    try {
      const jobDetails = {
        id,
        overview,
        image,
        salary,
        featured,
        company,
        website,
        duration,
        position,
        location,
        responsibility,
        requirements,
        qualification,
        jobcategory,
      };
      const job = await this.database.updateJob(jobDetails);
      return job;
    } catch (error) {
      console.error("update job {service}:", error.message);
    }
  }

  async deleteJobService(id) {
    try {
      const job = await this.database.deleteJob(id);
      return job;
    } catch (error) {
      console.error("delete job {service}:", error.message);
    }
  }
}

export default JobService;
