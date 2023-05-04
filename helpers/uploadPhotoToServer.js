import { nanoid } from "nanoid";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadPhotoToServer = async () => {
  const response = await fetch(photo);
  const file = await response.blob();
  const photoId = nanoid();
  const imagesRef = ref(storage, `${folder}/${photoId}`);

  await uploadBytesResumable(imagesRef, file);
  const url = await getDownloadURL(imagesRef);

  return url;
};
