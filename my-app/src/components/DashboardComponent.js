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
import Backup from './backup'

class DashboardComponent extends React.Component{

    constructor(props){
        super(props);

        this.addPositions = this.addPositions.bind(this);
        this.getPositionDetails = this.getPositionDetails.bind(this);
        this.deletePosition = this.deletePosition.bind(this);
        // this.AppliedSuccess = this.AppliedSuccess.bind(this);
        this.updateOpenPosition = this.updateOpenPosition.bind(this);
        this.cancelAddForm = this.cancelAddForm.bind(this);
        this.ApplyUser = this.ApplyUser.bind(this);
        this.ShowAppliedUsers1 = this.ShowAppliedUsers1.bind(this);
        // this.getAppliedUsers = this.getAppliedUsers.bind(this);
        this.state=  { showResults: false,
            applyText: "Apply for this position",
            AddComponent:'hide',
            clickedPosition: ' ',
            AddUpdatebtn: ' ',
            AppliedUsers: ' '
        };
    }

    componentDidMount(){
        const that=this;
        const userDetails = sessionStorage.getItem("LoginUser");
        const userDetailsJson = JSON.parse(userDetails);

                //localStorage.setItem('DataFromJson',JSON.stringify(json));

        axios.post(' http://10.221.6.36:3000/users/userdetails', {
            userid: userDetailsJson[0].userid,
           })
            .then(function (response) {
                console.log(response.data[0]);
                const userJson = response.data[0];
                that.props.dispatchUserDetails(userJson);
                fetch("http://10.221.6.36:3000/users/allpositions")
                // fetch('https://demo0893423.mockable.io/openposition_get')
                    .then(response => response.json())
                    .then(json => {
                        that.props.dispatchAllOpenPositions(json);
                        bake_cookie('DataFromJson', json);
                        //localStorage.setItem('DataFromJson',JSON.stringify(json));
                    })
                    .catch(error => {console.log(error);});
            })
            .catch(function (error) {

            });



    }


    addPositions(){
        this.state.positions = "";
        this.setState(
            {
                AddComponent: 'show',
            });
    }



    updateOpenPosition(e, ClickedPosition){
        e.stopPropagation();
        this.setState(
            {
             AddComponent: 'show',
             clickedPosition : ClickedPosition,
                AddUpdatebtn: 'update'
            });
    }

    getPositionDetails(event, jobIndex){
         debugger;
        event.stopPropagation();
        this.props.history.push('/project/'+jobIndex) ;
     }

    deletePosition(event, PositionToBeDeleted) {
        event.stopPropagation();
        if (window.confirm("Are you sure, you want to delete this position?")) {
            axios.post(' http://10.221.6.36:3000/users/deleteposition', {
                positionid: PositionToBeDeleted.positionid,
            })
                .then(function (response) {
                    console.log(response.data);
                    alert('Position deleted successfully!');
                    window.location.reload()
                })
                .catch(function (error) {

                });
        } else {
        }

    }

    cancelAddForm(){
        this.setState(
            {
                AddComponent: 'hide'
            });
    }

    ApplyUser(e, positionID, UserID){

        axios.post(' http://10.221.6.36:3000/users/apply', {
            positionid: positionID,
            userid : UserID
        })
            .then(function (response) {
                console.log(response.data);
                alert(response.data);
                this.setState({applyText : 'Applied'});

            })
            .catch(function (error) {

            });

    }
    ShowAppliedUsers1(positionID){
        debugger;
        axios.post(' http://10.221.6.36:3000/users/getusersforposition', {
            positionid: positionID,
        })
            .then(function (response) {
                console.log(response.data);
                alert(JSON.stringify(response.data));



            })
            .catch(function (error) {

            });
    }


    render(){
        const that= this;

        const displayPosition= that.props.listOfPositions.positions.map((item, index) => {
            return (
                <div>
                    <PositionListItem key={index} onClick={this.getPositionDetails} position={item} users={this.props.userInfo.userDetails}  ApplyText={this.state.applyText} jobIndex={index} deleteThisTask={this.deletePosition} updatePosition={this.updateOpenPosition} ApplyUser={this.ApplyUser} role={this.props.userInfo.userDetails.role}/>
                    {this.props.userInfo.userDetails.role === "User" ?  " " : <div><button className="btn-primary" onClick={() => (this.ShowAppliedUsers1(item.positionid))}>Applied Users</button></div>}

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
                              <div className="usercard">
                              <h1>{this.props.userInfo.userDetails.name}</h1>
                              <p className="title">{this.props.userInfo.userDetails.current_position}</p>
                              <p>Seniority Level : {this.props.userInfo.userDetails.senioritylevel}</p>

                              <p>Skills: {this.props.userInfo.userDetails.skills} </p>
                              </div>

                        </div>
                    </div>


                    {this.state.AddComponent == 'show' ? <Backup positions={this.state.clickedPosition} cancelAddForm={this.cancelAddForm}/> :  <div className="right-container">
                        <div className="position-list">
                            <div>{(this.props.userInfo.userDetails.role) === "Admin" ?  <button onClick={this.addPositions} type="button" className="btn btn-primary addposition">
                                Add position
                            </button> : ""}</div>
                            <div>{this.state.showResults ?  <div type="button" className="alert alert-success">
                                Applied Successfully!!
                            </div> : ""}</div>


                            {displayPosition}

                        </div>
                    </div>}

                </div>


            </div>
        )
    }
}

export default DashboardComponent;