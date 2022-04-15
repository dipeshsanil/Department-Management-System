import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const Announcements = () => {
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
          <Base title="Welcome User" description="Check all announcements here">
        <Link className="btn btn-info" to={`/user/dashboard`}>
          <span className="">User Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
          <h2 className="mb-4">All Announcements:</h2>
          {announcements.map((announcement, index) => {
              return (
                <div key={index} className="row text-center mb-2 border border-primary">
                  <div className="col-12 bg-info">
                    <h3 className="text-white ">{announcement.content}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
      </Base>
      )
};

export default Announcements;