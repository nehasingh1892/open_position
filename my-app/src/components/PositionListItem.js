import React from "react";
import RequirementRow from '../components/positionRequirements';
import '../App.css';


function PositionListItem({position, jobIndex, onClick, deleteThisTask, role, updatePosition, users, ApplyUser, ApplyText, AppliedUsers, ShowHideFlag}) {
const positionID = position.positionid;
    debugger;
    return(
        <div className="panel panel-success" style={{marginBottom: 0 + 'px', marginTop: 20 + 'px'}}>
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-12">
                        {users.role === "User" ?  " " : <div>
                                <div><button className="btn-primary pull-right update glyphicon glyphicon-trash" onClick={(e) => (deleteThisTask(e, position))}></button></div>
                                <div><button className="btn-primary pull-right update glyphicon glyphicon-pencil" onClick={(e) => (updatePosition(e, position))}></button></div>
                                <div><button type="button" className="btn-primary pull-right update glyphicon glyphicon-eye-open" data-toggle="collapse" data-target={"#"+ positionID}></button></div>
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


            <div id={position.positionid} className="collapse">
                <div className="bs-callout">
                    <table className="table table-bordered">
                        <tbody>
                        <RequirementRow title="Location:" value={position.location} />
                        <RequirementRow title="Work Location :" value={position.OnshoreOffshore} />
                        <RequirementRow title="Skills Required:" value={position.skills} />
                        <RequirementRow title="Seniority Level:" value={position.seniorityLevel} />
                        <RequirementRow title="Description:" value={position.positionDescription} />
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );



}

export default PositionListItem;