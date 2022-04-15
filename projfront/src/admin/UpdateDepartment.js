import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { updateDepartment, getDepartment } from './helper/adminapicall';

const UpdateDepartment = ( {match} ) => {

    const [values, setValues] = useState({
        name:"",
        error:false,
        success :false,
    });

    const {name, error, success} = values;


    const{user,token} =isAuthenticated();

    const preload = (departmentId) => {
        getDepartment(departmentId).then(data => {
          console.log(data);
          if(data.error){
            setValues({...values,error:data.error});
          } else {
            setValues({
                ...values,
                name: data.name,
              });
          }
        })
      }

      useEffect(() => {
        preload(match.params.departmentId);
      }, [])
  

    const handleChange = event => {
        setValues({
            error: "",
            name: event.target.value
          });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", success:false})
        updateDepartment(match.params.departmentId, user._id, token, {name}).then(data => {
          if(data.error) {
            setValues({...values, error: data.error, success: false})
          }else {
            setValues({
              ...values,
              name: "",
              error: "",
              success:true
            })
          }
        })
      }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Department updated successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to update department</h4>
        }
    }


    const myDepartmentForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the department</p>
                    <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. IT"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update Department</button> 
                </div>
            </form>
        )
    };

    const goBack =() => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }


    return(
        <Base
        title="Update your departments here"
        description=""
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded"> 
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myDepartmentForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateDepartment;
