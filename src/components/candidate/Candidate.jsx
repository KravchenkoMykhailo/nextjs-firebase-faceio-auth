"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { useCandidate } from "./hook/useCandidate";
import { storage } from "../../../firebase/firebase";
import { useAuthentication } from "@/contexts/authentication";
import View from "./View";

const Candidate = () => {
  const params = useParams();

  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);

  const { initialValues, schema, handleSubmit, handleDelete, allCandidates } =
    useCandidate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [percentage, setPercentage] = useState("");
  const { user } = useAuthentication();
  const router = useRouter();

  const handleImageChange = async (event) => {
    setSelectedImage(event.target.files[0]);
    setShowImage(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      if (user.email != "admin@gmail.com" || user.name != "admin")
        router.push("/");
    }
  }, [user]);

  const handleFormSubmit = (values, { resetForm }) => {
    console.log("handleFormSubmit");
    const file = selectedImage;
    let uploadedUrl = "";
    if (file) {
      console.log("file is ok");
      const storageRef = ref(storage, `${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setSubmitBtnStatus(false);
      setPercentage(0);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercentage(progress);
          console.log(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            uploadedUrl = downloadURL;
            setPercentage(100);
            handleSubmit({ ...values, imageUrl: uploadedUrl }, { resetForm });
          });
        }
      );
    }
  };

  return (
    user && (
      <div className="flex w-full h-full">
        <div className="h-full bg-blue-300">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={schema}
            onSubmit={handleFormSubmit}
          >
            <Form>
              <div className="flex justify-center items-center p-8">
                <div className="bg-blue-300 flex flex-col justify-center items-start  p-10 gap-4">
                  {/* <h1>{authUser ? `Welcome ${authUser.name}` : "Welcome"}</h1> */}
                  <div className="flex flex-col justify-center items-start gap-3">
                    <label>Image Upload</label>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                    />
                    <div>{percentage}</div>
                    {showImage && (
                      <img
                        src={showImage}
                        width="150"
                        height="150"
                        alt="Selected"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-start gap-3">
                    <label>Candidate Name</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="h-10 rounded-sm p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start gap-3">
                    <label>Party</label>
                    <Field
                      type="text"
                      name="party"
                      id="party"
                      className="h-10 rounded-sm p-2"
                    />
                    <ErrorMessage
                      name="party"
                      component="div"
                      className="text-red-600 font-semibold"
                    />
                  </div>
                  <div className="flex w-full justify-center items-center gap-3">
                    <button
                      disabled={!submitBtnStatus}
                      type="submit"
                      className="bg-slate-700 p-3 text-white font-bold rounded-lg"
                    >
                      {"Add Candidate"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <View candidates={allCandidates} handleDelete={handleDelete} />
      </div>
    )
  );
};

export default Candidate;
