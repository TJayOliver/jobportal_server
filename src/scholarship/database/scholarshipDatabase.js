import { scholarshipModel } from "../../../schema/mongoSchema.js";

class ScholarshipDatabase {
  async createScholarship(scholarshipData) {
    try {
      const scholarship = await scholarshipModel.create(scholarshipData);
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async countScholarship() {
    try {
      const scholarship = await scholarshipModel.countDocuments();
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async readScholarship() {
    try {
      const scholarship = await scholarshipModel.find();
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async readScholarshipByCountry(country) {
    try {
      const scholarship = await scholarshipModel
        .find({ country: country })
        .limit(8);
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async readFeaturedScholarship(value) {
    try {
      const scholarship = await scholarshipModel
        .find({ featured: value })
        .limit(8);
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async readScholarshipByCategory(scholarshipcategory) {
    try {
      const scholarship = await scholarshipModel.find({
        scholarshipcategory: scholarshipcategory,
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async readScholarshipByID(scholarshipID) {
    try {
      const scholarship = await scholarshipModel.findOne({
        id: scholarshipID,
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async searchScholarshipByCountry(country) {
    try {
      const scholarship = await scholarshipModel.find({
        country: { $regex: country, $options: "i" },
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async editScholarship(scholarshipID) {
    try {
      const scholarship = await scholarshipModel.findOne({
        id: scholarshipID,
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async updateScholarship(scholarshipData) {
    try {
      const id = scholarshipData?.id;
      const {
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
      } = scholarshipData;
      const update = {
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
      };
      const scholarship = await scholarshipModel.updateOne({ id: id }, update);
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async deleteScholarship(scholarshipID) {
    try {
      const scholarship = await scholarshipModel.deleteOne({
        id: scholarshipID,
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }
}
export default ScholarshipDatabase;
