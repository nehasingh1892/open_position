import { connect } from 'react-redux'
import getAllOpenPositions from '../Actions/PositionListActions';
import getAllUserDetails from '../Actions/UserListActions';
import DashboardComponent from "../components/DashboardComponent";

const mapStateToProps = (state) => {
    return {
        listOfPositions:  state,
        userInfo : state
    }
}


const mapDispatchToProps = dispatch => {
   return {
        dispatchAllOpenPositions:(data)=>{
            dispatch(getAllOpenPositions(data));
        },
       dispatchUserDetails:(data)=>{
           dispatch(getAllUserDetails(data));
       }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent)

export default DashboardContainer
