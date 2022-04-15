import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const UserStaff = ({match}) => {
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
        <Base title="Welcome User" description="View all staff">
      <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">User Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
        <h2 className="mb-4">All Staff:</h2>
        {users.map((user, index) => {
            if(match.params.departmentId === user.department)
            {
            return (
              <div key={index} className="row text-center mb-2 border border-primary">
                <div className="col-8 bg-success">
                  <h3 className="text-white text-left">{user.name}</h3>
                </div>
                <div className="col-4 bg-primary">
                  <Link
                    className="btn btn-primary btn-lg"
                    to={`/user/profile/${user._id}`}
                  >
                    <span className="">View Profile</span>
                  </Link>
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

export default UserStaff;