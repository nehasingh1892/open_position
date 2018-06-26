import { connect } from 'react-redux'
import getAllOpenPositions from '../Actions/PositionListActions';
import getAllUserDetails from '../Actions/UserListActions';
import DashboardComponent from "../components/DashboardComponent";
import getAllUserDetails1 from "../Sagas/TestSaga/testAction";
import AddPositionForm from "../components/AdminAddPosition"
import AdminAdd from "../components/AdminAdd";

const mapStateToProps = (state) => {
    return {
        positions:  state.positions
    }
}



const AddPositionContainer = connect(
    mapStateToProps)(AdminAdd);

export default AddPositionContainer
