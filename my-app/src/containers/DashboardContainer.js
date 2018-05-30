import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import getAllOpenPositions from '../Actions/PositionListActions'
import DashboardComponent from "../components/DashboardComponent";

const mapStateToProps = (state) => {
    return {
        positions:  state
    }
}


const mapDispatchToProps = dispatch => {
   return {
        dispatchAllOpenPositions:(data)=>{
            dispatch(getAllOpenPositions(data));
        }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent)

export default DashboardContainer
