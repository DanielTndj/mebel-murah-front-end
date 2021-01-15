import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import {  Image, Button, Popconfirm } from "antd";

const FileUpload = ({ values, setValues, setLoadImage }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (event) => {
    let { files } = event.target;
    let allUploadedFiles = values.images;

    if (files) {
      setLoadImage(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                setLoadImage(false);
                console.log("Image upload res data ", res);

                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoadImage(false);
                console.log("Upload image failed ", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoadImage(true);

    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoadImage(false);
        const { images } = values;
        let filterImages = images.filter(
          (image) => image.public_id !== public_id
        );

        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        console.log(err);
        setLoadImage(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <div key={image.public_id} className="ml-4 pb-4">
              <Image
                src={image.url}
                width={150}
                style={{ maxHeight: "80px", objectFit: "cover" }}
              />
              <div className=" d-flex justify-content-center">
                <Popconfirm
                  title="Are you sure to delete this image of product?"
                  onConfirm={() => handleRemove(image.public_id)}
                  onCancel={() => console.log("cancelled")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger block="true" className="mt-1" size="small">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))}
      </div>
      <div className="form-group">
        <label className="pb-2">Upload Photos of Products</label>
        <br />
        <label className="btn btn-outline-info">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
