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
      const job = await jobModel
        .find({ featured: value })
        .limit(8)
        .sort({ datecreated: -1 });
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

  async searchJobByPosition(position) {
    try {
      const jobs = await jobModel.find({
        position: { $regex: position, $options: "i" },
      });
      return jobs;
    } catch (error) {
      throw error;
    }
  }

  async searchJobByRecentAndOldest(filter) {
    try {
      const sortOrder = filter === "Recent" ? -1 : 1;
      const scholarship = await jobModel.find().sort({
        datecreated: sortOrder,
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async searchJobByFilters(filters) {
    try {
      const query = {};
      // Apply filters only if they exist in the request
      if (filters.schedule && filters.schedule.length > 0) {
        query.schedule = { $in: filters.schedule }; // Matches any of the selected types
      }
      if (filters.category && filters.category.length > 0) {
        query.category = { $in: filters.category }; // Matches any of the selected categories
      }
      const job = await jobModel.find(query).sort({ createdAt: -1 }).exec();
      return job;
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
        post,
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
        post,
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
