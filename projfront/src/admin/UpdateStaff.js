import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { getDepartments, getUser, updateUser } from './helper/adminapicall';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
const UpdateStaff = ({match}) => {

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        designation:"",
        contact:"",
        department: "",
        departments: [],
        error:"",
        success:false
    })

    const {name,email,password,error,department,departments,designation,contact,success} = values;

    const{user,token} =isAuthenticated();

    const preload = (userId) => {
        getUser(userId).then(data => {
          console.log(data);
          if(data.error){
            setValues({...values,error:data.error});
          } else {
            preloadDepartments();
            setValues({...values, 
                name: data.name,
                department: data.department,
                email: data.email,
                designation: data.designation,
                contact: data.contact,
                password: data.password
            });
            console.log(departments);
          }
        })
      }

      const preloadDepartments = () => {
        getDepartments().then(data => {
          console.log(data);
          if(data.error){
            setValues({...values,error:data.error});
          } else {
            setValues({departments: data});
            console.log(departments);
          }
        })
      }
    
      useEffect(() => {
        preload(match.params.userId);
      }, []);

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSumbit = event => {
        event.preventDefault()
        setValues({...values, error:false})
        updateUser(match.params.userId, token, {name,email,department,password,designation,contact})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    department:"",
                    designation:"",
                    contact:"",
                    error:"",
                    success:true
                });
            }
        })
        .catch(console.log("Error in updating account"));
    }

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group py-1">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} type="text" value={name}/>
                        </div>
                        <div className="form-group py-1">
                        <label className="text-light">Department</label>
                        <select
                        onChange={handleChange("department")}
                        className="form-control"
                        placeholder="Department"
                        >
                        <option>Select</option>
                        {departments && 
                        departments.map((department, index) => (
                            <option key={index} value={department._id}>{department.name}</option>
                        ))
                        }
                        
                        </select>
                        </div>
                        <div className="form-group py-1">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email}/>
                        </div>
                        <div className="form-group py-1">
                            <label className="text-light">Designation</label>
                            <input className="form-control" onChange={handleChange("designation")} type="text" value={designation}/>
                        </div>
                        <div className="form-group py-1">
                            <label className="text-light">Contact No.</label>
                            <input className="form-control" onChange={handleChange("contact")} type="text" value={contact}/>
                        </div>
                        <div className="form-group py-1">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password}/>
                        </div>
                        <div class="d-grid gap-2">
                        <button onClick={onSumbit} class="btn btn-success" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                    style={{display: success ? "" : "none"}}
                    >
                       Account Updated sucessfully.<Link to="/admin/dashboard">Dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                    style={{display: error ? "" : "none"}}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Base title="Update Staff" description="">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    );
};

export default UpdateStaff;