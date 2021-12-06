import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import useStore from "../../store";
import { useNavigate } from "react-router";
import { Typography } from "antd";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const signIn = useStore((state) => state.signIn);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate("/", { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.container}>
      <div>
        <Typography.Title>
          <span className={styles.span}>Sun*</span> Employee Portal
        </Typography.Title>
      </div>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={signIn}
          onFailure={() => console.log("error login")}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
