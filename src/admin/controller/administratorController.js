import {
  storeToFirebase,
  deleteFromFirebase,
} from "../../../lib/storeFirebase.js";

class AdministratorController {
  constructor(adminService) {
    this.service = adminService;
  }

  async createAdmin(req, res) {
    const { name, username, password, role, twitter, facebook, linkedin } =
      req.body;
    const image = req.file;
    try {
      const imageName = image.originalname;
      const imageUrl = await storeToFirebase(image);
      const adminDetails = {
        name,
        username,
        password,
        image: imageUrl,
        imagename: imageName,
        twitter,
        facebook,
        linkedin,
        role,
      };
      await this.service.createAdminService(adminDetails);
      return res.status(201).json({ message: "Successfully Created" });
    } catch (error) {
      console.error("controller:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAdmin(req, res) {
    try {
      const admin = await this.service.getAdminService();
      return res
        .status(201)
        .json({ message: "Successfully Retrieved", data: admin });
    } catch (error) {
      console.error("controller:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAdminByUsername(req, res) {
    const { user } = req.params;
    try {
      const admin = await this.service.getAdminByUsernameService(user);
      return res.status(201).json({ status: true, admin });
    } catch (error) {
      console.error("get admin by username {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAdminByID(req, res) {
    const { id } = req.params;
    try {
      if (!id) res.status(401).json({ status: false });
      const admin = await this.service.getAdminByIDService(id);
      return res.status(201).json({ status: true, data: admin });
    } catch (error) {
      console.error("get admin by id {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAdminByName(req, res) {
    const { name } = req.body;
    try {
      const admin = await this.service.getAdminByNameService(name);
      return res.status(201).json({ admin });
    } catch (error) {
      console.error("get admin by username {controller}", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteAdmin(req, res) {
    const { id } = req.params;
    try {
      const getImage = await this.service.getAdminByIDService(id);
      const image = getImage.imagename;
      const deletedImageFromFirebase = await deleteFromFirebase(image);
      if (deletedImageFromFirebase) {
        await this.service.deleteAdminService(id);
        return res.status(201).json({ message: "Successfully Deleted" });
      }
    } catch (error) {
      console.error("delete admin {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async signInAdmin(req, res) {
    const user = req.user;
    return res.status(200).json({ status: true, user });
  }

  async signOutAdmin(req, res) {
    req.logOut((err) => {
      if (err) {
        return res.status(403).json({ status: false });
      } else {
        return res.status(200).json({ status: false });
      }
    });
  }
}

export default AdministratorController;
