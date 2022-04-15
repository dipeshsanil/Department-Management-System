import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const LeaveApp = () => {
    const {user, token}  = isAuthenticated();

    return (
        <Base title="Leave Application" description="Apply for leave here" className="container bg-success p-4">
            <div className="card text-dark">
                <h4 className="card-header ">Leave Application</h4>
                <form  className="list-group" action="mailto:leaveapplication@company.com" method="post" enctype="text/plain">
                <div class="form-group">
                <label for="exampleInputEmail1">Staff Name</label>
                <input type="plain" name="Staff Name" class="form-control" value={user.name}/>
                <br /><label for="exampleInputEmail1">Email address</label>
                <input type="email" name="Email address" value={user.email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <br /><label for="exampleInputEmail1">Start date</label>
                <input type="date" name="Start date" class="form-control"/>
                <br /><label for="exampleInputEmail1">End Date</label>
                <input type="date" name="End date" class="form-control"/>
                <br /><label for="exampleInputEmail1">Leave Type</label>
                <input type="plain" name="Leave type" class="form-control" placeholder="Enter leave type Ex.Casual" />
                </div>
                <br/>
                <input className="btn btn-success" type="submit"  />
                </form>    
            </div>
        </Base>
    );
};

export default LeaveApp;
