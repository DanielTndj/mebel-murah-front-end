import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
      return;
    }
    setEmail(window.localStorage.getItem("emailRegistration"));
  }, [user, history]);

  const sendEmailRegistration = async (event) => {
    event.preventDefault();

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("result", result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailRegistration");

        let user = auth.currentUser;
        await user.updatePassword(password);
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
        } catch (error) {
          console.log("Error: ", error.message);
        }

        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={sendEmailRegistration}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email == null ? "" : email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </div>

        <Button
          onClick={sendEmailRegistration}
          type="primary"
          block
          shape="round"
          size="large"
        >
          Complete Registration
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">{completeRegistrationForm()}</div>
      </div>
    </div>
  );
};

export default RegisterComplete;
