import {
  storeToFirebase,
  deleteFromFirebase,
} from "../../../lib/storeFirebase.js";

class ScholarshipController {
  constructor(scholarshipService) {
    this.service = scholarshipService;
  }

  async createScholarship(req, res) {
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
    const image = req.file;
    try {
      const imageName = image.originalname;
      const imageUrl = await storeToFirebase(image);
      const scholarshipData = {
        image: imageUrl,
        imagename: imageName,
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
      await this.service.createScholarshipService(scholarshipData);
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
    const callCookie = res.locals.callCookie;
    const country = res.locals.country;
    try {
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
    const callCookie = res.locals.callCookie;
    const country = res.locals.country;
    const { id } = req.params;
    try {
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
    const { countryname } = req.params;
    try {
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
    const { country } = req.body;
    try {
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
    const image = req.file;
    try {
      const imageName = image.originalname;
      const imageUrl = await storeToFirebase(image);
      const deleteImage = await this.service.readScholarshipByIDService(id);
      const deleteImageName = deleteImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(
        deleteImageName
      );
      if (deletedImageFromFirebase) {
        const scholarshipData = {
          id,
          scholarshipname,
          image: imageUrl,
          imagename: imageName,
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
        };
        this.service.updateScholarshipService(scholarshipData);
        return res.status(201).json({ message: "Successfully Updated" });
      }
    } catch (error) {
      console.error("controller {edit scholarship}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteScholarship(req, res) {
    const { id } = req.params;
    try {
      const getImage = await this.service.readScholarshipByIDService(id);
      const image = getImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(image);
      if (deletedImageFromFirebase) {
        await this.service.deleteScholarshipService(id);
        return res.status(201).json({ message: "Successfully Deleted" });
      }
    } catch (error) {
      console.error("delete scholarship {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default ScholarshipController;
