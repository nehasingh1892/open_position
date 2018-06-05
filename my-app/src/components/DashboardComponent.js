import React from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';
import { bake_cookie, read_cookie } from 'sfcookies';
import getAllUserDetails1 from "../Sagas/TestSaga/testAction";
import getAllOpenPositions from '../Actions/PositionListActions';


class DashboardComponent extends React.Component{

    constructor(props){
        super(props);
        this.addPositions = this.addPositions.bind(this);
        this.getPositionDetails = this.getPositionDetails.bind(this);
        this.deleteThisTask = this.deleteThisTask.bind(this);
    }

    componentDidMount(){
        const that=this;
        const positions= read_cookie('DataFromJson');
        if(positions.length!=0){
            that.props.dispatchAllOpenPositions(positions.positions);
            that.props.dispatchUserDetails(positions.userDetails);
            return null;
        }
        fetch("http://demo4532585.mockable.io/openposition_get")
            .then(res => res.json())
            .then(json => {
                that.props.dispatchAllOpenPositions(json.positions);
                that.props.dispatchUserDetails(json.userDetails);
                bake_cookie('DataFromJson', json);
                //localStorage.setItem('DataFromJson',JSON.stringify(json));
            })
            .catch(error => {console.log(error);});

    }

    addPositions = () => {
        this.props.history.push('/add')
    }

    deleteThisTask(itemtobedeleted) {

        const newItem2 =
            this.props.listOfPositions.positions.filter((item) => {
                return item != itemtobedeleted
            })

        newItem2;
        this.setState({
            positions: newItem2,
        })
    }

    updateOpenPosition(e,jobIndex){
        e.stopPropagation();
        window.location.assign("/update/"+jobIndex);

    }

    getPositionDetails(event,jobIndex,operationToBePerformed){
        // debugger;
        event.stopPropagation();
        operationToBePerformed!='general' ? this.props.history.push('/project/'+jobIndex+'/'+operationToBePerformed) : this.props.history.push('/project/'+jobIndex+'/general');
    }

    render(){
        const that= this;
        debugger;
        const displayPosition= that.props.listOfPositions.positions.map((item, index) => {
            return (
                <div>
                    <PositionListItem key={index} onClick={this.getPositionDetails} position={item} jobIndex={index} updatePosition={this.updateOpenPosition}/>
                    {/*<button type="button" className="btn-primary"  onClick={this.deleteThisTask.bind(this, item)}>Remove this position</button>*/}
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