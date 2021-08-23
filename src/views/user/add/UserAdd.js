import { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { getRole } from "../../../js/conf/confUser";
import { getObjs_Prom, fetch_Prom } from "../../../js/api";

import NavBread from "../../../components/NavBread";

export default function UserAdd(props) {
  const apiShops = "/Shops";
  const role = getRole();
  const hist = useHistory();

  const [formdata, setFormdata] = useState({ code: "test", pwd: "111111" });
  const [Shops, setShops] = useState([]);
  const chgFormdata = (type) => (e) =>
    setFormdata((pre) => ({ ...pre, [type]: e.target.value }));

  const submitPostObj = async () => {
    try {
      const userPost_res = await fetch_Prom("/userAdd", "POST", formdata);
      if (userPost_res.status === 200) {
        hist.replace(`/${role.val}/users`);
      } else {
        console.log(userPost_res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UserAddCallback = useCallback(() => {
    getObjs_Prom(apiShops, Shops, setShops, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    UserAddCallback();
    return () => setShops([]);
  }, [UserAddCallback]);

  return (
    <>
      <NavBread activePage="UserAdd">
        <Link to={`/${role.val}/users`}>Users</Link>
      </NavBread>

      <div className="my-3 row">
        <label htmlFor="code-ipt" className="col-sm-2 col-form-label "> code </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="code-ipt" onChange={chgFormdata("code")} value={formdata.code} />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="pwd-ipt" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="pwd-ipt"
            onChange={chgFormdata("pwd")}
            value={formdata.pwd}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <button className="btn btn-primary btn-block" onClick={submitPostObj}> submit </button>
        </div>
      </div>
    </>
  );
}
