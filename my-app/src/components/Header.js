import React from 'react';
export default function(){
    return(
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#"><img src="https://www.globant.com/themes/custom/globant_corp_theme/logo.svg"/></a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a href="#">Link1</a></li>
                        <li><a href="#">Link2</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}