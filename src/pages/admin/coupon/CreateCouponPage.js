import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { Button, Popconfirm, Tooltip } from "antd";
import Spinner from "../../../components/spinner/Spinner";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length < 6 || name.length > 12) {
      toast.error("Name at least 6 to 12 characters");
      return;
    }

    if (discount <= 0) {
      toast.error("Discount can't be less than 0%");
      return;
    }

    if (expiry < new Date()) {
      toast.error("Expiry date is at least one day from today");
      return;
    }

    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadCoupons();
        setName("");
        setDiscount("");
        setExpiry(new Date());
        toast.success(`Coupon ${res.data.name} has been created`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteCoupon = (id) => {
    removeCoupon(id, user.token)
      .then((res) => {
        toast.success(`Coupon ${res.data.name} deleted`);
        loadCoupons();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="coupon" />
      {/* <h3>Coupon</h3> */}
      <div className="m-5 col">
        <h5>Create New Coupon</h5>
        <hr className="p-2" />
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Discount</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Expiry Date</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={expiry}
                  onChange={(date) => setExpiry(date)}
                  required
                />
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  block
                  shape="round"
                  size="large"
                >
                  Submit
                </Button>
              )}
            </form>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-md-12">
            <h5>{coupons.length} Coupons</h5>
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td>{coupon.name}</td>
                      <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                      <td>{coupon.discount}</td>
                      <td className="text-center text-danger">
                        <Popconfirm
                          title="Are you sure to delete this coupon?"
                          onConfirm={() => deleteCoupon(coupon._id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Tooltip title="Delete coupon" placement="top">
                            <DeleteOutlined className="text-danger pointer" />
                          </Tooltip>
                        </Popconfirm>
                        ,
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
