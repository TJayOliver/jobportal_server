import { jobModel } from "../../../schema/mongoSchema.js";

class JobDatabase {
  async createJob(jobDetails) {
    try {
      const job = await jobModel.create(jobDetails);
      return job;
    } catch (error) {
      throw error;
    }
  }

  async countJob() {
    try {
      const job = await jobModel.countDocuments();
      return job;
    } catch (error) {
      throw error;
    }
  }

  async readAllJobs() {
    try {
      const job = await jobModel.find().sort({ datecreated: -1 });
      return job;
    } catch (error) {
      throw error;
    }
  }

  async readFeaturedJob(value) {
    try {
      const job = await jobModel.find({ featured: value }).limit(6).sort({ datecreated: -1 });
      return job;
    } catch (error) {
      throw error;
    }
  }

  async readJobByCategory(jobcategory) {
    try {
      const job = await jobModel.find({ jobcategory: jobcategory });
      return job;
    } catch (error) {
      throw error;
    }
  }

  async readJobByID(id) {
    try {
      const job = await jobModel.findOne({ id: id });
      return job;
    } catch (error) {
      throw error;
    }
  }

  async searchJob(jobDetails) {
    const { position, location, duration, jobcategory } = jobDetails;
    try {
      let query = {};
      if (position) {
        query.position = { $regex: position, $options: "i" };
      }
      if (location) {
        query.location = { $regex: location, $options: "i" };
      }
      if (duration) {
        query.duration = duration;
      }
      if (jobcategory) {
        query.jobcategory = jobcategory;
      }
      const jobs = await jobModel.find(query);
      return jobs;
    } catch (error) {
      throw error;
    }
  }

  async editJob(id) {
    try {
      const job = await jobModel.findOne({ id: id });
      return job;
    } catch (error) {
      throw error;
    }
  }

  async updateJob(jobDetails) {
    try {
      const id = jobDetails?.id;
      const {
        image,
        imagename,
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
        applicationinfo,
        jobcategory,
      } = jobDetails;
      const update = {
        image,
        imagename,
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
        applicationinfo,
        jobcategory,
      };
      const job = await jobModel.updateOne({ id: id }, update);
      return job;
    } catch (error) {
      throw error;
    }
  }

  async deleteJob(id) {
    try {
      const job = await jobModel.deleteOne({ id: id });
      return job;
    } catch (error) {
      throw error;
    }
  }
}
export default JobDatabase;
