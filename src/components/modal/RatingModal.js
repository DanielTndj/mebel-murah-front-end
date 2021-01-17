import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-info" />
        <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        visible={visible}
        onOk={() => {
          setVisible(false);
          toast.success("Thanks for your review. It will appear soon");
        }}
        onCancel={() => setVisible(false)}
        centered="true"
        okText="Submit"
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
