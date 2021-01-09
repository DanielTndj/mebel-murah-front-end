import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  const loadingOutlined = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Spin
      indicator={loadingOutlined}
      className="d-flex justify-content-center"
    />
  );
};

export default Spinner;
