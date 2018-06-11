import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'
import RemoteSubmitButton from './RemoteSubmitButton'

const renderField = ({ input, label, type, meta: { touched, error, required } }) => (
    <div className={'mar5Per'}>
        <div className={'pull-left'}><label>{label}</label></div>
        <div>
            <input {...input} placeholder={label} type={type} required={required}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const RemoteSubmitForm = props => {
    const { error, handleSubmit } = props
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                    <h1 className="text-center login-title">Login Detail</h1>
                    <div className="account-wall text-center">
                        <img alt="glober" className="img-circle LoginImg"
                             src="https://ssl.gstatic.com/s2/profiles/images/silhouette200.png" />
                            <form onSubmit={handleSubmit} className="form-signin">
                                <Field
                                    name="username"
                                    type="text"
                                    component={renderField} required
                                    label="Username"
                                />
                                <Field
                                    name="password"
                                    type="password"
                                    component={renderField} required
                                    label="Password"
                                />

                                <div>
                                    <RemoteSubmitButton/>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({
    form: 'remoteSubmit', // a unique identifier for this form
    onSubmit: submit // submit function must be passed to onSubmit
})(RemoteSubmitForm)

