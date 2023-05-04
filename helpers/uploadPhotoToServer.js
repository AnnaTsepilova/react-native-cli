import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export const uploadPhotoToServer = async () => {
  const response = await fetch(photo);
  const file = await response.blob();
  const photoId = "ph_" + Math.random() * 1000;
  const imagesRef = ref(storage, `${folder}/${photoId}`);

  await uploadBytesResumable(imagesRef, file);
  const url = await getDownloadURL(imagesRef);

  return url;
};
