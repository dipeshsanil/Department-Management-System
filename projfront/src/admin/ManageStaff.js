import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getDepartments } from './helper/adminapicall';

const ManageStaff = () => {
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
        <Base title="Welcome admin" description="Manage departments here">
      <Link className="btn btn-warning" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
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
                <div className="col-4 bg-secondary">
                  <Link
                    className="btn btn-secondary btn-lg"
                    to={`/admin/staff/${department._id}`}
                  >
                    <span className="">View Staff</span>
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

export default ManageStaff;