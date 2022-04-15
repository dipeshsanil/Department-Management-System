import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const UserDashboard = () => {
    const {
        user: {name,email,role,_id}
    } = isAuthenticated();

    const [values, setValues] = useState({
        designation:"",
        contact:"",
        error:"",
        success:false
    })

    const {error,designation,contact,success} = values;

    const preload = (userId) => {
        getUser(userId).then(data => {
          console.log(data);
          if(data.error){
            setValues({...values,error:data.error});
          } else {
            setValues({...values, 
                name: data.name,
                email: data.email,
                designation: data.designation,
                contact: data.contact,
            });
          }
        })
      }

      useEffect(() => {
        preload(_id);
      }, []);

    const userLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">User Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/user/view/departments" className="nav-link text-info">View Departments</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/leave" className="nav-link text-info">Leave Application</Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="list-group-item">
                    <Link to="/signup" className="nav-link text-info" >Add staff</Link>
                    </li>
                    )}
                    <li className="list-group-item">
                        <Link to="/user/taskmanager" className="nav-link text-info">Task Manager</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/announcements" className="nav-link text-info">Announcements</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/edit/profile" className="nav-link text-info">Edit Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userRightSide = () => {
        return(
            <div className="card">
                <h4 className="card-header ">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                    <span className="badge bg-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                    <span className="badge bg-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                    <span className="badge bg-success mr-2">Designation:</span> {designation}
                    </li>
                    <li className="list-group-item">
                    <span className="badge bg-success mr-2">Contact No.:</span> {contact}
                    </li>
                    <li className="list-group-item">
                    <span className="badge bg-info">User area</span> 
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title="Welcome to user area" 
        description="View all your information  here"
        className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                    {userLeftSide()}
                </div>
                <div className="col-9">
                    {userRightSide()}
                </div>
            </div>
        </Base>
    );
};

export default UserDashboard;