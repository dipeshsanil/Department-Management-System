import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import AddDepartment from './admin/AddDepartment';
import CreateAnnouncement from './admin/CreateAnnouncement';
import ManageAnnouncements from './admin/ManageAnnouncements';
import ManageDepartments from './admin/ManageDepartments';
import ManageStaff from './admin/ManageStaff';
import UpdateDepartment from './admin/UpdateDepartment';
import UpdateStaff from './admin/UpdateStaff';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Home from "./core/Home";
import AdminDashboard from './user/AdminDashBoard';
import Announcements from './user/Announcements';
import EditProfile from './user/EditProfile';
import LeaveApp from './user/LeaveApplication';
import Signin from './user/Signin';
import Signup from './user/Signup';
import TaskManager from './user/TaskManager';
import UserDashboard from './user/UserDashBoard';
import UserStaff from './user/UserStaff';
import ViewDepartments from './user/ViewDepartments';
import ViewProfile from './user/ViewProfile';
import ViewStaff from './user/ViewStaff';

const Routes = () => {
    return (
        <BrowserRouter>
         <Switch>
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={Signin} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
            <PrivateRoute path="/user/view/departments" exact component={ViewDepartments} />
            <PrivateRoute path="/user/staff/:departmentId" exact component={UserStaff} />
            <PrivateRoute path="/user/profile/:userId" exact component={ViewProfile} />
            <PrivateRoute path="/user/leave" exact component={LeaveApp} />
            <PrivateRoute path="/user/announcements" exact component={Announcements} />
            <PrivateRoute path="/user/taskmanager" exact component={TaskManager} />
            <PrivateRoute path="/edit/profile" exact component={EditProfile} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/admin/create/department" exact component={AddDepartment} />
            <AdminRoute path="/admin/departments" exact component={ManageDepartments} />
            <AdminRoute path="/admin/staffs" exact component={ManageStaff} />
            <AdminRoute path="/admin/staff/:departmentId" exact component={ViewStaff} />
            <AdminRoute path="/admin/department/update/:departmentId" exact component={UpdateDepartment} />
            <AdminRoute path="/admin/user/update/:userId" exact component={UpdateStaff} />
            <AdminRoute path="/user/profile/:userId" exact component={ViewProfile} />
            <AdminRoute path="/admin/create/announcement" exact component={CreateAnnouncement} />
            <AdminRoute path="/admin/announcements" exact component={ManageAnnouncements} />
         </Switch>
        </BrowserRouter>
    )
}

export default Routes;