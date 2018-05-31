import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
/*
import { SubmissionError } from 'redux-form'
*/
import axios from 'axios';
const SiteOptions = [
    {value: 'Offshore', label: 'Offshore' },{value: 'Onshore', label: 'Onshore' }
]
const LocationOptions = [
    { value: 'Pune (India)', label: 'Pune (India)' },
    { value: 'Argentina - Buenos Aires', label: 'Argentina - Buenos Aires', className: 'myOptionClassName' },
    { value: 'Argentina - Mar del Plata', label: 'Argentina - Mar del Plata', className: 'myOptionClassName' },
    { value: 'Argentina - Cordoba', label: 'Argentina - Cordoba' },
    { value: 'Columbia', label: 'Columbia' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Bangalore (India)', label: 'Bangalore (India)' },
    { value: 'Anywhere', label: 'Anywhere' },

]
const TitleOptions = [
    { value: 'DEV | Java', label: 'DEV | Java' },
    { value: 'DEV | Web UI', label: 'DEV | Web UI', className: 'myOptionClassName' },
    { value: 'Dev | Android Developer', label: 'Dev | Android Developer', className: 'myOptionClassName' },
    { value: 'Dev | iOS Developer', label: 'Dev | iOS Developer' },
    { value: 'DEV | Drupal', label: 'DEV | Drupal' },
    { value: 'DEV | Others', label: 'DEV | Others' },
    { value: 'DEV | Technical Director (Mobile / CMS / DMS / Java / UI)', label: 'DEV | Technical Director (Mobile / CMS / DMS / Java / UI)', className: 'myOptionClassName' },
    { value: 'Dev | Gaming', label: 'Dev | Gaming', className: 'myOptionClassName' },
    { value: 'QA | QC Analyst', label: 'QA | QC Analyst' },
    { value: 'DEV | AEM', label: 'DEV | AEM' },
    { value: 'DEV | PHP', label: 'DEV | PHP' },
    { value: 'DEV | SalesForce', label: 'DEV | SalesForce' },
    { value: 'DEV | Netsuite', label: 'DEV | Netsuite' },
    { value: 'QA | Test Automation Engineer', label: 'QA | Test Automation Engineer' },
    { value: 'CLOUDOPS | DevOps Engineer', label: 'CLOUDOPS | DevOps Engineer' },
    { value: 'CLOUDOPS | Technical Director', label: 'CLOUDOPS | Technical Director' },
    { value: 'DESIGN | User Experience', label: 'DESIGN | User Experience' },
    { value: 'DESIGN | Visual Designer', label: 'DESIGN | Visual Designer' },
    { value: 'OPS | Project Manager', label: 'OPS | Project Manager' },
    { value: 'OPS | Business Analyst', label: 'OPS | Business Analyst' },
    { value: 'Sales | Client Partner', label: 'Sales | Client Partner' },
    { value: 'Digital Marketing Strategist', label: 'Digital Marketing Strategist' },
    { value: 'Others', label: 'Others' },
]
const SeniorityOptions  = [
    { value: 'Senior', label: 'Senior' },
    { value: 'Semi Senior', label: 'Semi Senior', className: 'myOptionClassName' },
    { value: 'Junior', label: 'Junior', className: 'myOptionClassName' }
]
const validate = values => {
    const errors = {}
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

const renderFieldForText = ({
                                input,
                                label,
                                type,
                                id,
                                min,
                                className,rows,
                                meta: { touched, error, warning }
                            }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} id={id} min={min}/>
            {touched &&
            ((error && <span><br/>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)



const renderFieldForTextarea = ({
                                    input,
                                    label,
                                    id,
                                    min,
                                    className,rows,
                                    defaultValue,
                                    meta: { touched, error, warning }
                                }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea {...input} className={className} rows={rows} id={id}>{touched &&
            ((error && <span><br/>{error}</span>) ||
                (warning && <span>{warning}</span>))}</textarea>
        </div>
    </div>
)
const renderFieldForDropdown = ({
                                    input,
                                    label,
                                    id,
                                    options,
                                    placeholder,
                                    onChange,
    value,
                                    meta: { touched, error, warning }
                                }) => (
    <div>

            <label>{label}</label>
            <Dropdown {...input} options={options} onChange={onChange} value={value} placeholder={placeholder} />

    </div>
)

const AddPositionForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    const defaultOption = LocationOptions[0];
    const defaultOption1 = TitleOptions[0];
    const defaultOption2 = SeniorityOptions[0];
    const defaultOption4 = SiteOptions[0];
   function postData(e){
       debugger;
       { axios({
            method: 'post',
            url: '/addUser',
            data: console
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });}
    }
    return (
        <div>
            <form className="LoginWrapper AddPosition" onSubmit={postData()}>
                <h1><b>Add Open Position Details</b></h1>
                <div className="form-group">
                    <Field name="Project Name" id="projname" className="form-control"  type="text" component={renderFieldForText} label="Project Name" />
                </div>
                <div className="form-group">
                    <Field name="Project ID" id="projId" className="form-control" min="0" type="number" component={renderFieldForText} label="Project ID"/>
                </div>
                <div className="form-group">
                    <Field name="Project Description" component={renderFieldForTextarea}  id="projDesc" rows="4" className="form-control rounded-0"  label="Project Description" />
                </div>

                <div className="form-group">
                    <Field placeholder="Select an option" component={renderFieldForDropdown}  id="Title" label="Title" options={TitleOptions} onChange={this._onSelect} value={defaultOption1} />
                </div>
                <div className="form-group">
                    <Field options={SiteOptions} onChange={this._onSelect} value={defaultOption4} placeholder="Select an option" component={renderFieldForDropdown}  id="Site" label="Onshore/Offshore"/>
                </div>
               <div className="form-group">

                    <Field options={SeniorityOptions} onChange={this._onSelect} value={defaultOption2} placeholder="Select an option" component={renderFieldForDropdown} label="Seniority" />
                </div>

                <div className="form-group">
                    <Field options={LocationOptions} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" component={renderFieldForDropdown}  id="Location" label="Location"/>
                </div>
                <div className="form-group">
                    <Field name="Skills Required" component={renderFieldForTextarea} rows="4" className="form-control rounded-0"  label="Skills Required" />
                </div>
                <div className="form-group">
                    <Field name="Job ID" id="projId" className="form-control" min="0" type="number" component={renderFieldForText} label="Job ID"/>
                </div>
                <div className="form-group">
                    <Field name="Position Description" component={renderFieldForTextarea} rows="4" className="form-control rounded-0"  label="Project Description" />
                </div>

                <div>
                    <button type="submit" className="btn btn-default" disabled={submitting}>
                        Submit
                    </button>
                    <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn, // <--- warning function given to redux-form
})(AddPositionForm)
