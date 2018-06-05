import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from "../containers/DashboardContainer";
import ViewPositionDetails from '../components/ViewPositionDetails';
import AddPosition from '../components/AdminAddPosition'

export default function() {
    return(
        <Switch>
            <Route exact path='/project' component={DashboardContainer}/>
            <Route path='/project/:jobIndex/general' component={ViewPositionDetails}/>
            <Route path='/project/:jobIndex/update' component={AddPosition}/>
        </Switch>
    );
}

