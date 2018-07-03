import React from 'react';
export default function(){

    function logout (){
        sessionStorage.clear();
    }
    return(
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#"><img src="https://www.globant.com/themes/custom/globant_corp_theme/logo.svg"/></a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right ">
                        <li><a href="#" onClick = {logout}><span className="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}