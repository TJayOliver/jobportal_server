class JobController {
  constructor(service) {
    this.service = service;
  }

  async createJob(req, res) {
    try {
      const {
        salary,
        overview,
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
      } = req.body;
      const image = req.file.filename;
      const jobDetails = {
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
      const job = await this.service.createJobService(jobDetails);
      return res
        .status(201)
        .json({ message: "Successfully Created", data: job });
    } catch (error) {
      console.error("create job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async countJob(req, res) {
    try {
      const job = await this.service.countJobService();
      return res.status(200).json({ data: job });
    } catch (error) {
      console.error("count job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readAllJobs(req, res) {
    try {
      const callCookie = res.locals.callCookie;
      const country = res.locals.country;
      const job = await this.service.readAllJobsService();
      return res.status(201).json({
        message: "Successfully Retrieved",
        callCookie,
        country,
        data: job,
      });
    } catch (error) {
      console.error("read all jobs {controller}:", error.message);
      return res.status(500).json({ messge: "Internal Server Error" });
    }
  }

  async readFeaturedJob(req, res) {
    try {
      const value = "true";
      const job = await this.service.readFeaturedJobService(value);
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("read featured job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readJobByCategory(req, res) {
    try {
      const { jobcategory } = req.params;
      const job = await this.service.readJobByCategoryService(jobcategory);
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("read job by category {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readJobByID(req, res) {
    try {
      const callCookie = res.locals.callCookie;
      const country = res.locals.country;
      const { id } = req.params;
      const job = await this.service.readJobByIDService(id);
      return res.status(201).json({
        message: "Successfully retrieved",
        callCookie,
        country,
        data: job,
      });
    } catch (error) {
      console.error("read job by id {service}:", error.message);
    }
  }

  async searchJob(req, res) {
    try {
      const { position, location, jobcategory, duration } = req.body;
      const jobDetails = {
        position,
        location,
        jobcategory,
        duration,
      };
      const job = await this.service.searchJobService(jobDetails);
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("search job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editJob(req, res) {
    try {
      const { id } = req.params;
      const job = await this.service.editJobService(id);
      return res
        .status(201)
        .json({ message: "Successfully Update", data: job });
    } catch (error) {
      console.error("edit job {controller}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateJob(req, res) {
    try {
      const { id } = req.params;
      const {
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
        jobcategory,
      } = req.body;
      const image = req.file.filename;
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
      const job = await this.service.updateJobService(jobDetails);
      return res
        .status(201)
        .json({ message: "Successfully Updated", data: job });
    } catch (error) {
      console.error("update job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteJob(req, res) {
    try {
      const { id } = req.params;
      const job = await this.service.deleteJobService(id);
      return res
        .status(201)
        .json({ message: "Successfully Deleted", data: job });
    } catch (error) {
      console.error("delete {delete job}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default JobController;
