import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer';
import AddPositionContainer from './containers/AddPositionContainer';
import SyncValidationForm from './components/Login';
import ViewPositionContainer from './components/viewPositionContainer';
import backup from "./components/backup";


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path='/add' component={backup}/>
                        <Route path='/project/1/update' component={backup}/>
                        <Route path='/project' component={ViewPositionContainer}/>
                        <Route path='/Dashboard' render={({history}) => (<DashboardContainer history = {history}/>)}/>
                        <Route path='/' component={() => (<SyncValidationForm  />)}/>

                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
