import React from "react";
function PositionListItem({position, jobIndex, onClick}) {
    return(
        <div className="panel panel-success">
            <div className="panel-heading" onClick={() => (onClick(jobIndex))}>
                <div className="row">
                    <div className="col-xs-12">
                      {/*  <div><button className="btn-primary pull-right update" onClick={(e) => (onClick(e,jobIndex,'update'))}>update</button></div>
                        <div><button className="btn-primary pull-right delete">delete</button></div>*/}
                        <h3 className="project-name">test title in position list item js</h3>
                        <h3 className="panel-title">{position.project}</h3>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
            <div className="panel-body">
                <p>Location: {position.location}</p>
                <p>Open positions: {position.openPosition.numberOfPositions}</p>
                <div>{position.description}</div>
            </div>
        </div>
    );
}

export default PositionListItem;