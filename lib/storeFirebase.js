import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseStorage } from "../configuration/firebase.js";
import { nanoid } from "nanoid";

export const storeToFirebase = async (image) => {
  try {
    const file = image;
    const imageName = nanoid(8) + file.originalname;
    const storage = ref(firebaseStorage);
    const fileRef = ref(storage, imageName);
    await uploadBytes(fileRef, file.buffer);
    const imageURL = await getDownloadURL(fileRef);
    return { imageURL, imageName };
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteFromFirebase = async (imagename) => {
  try {
    const file = imagename;
    const fileRef = ref(firebaseStorage, file);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error("deleteFromFirebase", error.message);
    return false;
  }
};
