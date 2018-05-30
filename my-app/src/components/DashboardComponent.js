import React,{Component} from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';
import axios from 'axios';
import getAllOpenPositions from '../Actions/PositionListActions'

class DashboardComponent extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const that=this;
        fetch("https://demo4532585.mockable.io/open_position_get")
            .then(res => res.json())
            .then(json => {
                that.props.dispatchAllOpenPositions(json.positions);
            })
            .catch(error => {console.log(error);});
    }

    render(){
        const that= this;
        const displayPosition= that.props.positions.map((item, index) => {
            return (
                <div>
                    <PositionListItem key={index} onClick={this.onClick} position={item} jobIndex={index} />
                    <button type="button" className="btn-primary">Remove this position</button>
                </div>
            )
        })
        return(
            <div className="container">

                <div className="main-container">
                    <div className="left-container">
                    <div className="user-details">user details here</div>
                    </div>

                    <div className="right-container">
                        <div className="position-list">
                            {displayPosition}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardComponent;