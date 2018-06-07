import { connect } from 'react-redux'
import getAllOpenPositions from '../Actions/PositionListActions';
import getAllUserDetails from '../Actions/UserListActions';
import DashboardComponent from "../components/DashboardComponent";
import getAllUserDetails1 from "../Sagas/TestSaga/testAction";
import AddPositionForm from "../components/AdminAddPosition"

const mapStateToProps = (state) => {
    return {
        UpdatelistOfPositions:  state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchAllPosition:(data)=>{
            dispatch(getAllOpenPositions(data));
        }
    }
}




const AddPositionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPositionForm);

export default AddPositionContainer
