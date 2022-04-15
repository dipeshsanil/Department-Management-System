import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const ViewStaff = ({match}) => {
    const [users, setUser] = useState([]);

  const {user, token}  = isAuthenticated();

  const preload = () => {
    getUsers().then(data => {
        if (data.error) {
        console.log(data.error);
      } else {
        setUser(data);
      }
    });
  };

  const deleteThisUser = userId => {
    deleteUser(userId, token).then(data => {
        if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };


  useEffect(() => {
    preload();
  }, []);

    return(
        <Base title="Welcome admin" description="Manage departments here">
      <Link className="btn btn-warning" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
        <h2 className="mb-4">All Users:</h2>
        {users.map((user, index) => {
            if(match.params.departmentId === user.department)
            {
            return (
              <div key={index} className="row text-center mb-2 border border-primary">
                <div className="col-6 bg-info">
                  <h3 className="text-white text-left">{user.name}</h3>
                </div>
                <div className="col-2 bg-primary">
                  <Link
                    className="btn btn-primary btn-lg"
                    to={`/user/profile/${user._id}`}
                  >
                    <span className="">View Profile</span>
                  </Link>
                </div>
                <div className="col-2 bg-success">
                  <Link
                    className="btn btn-success btn-lg"
                    to={`/admin/user/update/${user._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-2 bg-danger">
                <button
                  onClick={() => {
                    deleteThisUser(user._id);
                  }}
                    className="btn btn-danger btn-lg"
                  >
                    <span className="">Delete</span>
                  </button>
                </div>
              </div>
            );
            }
          })}
          
        </div>
      </div>
    </Base>
    )
}

export default ViewStaff;