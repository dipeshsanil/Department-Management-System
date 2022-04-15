import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createAnnouncement } from './helper/adminapicall';


const CreateAnnouncement = () => {
    const [content,setContent] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    const{user,token} =isAuthenticated();

    const handleChange = event => {
        setError("");
        setContent(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        createAnnouncement(user._id, token, {content}).then( data => {
        if(data.error) {
            setError(true);
        } else {
            setError("");
            setSuccess(true);
            setContent("");
        }
    })
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Announcement added successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to add announcement</h4>
        }
    }


    const myCategoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the announcement</p>
                    <textarea
                    type="text"
                    className="form-control my-3"
                    id="exampleFormControlTextarea1" 
                    rows="10"
                    onChange={handleChange}
                    value={content}
                    autoFocus
                    required
                    placeholder="Add announcements here"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Add Announcement</button> 
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
        title="Add your announcements here"
        description="Add a new announcement for your staff"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded"> 
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
};

export default CreateAnnouncement;