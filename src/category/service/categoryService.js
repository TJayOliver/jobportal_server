import { nanoid } from "nanoid";

class CategoryService {
  constructor(database) {
    this.database = database;
  }

  async createCategoryService(categoryname) {
    try {
      const checkCategory = await this.database.readCategoryByName(
        categoryname
      );
      if (checkCategory) return { error: `${categoryname} Already Exist` };
      const categoryDetails = {
        id: nanoid(),
        categoryname,
      };
      const category = await this.database.createCategory(categoryDetails);
      return category;
    } catch (error) {
      console.error("service {create category}:", error.message);
    }
  }

  async countCategoryService() {
    try {
      const category = await this.database.countCategory();
      return category;
    } catch (error) {
      console.error("service {count category}:", error.message);
    }
  }

  async readAllCategoryService() {
    try {
      const category = await this.database.readAllCategory();
      return category;
    } catch (error) {
      console.error("service {read all category}:", error.message);
    }
  }

  async editCategoryService(id) {
    try {
      const category = await this.database.editCategory(id);
      return category;
    } catch (error) {
      console.error("service {edit category}:", error.message);
    }
  }

  async updateCategoryService(categoryDetails) {
    try {
      const category = await this.database.updateCategory(categoryDetails);
      return category;
    } catch (error) {
      console.error("service {update category}:", error.message);
    }
  }

  async deleteCategoryService(id) {
    try {
      const category = await this.database.deleteCategory(id);
      return category;
    } catch (error) {
      console.error("service {delete category}:", error.message);
    }
  }
}

export default CategoryService;
