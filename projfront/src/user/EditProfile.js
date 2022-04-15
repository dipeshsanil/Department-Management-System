import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const EditProfile = () => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        contact:"",
        error:"",
        success:false
    })

    const {name,email,password,error,contact,success} = values;

    const {
        user: {token,_id}
    } = isAuthenticated();

    const preload = (userId) => {
        getUser(userId).then(data => {
          console.log(data);
          if(data.error){
            setValues({...values,error:data.error});
          } else {
            setValues({...values, 
                name: data.name,
                email: data.email,
                contact: data.contact,
                password: data.password
            });
          }
        })
      }
    
      useEffect(() => {
        preload(_id);
      }, []);

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSumbit = event => {
        event.preventDefault()
        setValues({...values, error:false})
        updateUser(_id, token, {name,email,password,contact})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
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
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email}/>
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
                       Account Updated sucessfully.<Link to="/user/dashboard">Dashboard</Link>
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
        <Base title="Edit Profile" description="Edit your profile here">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    );
};

export default EditProfile;