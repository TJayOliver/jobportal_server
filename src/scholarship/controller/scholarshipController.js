class ScholarshipController {
  constructor(scholarshipService) {
    this.service = scholarshipService;
  }

  async createScholarship(req, res) {
    const {
      //scholarshipname,
      deadline,
      //description,
      post,
      featured,
      scholarshiptype,
      programs,
      scholarshipcategory,
      country,
      author,
    } = req.body;

    try {
      const scholarshipData = {
        //scholarshipname,
        deadline,
        //description,
        post,
        featured,
        scholarshiptype,
        programs,
        scholarshipcategory,
        country,
        author,
      };
      const scholarship = await this.service.createScholarshipService(
        scholarshipData
      );
      return res.status(201).json({ message: "Successfully Created" });
    } catch (error) {
      console.error("controller {create scholarship}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async countScholarship(req, res) {
    try {
      const scholarship = await this.service.countScholarshipService();
      return res.status(201).json({ data: scholarship });
    } catch (error) {
      console.error("controller {count scholarship}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readAllScholarships(req, res) {
    try {
      const scholarship = await this.service.readAllScholarshipService();
      return res.status(201).json({
        message: "Successfully retrieved",
        data: scholarship,
      });
    } catch (error) {
      console.error("controller {read all scholarships}:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readFeaturedScholarship(req, res) {
    try {
      const value = "true";
      const scholarship = await this.service.readFeaturedScholarshipService(
        value
      );
      res.status(201).json({
        message: "Successfully retrieved",
        data: scholarship,
      });
    } catch (error) {
      console.error("controller {read all scholarships}", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readScholarshipByCategory(req, res) {
    const { scholarshipcategory } = req.params;
    try {
      const scholarship = await this.service.readScholarshipByCategoryService(
        scholarshipcategory
      );
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: scholarship });
    } catch (error) {
      console.error("controller {read scholarship by category}", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readScholarshipByID(req, res) {
    const { id } = req.params;
    try {
      const scholarship = await this.service.readScholarshipByIDService(id);
      return res.status(201).json({
        message: "Successfully Retrieved",
        data: [scholarship],
      });
    } catch (error) {
      console.error("controller {read scholarship by id}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async searchScholarshipByNameOrCountry(req, res) {
    const { scholarshipname } = req.body;
    try {
      const scholarship =
        await this.service.searchScholarshipByNameOrCountryService(
          scholarshipname
        );
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: scholarship });
    } catch (error) {
      console.error("controller {search scholarship by name}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async searchScholarshipByRecentAndOldest(req, res) {
    const { filter } = req.body;
    try {
      const scholarship =
        await this.service.searchScholarshipByRecentAndOldestService(filter);
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: scholarship });
    } catch (error) {
      console.error(
        "search scholarship by recent and oldest {controller}:",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async searchScholarshipByFilters(req, res) {
    const { scholarshiptype, programs, scholarshipcategory } = req.body;
    const filter = { scholarshiptype, programs, scholarshipcategory };
    try {
      const scholarship = await this.service.searchScholarshipByFiltersService(
        filter
      );
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: scholarship });
    } catch (error) {
      console.error(
        "search scholarship by filters {controller}:",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editScholarship(req, res) {
    const { id } = req.params;
    try {
      const scholarship = await this.service.editScholarshipService(id);
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: scholarship });
    } catch (error) {
      console.error("controller {edit scholarship}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateScholarship(req, res) {
    const {
      scholarshipname,
      deadline,
      description,
      post,
      featured,
      scholarshiptype,
      programs,
      scholarshipcategory,
      country,
    } = req.body;
    const { id } = req.params;
    try {
      const scholarshipData = {
        id,
        scholarshipname,
        deadline,
        description,
        post,
        featured,
        scholarshiptype,
        programs,
        scholarshipcategory,
        country,
      };
      const scholarship = await this.service.updateScholarshipService(
        scholarshipData
      );
      return res.status(201).json({ message: "Successfully Updated" });
    } catch (error) {
      console.error("controller {edit scholarship}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteScholarship(req, res) {
    const { id } = req.params;
    try {
      const scholarship = await this.service.deleteScholarshipService(id);
      return res.status(201).json({ message: "Successfully Deleted" });
    } catch (error) {
      console.error("delete scholarship {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default ScholarshipController;
