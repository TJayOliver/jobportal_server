import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseStorage } from "../configuration/firebase.js";

export const storeToFirebase = async (image) => {
  try {
    const file = image;
    const storage = ref(firebaseStorage);
    const fileRef = ref(storage, file.originalname);
    await uploadBytes(fileRef, file.buffer);
    const imageURL = await getDownloadURL(fileRef);
    return imageURL;
  } catch (error) {
    console.error("storeToFirebase", error.message);
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
  }
};
