import React from "react";
import {read_cookie} from "sfcookies";

function PositionListItem({position, jobIndex, onClick, deleteThisTask}) {
    return(
        <div className="panel panel-success" style={{marginBottom: 0 + 'px', marginTop: 20 + 'px'}}>
            <div className="panel-heading" onClick={(e) => (onClick(e,jobIndex, 'general'))}>
                <div className="row">
                    <div className="col-xs-12">
                       <div><button className="btn-primary pull-right update" onClick={(e) => (deleteThisTask(e, jobIndex))}>Delete</button></div>
                        <div><button className="btn-primary pull-right update" onClick={(e) => (onClick(e,jobIndex,'update'))}>Update</button></div>

                        {/*<div><button className="btn-primary pull-right delete" onClick={(e) => (deleteThisTask(this,position))}>Delete</button></div>*/}
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
        </div>
    );
}

export default PositionListItem;