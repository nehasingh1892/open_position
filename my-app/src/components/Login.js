import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {SubmissionError} from 'redux-form';
import '../css/MyApp.css'
const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (!/(?=.*[0-9])/i.test(values.password)) {
        errors.password = 'Password must contain at least 1 numeric character'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({
                         input,
                         label,
                         required,
                         type,
                         id,
                         meta: { touched, error, warning }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} required={required} type={type} id={id}/>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const SyncValidationForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <form action="#/Dashboard" className="LoginWrapper">
            <h1><b>Login Details</b></h1>
            <div className="form-group">
                <Field id="username" name="Username" required className="form-control"  type="text" component={renderField} label="Username" />
            </div>
            <div className="form-group">
                <Field id="password" name="password" required className="form-control" type="password" component={renderField} label="Password" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    Submit
                </button>
                <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
                    Clear
                </button><br/><br/><br/>

            </div>
        </form>
    )
}

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(SyncValidationForm)
