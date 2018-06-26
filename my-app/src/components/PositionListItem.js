import React from "react";

function PositionListItem({position, jobIndex, onClick, deleteThisTask, role, updatePosition, users, ApplyUser, ApplyText, AppliedUsers}) {

    debugger;
    return(
        <div className="panel panel-success" style={{marginBottom: 0 + 'px', marginTop: 20 + 'px'}}>
            <div className="panel-heading" onClick={(e) => (onClick(e,jobIndex, users.role, position.positionid))}>
                <div className="row">
                    <div className="col-xs-12">
                        {users.role === "User" ?  " " : <div>
                                <div><button className="btn-primary pull-right update" onClick={(e) => (deleteThisTask(e, position))}>Delete</button></div>
                                <div><button className="btn-primary pull-right update" onClick={(e) => (updatePosition(e, position))}>Update</button></div>
                            </div>}

                        <h3 className="project-name">{position.title}</h3>
                        <h3 className="panel-title">{position.project}</h3>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>


            <div className="panel-body">
                <p>Location: {position.location}</p>
                <p>Open positions: {position.numberOfPositions}</p>
                <div>{position.description}</div>
            </div>
            <div>{users.role === "User" ?  <button type="button" className="btn btn-primary" id="apply" onClick={(e) => (ApplyUser(e, position.positionid, users.userid))}>{ApplyText}</button> :" " }</div>

        </div>
    );



}

export default PositionListItem;