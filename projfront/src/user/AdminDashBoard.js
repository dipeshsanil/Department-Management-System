import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const AdminDashboard = () => {
    const {
        user: {name,email,role}
    } = isAuthenticated();

    const adminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/department" className="nav-link text-info">Create Department</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/departments" className="nav-link text-info">Manage Departments</Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="list-group-item">
                    <Link to="/signup" className="nav-link text-info" >Add staff</Link>
                    </li>
                    )}
                    <li className="list-group-item">
                        <Link to="/admin/staffs" className="nav-link text-info">Manage staff</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/announcement" className="nav-link text-info">Add Announcement</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/announcements" className="nav-link text-info">Manage Announcements</Link>
                    </li>

                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return(
            <div className="card">
                <h4 className="card-header ">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                    <span className="badge bg-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                    <span className="badge bg-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                    <span className="badge bg-danger">Admin area</span> 
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title="Welcome to admin area" 
        description="Manage all of your admin tasks here"
        className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    );
};

export default AdminDashboard;