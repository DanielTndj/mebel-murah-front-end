import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import Spinner from "../../components/spinner/Spinner";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (role) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const sendLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      try {
        const { data } = await createOrUpdateUser(idTokenResult.token);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: data.name,
            email: data.email,
            token: idTokenResult.token,
            role: data.role,
            _id: data._id,
          },
        });
        roleBasedRedirect(data.role);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const sendGoogleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      try {
        const { data } = await createOrUpdateUser(idTokenResult.token);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: data.name,
            email: data.email,
            token: idTokenResult.token,
            role: data.role,
            _id: data._id,
          },
        });

        roleBasedRedirect(data.role);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={sendLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            disabled={loading}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            disabled={loading}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={sendLogin}
            type="primary"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 8}
          >
            Login with Email
          </Button>
        )}
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loginForm()}
          <Button
            onClick={sendGoogleLogin}
            type="danger"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link
            to="/forgot/password"
            className="d-flex justify-content-center text-secondary mt-2 unde"
          >
            <u>Forgot Password</u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
