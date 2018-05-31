import React from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';


class DashboardComponent extends React.Component{

    constructor(props){
        super(props);
        this.addPositions = this.addPositions.bind(this);
        this.getPositionDetails = this.getPositionDetails.bind(this);
    }

    componentDidMount(){
        const that=this;
        fetch("https://demo4532585.mockable.io/open_position_get")
            .then(res => res.json())
            .then(json => {
                that.props.dispatchAllOpenPositions(json.positions);
                that.props.dispatchUserDetails(json.userDetails);
            })
            .catch(error => {console.log(error);});
    }

    addPositions = () => {
        this.props.history.push('/add')
    }

    getPositionDetails(event,jobIndex,operationToBePerformed){
        debugger;
        event.stopPropagation();
        operationToBePerformed!='general' ? this.props.history.push('/project/'+jobIndex+'/'+operationToBePerformed) : this.props.history.push('/project/'+jobIndex+'/general');
    }

    render(){
        const that= this;
        debugger;
        const displayPosition= that.props.listOfPositions.positions.map((item, index) => {
            return (
                <div>
                    <PositionListItem key={index} onClick={this.getPositionDetails} position={item} jobIndex={index} />
                    <button type="button" className="btn-primary">Remove this position</button>
                </div>
            )
        });
        return(
            <div className="container">

                <div className="main-container">
                    <div className="left-container">
                        <div>
                            User Details :
                            <div>Name: {this.props.userInfo.userDetails.name}</div>
                            <div>Seniority: {this.props.userInfo.userDetails.seniorityLevel}</div>
                            <div> Skills: {this.props.userInfo.userDetails.Skills}</div>
                        </div>
                    </div>

                    <div className="right-container">
                        <div className="position-list">
                            <div>{(this.props.userInfo.userDetails.role) === "admin" ?  <button onClick={this.addPositions} type="button" className="btn btn-primary addposition">
                                Add position
                            </button> : ""}</div>
                            {displayPosition}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardComponent;