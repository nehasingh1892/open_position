import React from "react";
function UserDetails({user}) {
    return(
        <div className="panel panel-success">
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-12">
                        {user.name}
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;