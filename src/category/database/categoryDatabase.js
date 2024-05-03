import { categoryModel } from "../../../schema/mongoSchema.js";

class CategoryDatabase {
  async createCategory(categoryDetails) {
    try {
      const category = await categoryModel.create(categoryDetails);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async countCategory() {
    try {
      const category = await categoryModel.countDocuments();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async readAllCategory() {
    try {
      const category = await categoryModel.find().sort({ categoryname: 1 });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async readCategoryByName(categoryname) {
    try {
      const category = await categoryModel.findOne({
        categoryname: categoryname,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async editCategory(id) {
    try {
      const category = await categoryModel.find({
        id: id,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryDetails) {
    try {
      const id = categoryDetails?.id;
      const { categoryname } = categoryDetails;
      const update = { categoryname };
      const category = await categoryModel.updateOne({ id: id }, update);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const category = await categoryModel.deleteOne({
        id: id,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryDatabase;
