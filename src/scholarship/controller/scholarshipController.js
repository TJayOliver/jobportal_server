class ScholarshipController {
  constructor(scholarshipService) {
    this.service = scholarshipService;
  }

  async createScholarship(req, res) {
    try {
      const {
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
      } = req.body;
      const image = req.file.filename;
      const scholarshipData = {
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
      const scholarship = await this.service.createScholarshipService(
        scholarshipData
      );
      return res
        .status(201)
        .json({ message: "Successfully Created", data: scholarship });
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
      const callCookie = res.locals.callCookie;
      const country = res.locals.country;
      const scholarship = await this.service.readAllScholarshipService();
      return res.status(201).json({
        message: "Successfully retrieved",
        callCookie,
        country,
        data: scholarship,
      });
    } catch (error) {
      console.error("controller {read all scholarships}:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readScholarshipByCountry(req, res) {
    try {
      const scholarship = await this.service.readScholarshipByCountryService();
      return res
        .status(201)
        .json({ message: "Successfully retrieved", data: scholarship });
    } catch (error) {
      console.error("controller {read scholarship by country}:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
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
    try {
      const { scholarshipcategory } = req.params;
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
    try {
      const callCookie = res.locals.callCookie;
      const country = res.locals.country;
      const { id } = req.params;
      const scholarship = await this.service.readScholarshipByIDService(id);
      return res.status(201).json({
        message: "Successfully Retrieved",
        callCookie,
        country,
        data: [scholarship],
      });
    } catch (error) {
      console.error("controller {read scholarship by id}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readScholarshipByCountry(req, res) {
    try {
      const { countryname } = req.params;
      const scholarship = await this.service.searchScholarshipByCountryService(
        countryname
      );
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: [scholarship] });
    } catch (error) {
      console.error("controller {read scholarship by country}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async searchScholarshipByCountry(req, res) {
    try {
      const { country } = req.body;
      const scholarship = await this.service.searchScholarshipByCountryService(
        country
      );
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: scholarship });
    } catch (error) {
      console.error(
        "controller {search scholarship by country}:",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editScholarship(req, res) {
    try {
      const { id } = req.params;
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
    try {
      const {
        scholarshipname,
        deadline,
        scholarshiptype,
        featured,
        programs,
        country,
        description,
        scholarshipcategory,
        eligibility,
        duration,
        programsoffered,
        documentsrequired,
        benefits,
        applicationinformation,
        agent,
        hostuniversity,
      } = req.body;
      const { id } = req.params;
      const image = req.file.filename;
      const scholarshipData = {
        id,
        scholarshipname,
        deadline,
        scholarshiptype,
        featured,
        programs,
        country,
        description,
        scholarshipcategory,
        eligibility,
        duration,
        programsoffered,
        documentsrequired,
        benefits,
        applicationinformation,
        agent,
        hostuniversity,
        image,
      };
      const scholarship = await this.service.updateScholarshipService(
        scholarshipData
      );
      return res
        .status(201)
        .json({ message: "Successfully Updated", data: scholarship });
    } catch (error) {
      console.error("controller {edit scholarship}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteScholarship(req, res) {
    try {
      const { id } = req.params;
      const scholarship = await this.service.deleteScholarshipService(id);
      return res
        .status(201)
        .json({ message: "Successfully Deleted", data: scholarship });
    } catch (error) {
      console.error("controller {delete scholarship}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default ScholarshipController;
