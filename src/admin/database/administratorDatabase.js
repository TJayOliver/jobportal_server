import { adminModel } from "../../../schema/mongoSchema.js";

class AdministratorDatabase {
  async createAdmin(details) {
    try {
      const admin = await adminModel.create(details);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdmin() {
    try {
      const admin = await adminModel.find();
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByUsername(username) {
    try {
      const admin = await adminModel.findOne({ username: username });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByName(name) {
    try {
      const admin = await adminModel.findOne(
        { name: name },
        { image: 1, linkedin: 1, facebook: 1, twitter: 1 }
      );
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByID(id) {
    try {
      const admin = await adminModel.findOne({ id: id });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async checkSessionByID(id) {
    try {
      const admin = await adminModel.findOne({ id: id });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(id) {
    try {
      const admin = await adminModel.deleteOne({ id: id });
      return admin;
    } catch (error) {
      throw error;
    }
  }
}
export default AdministratorDatabase;
