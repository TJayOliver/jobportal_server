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
      const scholarship = await scholarshipModel
        .find()
        .sort({ datecreated: -1 });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async readFeaturedScholarship(value) {
    try {
      const scholarship = await scholarshipModel
        .find({ featured: value })
        .limit(8)
        .sort({ datecreated: -1 });
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

  async searchScholarshipByName(scholarshipname) {
    try {
      const scholarship = await scholarshipModel.find({
        scholarshipname: { $regex: scholarshipname, $options: "i" },
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async searchScholarshipByRecentAndOldest(filter) {
    try {
      const sortOrder = filter === "Recent" ? -1 : 1;
      const scholarship = await scholarshipModel.find().sort({
        datecreated: sortOrder,
      });
      return scholarship;
    } catch (error) {
      throw error;
    }
  }

  async searchScholarshipByFilters(filters) {
    try {
      const query = {};
      // Apply filters only if they exist in the request
      if (filters.type && filters.type.length > 0) {
        query.type = { $in: filters.type }; // Matches any of the selected types
      }
      if (filters.level && filters.level.length > 0) {
        query.level = { $in: filters.level }; // Matches any of the selected levels
      }
      if (filters.category && filters.category.length > 0) {
        query.category = { $in: filters.category }; // Matches any of the selected categories
      }
      const scholarship = await scholarshipModel
        .find(query)
        .sort({ createdAt: -1 })
        .exec();
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
        imagename,
        scholarshipname,
        deadline,
        description,
        post,
        featured,
        scholarshiptype,
        programs,
        scholarshipcategory,
        country,
      } = scholarshipData;
      const update = {
        image,
        imagename,
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
