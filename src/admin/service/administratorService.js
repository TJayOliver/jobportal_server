import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

class AdministratorService {
  constructor(database) {
    this.database = database;
  }

  async createAdminService({ name, username, password, image }) {
    const saltRounds = 10;
    try {
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const adminDetails = {
        id: nanoid(),
        name,
        username,
        password: passwordHash,
        image,
        twitter,
        facebook,
        linkedin,
      };
      const admin = await this.database.createAdmin(adminDetails);
      return admin;
    } catch (error) {
      console.error("create admin {service}:", error.message);
    }
  }

  async getAdminService() {
    try {
      const admin = await this.database.getAdmin();
      return admin;
    } catch (error) {
      console.error("get admin {service}:", error.message);
    }
  }

  async getAdminByUsernameService(username) {
    try {
      const admin = await this.database.getAdminByUsername(username);
      return admin;
    } catch (error) {
      console.error("get admin by username {service}:", error.message);
    }
  }

  async getAdminByIDService(id) {
    try {
      const admin = await this.database.getAdminByID(id);
      return admin;
    } catch (error) {
      console.error("get admin by id {service}:", error.message);
    }
  }

  async getAdminByNameService(name) {
    try {
      const admin = await this.database.getAdminByName(name);
      return admin;
    } catch (error) {
      console.error("get admin by name {service}:", error.message);
    }
  }

  async deleteAdminService(id) {
    try {
      const admin = await this.database.deleteAdmin(id);
      return admin;
    } catch (error) {
      console.error("delete admin {service}:", error.message);
    }
  }

  async checkSessionByIDService(id) {
    try {
      const admin = await this.database.checkSessionByID(id);
      return admin;
    } catch (error) {
      console.error("check session {service}:", error.message);
    }
  }
}

export default AdministratorService;
