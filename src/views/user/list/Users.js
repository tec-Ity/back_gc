import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { getRole } from "../../../js/conf/confUser";
import { getObjs_Prom } from "../../../js/api";

import UserAddModal from "../add/UserAddModal";
import NavBread from "../../../components/NavBread";

export default function Users(props) {
  const role = getRole();
  const [Users, setUsers] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const apiUsers = "/Users";

  const usersCall = useCallback(() => {
    getObjs_Prom(apiUsers, Users, setUsers, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    usersCall();
    return () => setUsers([]);
  }, [usersCall]);

  return (
    <>
      <NavBread  activePage="Users"></NavBread>

      <div className="text-right">
	<button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
	<UserAddModal
		show={modalShow}
		onHide={() => setModalShow(false)}
	/>
      </div>

      <div className="list mt-3">
        {Users.map((User) => {
          return (
            <div className="row" key={User._id}>
              <div className="col-3">
                <Link to={`/${role.val}/user/${User._id}`}>{User.code}</Link>
              </div>
              <div className="col-3">{User.nome}</div>
              <div className="col-3">{role.cn}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
