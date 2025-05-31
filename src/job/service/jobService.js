import { nanoid } from "nanoid";
import { myCache, cacheTime } from "../../../configuration/cache.config.js";
import {
  storeToFirebase,
  deleteFromFirebase,
} from "../../../lib/storeFirebase.js";
import {
  generatePost,
  generateJobPosition,
  generateDescription,
} from "../../../lib/geminiAI.js";
const website = "futureforte.netlify.app";

class JobService {
  constructor(database) {
    this.database = database;
  }

  async createJobService(jobDetails) {
    try {
      const generatedPost = await generatePost("job", jobDetails.post);
      const generatedPosition = await generateJobPosition(jobDetails.post);
      const generatedDescription = await generateDescription(
        "job",
        jobDetails.post
      );
      const jobs = {
        id: nanoid(),
        overview: generatedDescription,
        salary: jobDetails.salary || "Negotiable",
        featured: jobDetails.featured,
        company: jobDetails.company || "Private Employer",
        website: jobDetails.website || website,
        duration: jobDetails.duration,
        position: generatedPosition,
        location: jobDetails.location,
        post: generatedPost,
        author: jobDetails.author,
        jobcategory: jobDetails.jobcategory,
      };
      const job = await this.database.createJob(jobs);
      return job;
    } catch (error) {
      console.error("create job {service}:", error.message);
    }
  }

  async countJobService() {
    try {
      const job = await this.database.countJob();
      return job;
    } catch (error) {
      console.error("count job {service}:", error.message);
    }
  }

  async readAllJobsService() {
    //const cacheKey = "readAllJobs";
    try {
      //const cachedData = myCache.get(cacheKey);
      //if (cachedData) return cachedData;
      const job = await this.database.readAllJobs();
      //myCache.set(cacheKey, job, cacheTime);
      return job;
    } catch (error) {
      console.error("read all jobs {service}:", error.message);
    }
  }

  async readFeaturedJobService(value) {
    //const cacheKey = "readFeaturedJob";
    try {
      //const cachedData = myCache.get(cacheKey);
      //if (cachedData) return cachedData;
      const job = await this.database.readFeaturedJob(value);
      //myCache.set(cacheKey, job, cacheTime);
      return job;
    } catch (error) {
      console.error("read featured job {service}:", error.message);
    }
  }

  async readJobByCategoryService(jobcategory) {
    //const cacheKey = "readJobByCategory";
    try {
      //const cachedData = myCache.get(cacheKey);
      //if (cachedData) return cachedData;
      const job = await this.database.readJobByCategory(jobcategory);
      //myCache.set(cacheKey, job, cacheTime);
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

  async searchJobByPositionService(position) {
    try {
      const job = await this.database.searchJobByPosition(position);
      return job;
    } catch (error) {
      console.error("search job by position {service}:", error.message);
    }
  }

  async searchJobByRecentAndOldestService(filter) {
    try {
      const job = await this.database.searchJobByRecentAndOldest(filter);
      return job;
    } catch (error) {
      console.error(
        "search job by recent and oldest {service}:",
        error.message
      );
    }
  }

  async searchJobByFiltersService(filter) {
    try {
      const job = await this.database.searchJobByFilters(filter);
      return job;
    } catch (error) {
      console.error("search job by filters {service}:", error.message);
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

  async updateJobService(jobDetails) {
    try {
      const jobContent = {
        id: jobDetails.id,
        overview: jobDetails.overview,
        salary: jobDetails.salary,
        featured: jobDetails.featured,
        company: jobDetails.company,
        website: jobDetails.website,
        duration: jobDetails.duration,
        position: jobDetails.position,
        location: jobDetails.location,
        post: jobDetails.post,
        jobcategory: jobDetails.jobcategory,
      };
      const job = await this.database.updateJob(jobContent);
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
