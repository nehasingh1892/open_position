import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import RequirementRow from "./positionRequirements";

const ViewPositionDetails = (props) => {
    debugger;
    const obj = (props.positions.length > 0) ? props.positions[props.match.params.jobIndex] : {};
    props.match.params.operationToBePerformed!='general' ? obj.operation='update' : obj.operation=null;
    return(
        <div>
            {(props.positions.length > 0) ?
                <div>
                    <div className="bs-callout">
                        <p>{obj.openPosition.title}</p>
                        <p>{obj.project}</p>
                    </div>
                    <div className="bs-callout">
                        <table className="table table-bordered">
                            <tbody>
                            <RequirementRow title="Location:" value={obj.location} />
                            <RequirementRow title="Skills Required:" value={obj.openPosition.skills.join(", ")} />
                            <RequirementRow title="Seniority Level:" value={obj.openPosition.seniorityLevel} />
                            <RequirementRow title="Description:" value={obj.openPosition.positionDescription} />
                            </tbody>
                        </table>
                    </div>
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