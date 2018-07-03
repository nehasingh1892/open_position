import React from 'react';
import { RingLoader } from 'react-spinners';

var axios = require('axios');
class App extends React.Component {


    constructor(props){
        super(props);
        this.servicecall = this.servicecall.bind(this);
        this.state =
            {
                username :"",
                pass:"",
                loading: false
            }
        this.getUser = this.getUser.bind(this);
        this.getPass = this.getPass.bind(this);
    }
    getUser = function(e){
        this.setState({username:e.target.value})
    }
    getPass = function(e){
        this.setState({pass:e.target.value})
    }
    servicecall = function(){

        this.setState({loading: true});
        axios.post(' http://10.221.6.36:3000/users/login', {

            userid: this.state.username,
            password:this.state.pass
        })
            .then(function (response) {
                console.log(response);
                window.location.assign('#/Dashboard');
                sessionStorage.setItem( "LoginUser", JSON.stringify(response.data));
            })
            .catch(function (error) {

            });

    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title">Login Detail</h1>
                        <div className="account-wall">
                            <img className="profile-img"
                                 src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                 alt="" />
                            <form className="form-signin">
                                <div>
                                    <label>Username</label>
                                    <div>
                                        <input type= "text" onChange = {this.getUser}/>
                                    </div>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <div>
                                        <input type= "password" onChange = {this.getPass}/>
                                    </div>
                                </div>
                                <div>
                                    <button onClick  = {this.servicecall}>Login</button>
                                </div>
                                <RingLoader
                                    color={'#123abc'}
                                    loading={this.state.loading}
                                />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
