import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getDepartments } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const ViewDepartments = () => {
    const [departments, setDepartments] = useState([]);

  const {user, token}  = isAuthenticated();

  const preload = () => {
    getDepartments().then(data => {
        if (data.error) {
        console.log(data.error);
      } else {
        setDepartments(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

    return(
        <Base title="Welcome user" description="View all departments here">
      <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">User Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
        <h2 className="mb-4">All departments:</h2>
        {departments.map((department, index) => {
            return (
              <div key={index} className="row text-center mb-2 border border-primary">
                <div className="col-8 bg-info">
                  <h3 className="text-white text-left">{department.name}</h3>
                </div>
                <div className="col-4 bg-light">
                  <Link
                    className="btn btn-light"
                    to={`/user/staff/${department._id}`}
                  >
                    <span className="btn btn-lg">View Staff</span>
                  </Link>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </Base>
    )
}

export default ViewDepartments;