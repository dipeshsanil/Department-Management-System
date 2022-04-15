import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteAnnouncement, getAnnouncements } from './helper/adminapicall';

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    const {user, token}  = isAuthenticated();
  
    const preload = () => {
        getAnnouncements().then(data => {
          if (data.error) {
          console.log(data.error);
        } else {
            setAnnouncements(data);
        }
      });
    };
  
    useEffect(() => {
      preload();
    }, []);
  
    const deleteThisAnnouncement = announcementId => {
      deleteAnnouncement(announcementId, user._id, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      });
    };
  
      return(
          <Base title="Welcome admin" description="Manage announcements here">
        <Link className="btn btn-warning" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
          <h2 className="mb-4">All Announcements:</h2>
          {announcements.map((announcement, index) => {
              return (
                <div key={index} className="row text-center mb-2 border border-primary">
                  <div className="col-10 bg-info">
                    <h3 className="text-white ">{announcement.content}</h3>
                  </div>
                  <div className="col-2 bg-danger">
                    <button
                    onClick={() => {
                      deleteThisAnnouncement(announcement._id);
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
};

export default ManageAnnouncements;