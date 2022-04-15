import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteDepartment, getDepartments } from './helper/adminapicall';

const ManageDepartments = () => {
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

  const deleteThisDepartment = departmentId => {
    deleteDepartment(departmentId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

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
                <div className="col-6 bg-info">
                  <h3 className="text-white text-left">{department.name}</h3>
                </div>
                <div className="col-3 bg-success">
                  <Link
                    className="btn btn-success btn-lg"
                    to={`/admin/department/update/${department._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-3 bg-danger">
                  <button
                  onClick={() => {
                    deleteThisDepartment(department._id);
                  }}
                    className="btn btn-danger btn-lg"
                  >
                    <span className="">Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </Base>
    )
}

export default ManageDepartments;