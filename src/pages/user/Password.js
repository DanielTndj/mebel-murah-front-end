import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import Spinner from "../../components/spinner/Spinner";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = async (event) => {
    event.preventDefault();

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const newPass = await auth.currentUser.updatePassword(password);
      setLoading(false);
      setPassword("");
      toast.success("Password updated");
      console.log(newPass, "newPass");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={changePassword}>
        <div className="form-group">
          <label htmlFor="password">Enter new password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={changePassword}
            type="primary"
            block
            shape="round"
            size="large"
          >
            Change Password
          </Button>
        )}
      </form>
    );
  };

  return (
    <div className="row">
      <UserNav selectedKeys="password" />
      <div className="m-5">{passwordUpdateForm()}</div>
    </div>
  );
};

export default Password;
