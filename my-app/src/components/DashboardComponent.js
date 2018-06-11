import React from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import getAllUserDetails1 from "../Sagas/TestSaga/testAction";
import getAllOpenPositions from '../Actions/PositionListActions';
import Header from './Header';
import './testPOCimg.jpg';

class DashboardComponent extends React.Component{

    constructor(props){
        super(props);

        this.addPositions = this.addPositions.bind(this);
        this.getPositionDetails = this.getPositionDetails.bind(this);
        this.deletePosition = this.deletePosition.bind(this);
        this.AppliedSuccess = this.AppliedSuccess.bind(this);
        this.state=  { showResults: false };
    }

    componentDidMount(){
        const that=this;
        const positions= read_cookie('DataFromJson');

        if(positions.length!=0){
            that.props.dispatchAllOpenPositions(positions.positions);
            that.props.dispatchUserDetails(positions.userDetails);
            return null;
        }
        fetch("https://demo6250001.mockable.io/admin")
            .then(res => res.json())
            .then(json => {
                that.props.dispatchAllOpenPositions(json.positions);
                that.props.dispatchUserDetails(json.userDetails);
                bake_cookie('DataFromJson', json);
                //localStorage.setItem('DataFromJson',JSON.stringify(json));
            })
            .catch(error => {console.log(error);});

    }

    getDataFromCookies = () => {
        const positions= read_cookie('DataFromJson');
        this.props.dispatchAllOpenPositions(positions.positions);
        this.props.dispatchUserDetails(positions.userDetails);
    }

    addPositions = () => {
        this.props.history.push('/add')
    }


    AppliedSuccess= () => {
        this.setState({ showResults: true });
            const that = this;
           /* setTimeout(function() {
                        that.setState({ showResults: false })

                    }, 5000);*/
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


   /* deletePosition(event, JobID){
        event.stopPropagation();
       let positionListData = read_cookie('DataFromJson');
       let positionList = positionListData.positions;
        for (let i = 0; i < positionList.length; i++) {
            if (positionList[i].jobId == JobID) {
                positionList.splice(i,1);
            }
        }
        console.log("Positions after delete :: ", positionList);
        bake_cookie('DataFromJson', positionList);
        this.forceUpdate();


    }*/

    deletePosition(event, jobIndex) {
        event.stopPropagation();
        const positionListData = read_cookie('DataFromJson');
        positionListData.positions.splice(jobIndex, 1);
        bake_cookie('DataFromJson', positionListData);
        this.getDataFromCookies();
    }


    render(){
        const that= this;
        debugger;
        const userFlag =  that.props.userInfo.userDetails;
        const displayPosition= that.props.listOfPositions.positions.map((item, index) => {
            return (
                <div>
                    <PositionListItem key={index} onClick={this.getPositionDetails} position={item} jobIndex={index} deleteThisTask={this.deletePosition} updatePosition={this.updateOpenPosition} role={this.props.userInfo.userDetails.role}/>
                    <div>{(this.props.userInfo.userDetails.role) === "user" ?  <button type="button" className="btn btn-primary" id="apply" onClick={this.AppliedSuccess}>
                        Apply for this position
                    </button> : ""}</div>
                </div>
            )
        });
        return(
            <div className="container">
                <Header />
                <div className="main-container">
                    <div className="left-container">
                          <div className="card">
                                {/*<img src="testPOCimg.jpg" alt="John"/>*/}

                              <div className="glober-image">
                                  <img alt="glober" className="img-circle"
                                       src="https://ssl.gstatic.com/s2/profiles/images/silhouette200.png" />
                              </div>
                                    <h1>{this.props.userInfo.userDetails.name}</h1>
                                    <p className="title">{this.props.userInfo.userDetails.currentPosition}</p>
                              <p>Seniority Level : {this.props.userInfo.userDetails.seniorityLevel}</p>

                              <p>Skills: {this.props.userInfo.userDetails.Skills} </p>

                        </div>
                    </div>

                    <div className="right-container">
                        <div className="position-list">
                            <div>{(this.props.userInfo.userDetails.role) === "admin" ?  <button onClick={this.addPositions} type="button" className="btn btn-primary addposition">
                                Add position
                            </button> : ""}</div>
                            <div className="alert alert-success" className="Applied">
                                <strong id="Applied">Applied Successfully!</strong>
                            </div>
                            <div>{this.state.showResults ?  <div type="button" className="alert alert-success">
                                Applied Successfully!!
                            </div> : ""}</div>

                            {/* <div className="panel-footer">
                                <div className="row">
                                    <div className="col-xs-12">
                                        Applied Successfully!!
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>*/}
                            {displayPosition}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardComponent;