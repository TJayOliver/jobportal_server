import { executeQuery } from "../../../configuration/mysql.config.js";

class AdministratorDatabase {
  async createAdmin(adminDetails) {
    try {
      const query = `INSERT INTO 
            administrator(id, name, username, password, image, twitter, facebook, linkedin, role) 
            VALUES(?,?,?,?,?,?,?,?,?)`;
      const parameter = [
        adminDetails.id,
        adminDetails.name,
        adminDetails.username,
        adminDetails.password,
        adminDetails.image,
        adminDetails.twitter,
        adminDetails.facebook,
        adminDetails.linkedin,
        adminDetails.role,
      ];

      const admin = await executeQuery(query, parameter);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdmin() {
    try {
      const query = `SELECT * FROM administrator`;
      const admin = await executeQuery(query);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByUsername(username) {
    try {
      const query = `SELECT * FROM administrator WHERE username=?`;
      const parameter = [username];
      const admin = await executeQuery(query, parameter);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByName(name) {
    try {
      const query = `SELECT image, linkedin, facebook, twitter FROM administrator WHERE name=?`;
      const parameter = [name];
      const admin = await executeQuery(query, parameter);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async getAdminByID(id) {
    try {
      const query = `SELECT * FROM administrator WHERE id=?`;
      const parameter = [id];
      const admin = await executeQuery(query, parameter);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(id) {
    try {
      const query = `DELETE FROM administrator WHERE id=?`;
      const parameter = [id];
      const admin = await executeQuery(query, parameter);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async checkSessionByID(id) {
    try {
      const query = `SELECT * FROM sessions WHERE id=?`;
      const parameter = [id];
      const admin = await executeQuery(query, parameter);
      return admin;
    } catch (error) {
      throw error;
    }
  }
}

export default AdministratorDatabase;
