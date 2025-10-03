import React from "react";
import style from "./style.module.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={style.error_container}>
      <div className={style.error_content}>
        <h1 className={style.error_code}>404</h1>

        <h2 className={style.error_title}>Page Not Found</h2>

        <p className={style.error_message}>
          The page you're looking for doesn't exist or has been moved. Please
          check the URL or return to the homepage.
        </p>

        <div className={style.error_actions}>
          <button
            className={`${style.error_btn} ${style.error_btn_primary}`}
            onClick={handleGoHome}>
            <GrHomeRounded size={18} />
            Go Home
          </button>
          <button
            className={`${style.error_btn} ${style.error_btn_secondary}`}
            onClick={handleGoBack}>
            <IoMdArrowRoundBack size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
