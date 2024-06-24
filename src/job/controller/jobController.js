class JobController {
  constructor(service) {
    this.service = service;
  }

  async createJob(req, res) {
    const {
      overview,
      salary,
      featured,
      company,
      website,
      duration,
      position,
      location,
      post,
      author,
      jobcategory,
    } = req.body;
    const image = req.file;
    try {
      const jobDetails = {
        overview,
        salary,
        featured,
        company,
        website,
        duration,
        position,
        location,
        post,
        author,
        jobcategory,
        image,
      };
      const job = await this.service.createJobService(jobDetails);
      if (job.error) return res.status(500).json({ message: "Error in Uploading Image" });
      return res.status(201).json({ message: "Successfully Created" });
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
    const callCookie = res.locals.callCookie;
    const country = res.locals.country;
    try {
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
      return res.status(201).json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("read featured job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readJobByCategory(req, res) {
    const { jobcategory } = req.params;
    try {
      const job = await this.service.readJobByCategoryService(jobcategory);
      return res.status(201).json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("read job by category {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readJobByID(req, res) {
    const { id } = req.params;
    const callCookie = res.locals.callCookie;
    const country = res.locals.country;
    try {
      const job = await this.service.readJobByIDService(id);
      return res.status(201).json({
        message: "Successfully retrieved",
        callCookie,
        country,
        data: [job],
      });
    } catch (error) {
      console.error("read job by id {service}:", error.message);
    }
  }

  async searchJob(req, res) {
    const { position, location, jobcategory, duration } = req.body;
    try {
      const jobDetails = {
        position,
        location,
        jobcategory,
        duration,
      };
      const job = await this.service.searchJobService(jobDetails);
      return res.status(201).json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("search job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editJob(req, res) {
    const { id } = req.params;
    try {
      const job = await this.service.editJobService(id);
      return res.status(201).json({ message: "Successfully Retrieved", data: job });
    } catch (error) {
      console.error("edit job {controller}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateJob(req, res) {
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
      post,
      jobcategory,
    } = req.body;
    const image = req.file;
    try {
      const jobDetails = {
        id,
        image,
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
      const job = await this.service.updateJobService(jobDetails);
      if (job.error) return res.status(500).json({ message: job.error });
      return res.status(201).json({ message: "Successfully Updated" });
    } catch (error) {
      console.error("update job {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteJob(req, res) {
    const { id } = req.params;
    try {
      const job = await this.service.deleteJobService(id);
      if (job.error) return res.status(500).json({ message: job.error });
      return res.status(201).json({ message: "Successfully Deleted" });
    } catch (error) {
      console.error("delete {delete job}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default JobController;
