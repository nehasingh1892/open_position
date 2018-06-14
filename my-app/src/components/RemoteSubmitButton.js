import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const style = {
    padding: '10px 20px',
    width: 140,
    display: 'block',
    margin: '20px auto',
    fontSize: '16px'
}

const RemoteSubmitButton = ({ dispatch }) => (
    <button
        type="button" className="btn btn-lg btn-primary btn-block"
        style={style}
        onClick={() => dispatch(submit('remoteSubmit'))}
    >
        LOGIN
    </button>
)


export default connect()(RemoteSubmitButton)