import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { Avatar, Badge, Tooltip } from "antd";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loadImage, setLoadImage] = useState(false);

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
                console.log("Image upload res data ", res);
                setLoadImage(false);

                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                console.log("Upload image failed ", err);
                setLoadImage(false);
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
      <div className="row p-2">
        {values.images &&
          values.images.map((image) => (
            <Tooltip title="Delete" placement="rightTop">
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  className="ml-3"
                  shape="square"
                />
              </Badge>
            </Tooltip>
          ))}
      </div>
      <div className="form-group">
        {loadImage && (
          <div className="row p-4 d-flex justify-content-center">
            <Spinner />
          </div>
        )}
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
