import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import RequirementRow from "./positionRequirements";

const ViewPositionDetails = (props) => {
    debugger;

    const Back = ()=>{
        window.location.replace('#/Dashboard');
    }

    const obj = (props.positions.length > 0) ? props.positions[props.match.params.jobIndex] : {};
    props.match.params.operationToBePerformed!='general' ? obj.operation='update' : obj.operation=null;
    return(
        <div className="positionDetail">
            {(props.positions.length > 0) ?
                <div>
                    <div className="bs-callout">
                        <p>{obj.title}</p>
                        <p>{obj.project}</p>
                    </div>
                    <div className="bs-callout">
                        <table className="table table-bordered">
                            <tbody>
                            <RequirementRow title="Location:" value={obj.location} />
                            <RequirementRow title="Work Location :" value={obj.OnshoreOffshore} />
                            <RequirementRow title="Skills Required:" value={obj.skills} />
                            <RequirementRow title="Seniority Level:" value={obj.seniorityLevel} />
                            <RequirementRow title="Description:" value={obj.positionDescription} />
                            </tbody>
                        </table>
                    </div>

                    <div><button className="btn-primary" onClick={Back}>Back</button></div>

                </div>
                : null
            }
        </div>
    );
}

function mapStateToProps(state){
    return{
        positions: state.positions.slice()
    }
}

ViewPositionDetails.propTypes = {
    positions : PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ViewPositionDetails);