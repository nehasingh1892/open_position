import React from "react";

function UserDetails({users, jobIndex, role}) {
    debugger;
    return(
        <div className="panel panel-success" >
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-12">
                        <h3 className="project-name">{users.name}</h3>
                        <h3 className="panel-title">{users.seniorityLevel}</h3>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>


            <div className="panel-body">
                <p>Location: {users.skills}</p>
            </div>
        </div>
    );
}

export default UserDetails;