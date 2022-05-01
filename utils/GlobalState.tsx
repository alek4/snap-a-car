import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../services/firebase";
import Context from "./context";

interface GlobalStateProps {}

export const GlobalState: React.FC<GlobalStateProps> = (props) => {
  const [state, setState] = useState<{ cars: any[] }>({
    cars: [],
  });

  async function addNewCar(car: any) {
    const list = [...state.cars, car];
    setState({ cars: list });

    if (auth.currentUser) {
      const userID = auth.currentUser.uid;

      let carImageCpy = car.image;

      let i;
      for (i = carImageCpy.length - 1; i >= 0; i--) {
        if (carImageCpy[i] === "/") break;
      }

      const fileName = carImageCpy.slice(i + 1);

      const carImageRef = ref(
        storage,
        `car_images/${userID}/${fileName}`
      );

      const fetchResponse = await fetch(car.image);
      const blob = await fetchResponse.blob();
      let downloadURL;

      await uploadBytes(carImageRef, blob, {
        contentType: "image/jpeg",
      }).then(async (snapshot) => {
        await getDownloadURL(carImageRef).then((_downloadURL) => {
          // console.log("File available at", _downloadURL);
          downloadURL = _downloadURL;
        });
      });

      const carsRef = doc(db, "users", userID);
      const docSnap = await getDoc(carsRef);

      car.image = downloadURL;

      if (docSnap.exists()) {
        await updateDoc(carsRef, { cars: arrayUnion(car) });
      } else {
        await setDoc(carsRef, { cars: arrayUnion(car) });
      }
    }
    
  }

  async function deleteCar(taskId: number) {
    if (auth.currentUser) {
      const userID = auth.currentUser.uid;
      const carsRef = doc(db, "users", userID);
      const docSnap = await getDoc(carsRef);

      const carImageCpy = state.cars[taskId].image;

      let i;
      for (i = carImageCpy.length - 1; i >= 0; i--) {
        if (carImageCpy[i] === "%") break;
      }

      let j;
      for (j = carImageCpy.length - 1; j >= 0; j--) {
        if (carImageCpy[j] === "?") break;
      }

      const fileName = carImageCpy.slice(i + 3, j);

      const carImageRef = ref(
        storage,
        `car_images/${userID}/${fileName}`
      );

      // Delete the file
      deleteObject(carImageRef)
        .then(() => {
          // File deleted successfully
          // console.log("image deleted");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });

      if (docSnap.exists()) {
        await updateDoc(carsRef, {
          cars: arrayRemove(state.cars[taskId]),
        });
      }
    }
    state.cars.splice(taskId, 1);
    setState({ cars: state.cars });
  }

  function deleteContext() {
    setState({ cars: [] });
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser) {
        const carsRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(carsRef);
        if (docSnap.exists()) {
          const list = [...docSnap.data().cars];
          setState({ cars: [...list] });
        }
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{
        cars: state.cars,
        addNewCar: addNewCar,
        deleteCar: deleteCar,
        deleteContext: deleteContext,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
