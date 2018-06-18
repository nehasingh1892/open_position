import React from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';
import  axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import getAllUserDetails1 from "../Sagas/TestSaga/testAction";
import getAllOpenPositions from '../Actions/PositionListActions';
import Header from './Header';
import './testPOCimg.jpg';
import UserDetails from './UserDetails';

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
        /*const positions= read_cookie('DataFromJson');
        const users = read_cookie('userDataFromJson')

        if(positions.length!=0 && positions.length!=null){
            that.props.dispatchAllOpenPositions(positions.positions);
            that.props.dispatchUserDetails(users.userDetails);
            return null;
        }
*/
        const userDetails = sessionStorage.getItem("LoginUser");
        const userDetailsJson = JSON.parse(userDetails);

                //localStorage.setItem('DataFromJson',JSON.stringify(json));

        axios.post(' http://10.221.6.36:3000/users/login', {

            userid: userDetailsJson[0].userid,
           })
            .then(function (response) {
                console.log(response);
               /* that.props.dispatchUserDetails(userDetailsJson);

                bake_cookie('UserDataFromJson', userDetailsJson);*/
            })
            .catch(function (error) {

            });
        fetch("http://10.221.6.36:3000/users/allpositions")
            .then(response => response.json())
            .then(json => {
                that.props.dispatchAllOpenPositions(json);
                bake_cookie('DataFromJson', json);
                //localStorage.setItem('DataFromJson',JSON.stringify(json));
            })
            .catch(error => {console.log(error);});
    }

    getDataFromCookies = () => {
        const positions= read_cookie('DataFromJson');
        this.props.dispatchAllOpenPositions(positions.positions);
        // const users = read_cookie('DataFromJson')
        const users = read_cookie('UserDataFromJson');
        this.props.dispatchUserDetails(users.userDetails);
    }

    addPositions = () => {
        this.props.history.push('/add')
    }


    AppliedSuccess= () => {
        this.setState({ showResults: true });
            const that = this;
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
        const userFlag =  that.props.userInfo.userDetails.map((item, index) => {
                return (
                    <div>
                        <UserDetails key={index} users={item} jobIndex={index}/>
                    </div>
                )
            });
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
                              {userFlag}

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