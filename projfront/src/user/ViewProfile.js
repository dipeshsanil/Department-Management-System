import React, {useEffect, useState} from 'react';
import { getUser } from '../admin/helper/adminapicall';
import Base from '../core/Base';


const ViewProfile = ({match}) => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        designation:"",
        contact:"",
        error:"",
        success:false
    })

    const {name,email,designation,contact,error,success} = values;

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
                contact: data.contact
            });
          }
        })
      }

      useEffect(() => {
        preload(match.params.userId);
      }, []);

    return(
        <Base title="User Profile" 
        description="View your user information here"
        className="container bg-success p-4"
        >
            <div className="card text-dark">
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
                    <span className="badge bg-primary">Profile area</span> 
                    </li>
                </ul>
            </div>
        </Base>
    );
};

export default ViewProfile;