import React from "react";

const NotFound = () => {
  return (
    <div
      className="position-relative"
      style={{ minHeight: "calc(100vh-70px)" }}
    >
      <h2
        className="position-absolute text-secondary my-4"
        style={{ top: "50%", left: "10%", transform: "translate(-0%,-0%)" }}
      >
        Bạn không có quyền vào chức năng này
      </h2>
    </div>
  );
};

export default NotFound;
