import React from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';
import { Field, reduxForm } from 'redux-form';
import { bake_cookie, read_cookie } from 'sfcookies';
import Dropdown from 'react-dropdown';


class AddPositionForm extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            formData:''
        }
    }

    componentDidMount(){
        const positions= read_cookie('DataFromJson');
        const jobindexFrom = this.props.history.location.pathname[9];
        const jobindex = parseInt(jobindexFrom);
        const initialValues = {
            project: !isNaN(jobindex) ? positions.positions[jobindex].project : '',
            jobId :!isNaN(jobindex) ? positions.positions[jobindex].jobId : '',
            location:!isNaN(jobindex) ? positions.positions[jobindex].location : '',
            description : !isNaN(jobindex) ? positions.positions[jobindex].description : '',
            openPosition:{
                OnshoreOffshore : !isNaN(jobindex) ? positions.positions[jobindex].openPosition.OnshoreOffshore:'',
                title: !isNaN(jobindex) ? positions.positions[jobindex].openPosition.title :'',
                seniorityLevel: !isNaN(jobindex) ? positions.positions[jobindex].openPosition.seniorityLevel :'',
                positionDescription: !isNaN(jobindex) ? positions.positions[jobindex].openPosition.positionDescription:'',
                skills: !isNaN(jobindex) ? positions.positions[jobindex].openPosition.skills:''
            }
        }
        this.setState({formData:initialValues});
    }

    handleFieldChange = (event) => {
        debugger;
        const positions= read_cookie('DataFromJson');
        const jobindex = !isNaN(jobindex) ? parseInt(this.props.history.location.pathname[9]) : '';
        const name = event.target.name;
        positions.positions[jobindex][name] = event.target.value;
        bake_cookie('DataFromJson', positions);
        this.setState({formData:positions.positions[jobindex]});
        //this.forceUpdate();
        //console.log(localStorage.getItem(positions))
    }



    handleSubmit =(event)=>{
        this.props.history.push('/Dashboard');
    }

    validate = values => {
        const errors = {}
        if (!values.password) {
            errors.password = 'Required'
        } else if (!/(?=.*[0-9])/i.test(values.password)) {
            errors.password = 'Password must contain at least 1 numeric character'
        }
        return errors
    }

    render(){

        const {  pristine, reset, submitting } = this.props;
        const renderFieldForDropdown = ({
                                            input,
                                            label,
                                            id,
                                            options,
                                            placeholder,
                                            onChange,
                                            defaultValue,
                                            meta: { touched, error, warning }
                                        }) => (
            <div>

                <label>{label}</label>
                <Dropdown {...input} options={options} onChange={onChange} value={defaultValue} placeholder={placeholder} />

            </div>
        );

        const renderFieldForText = ({
                                        input,
                                        label,
                                        type,
                                        id,
                                        defaultValue,
                                        min,
                                        placeholder,
                                        className,rows,
                                        meta: { touched, error, warning }
                                    }) => (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} label={label} type={type} id={id} min={min} value={defaultValue} />
                    {touched &&
                    ((error && <span><br/>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                </div>
            </div>
        );

        const warn = values => {
            const warnings = {}
            if (values.age < 19) {
                warnings.age = 'Hmm, you seem a bit young...'
            }
            return warnings
        };
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
            <textarea {...input} className={className} rows={rows} value={defaultValue} id={id}>{touched &&
            ((error && <span><br/>{error}</span>) ||
                (warning && <span>{warning}</span>))}</textarea>
                </div>
            </div>
        );
        if(this.state.formData===""){
            return null;
        }
        return(
            <div>
                <div className="LoginWrapper AddPosition">
                    {/*<h1>{jobindexFrom}</h1>
                    <h1>{positions.positions[jobindex].project}</h1>*/}
                    <h1>{this.props.history.location.pathname === '/add' ? 'Add Open Position Details' : 'Update Position details'}</h1>
                    <div className="form-group">
                        <Field id="projname" onChange={this.handleFieldChange}  className="form-control"  type="text" component={renderFieldForText} label="Project Name" name="project" defaultValue={this.state.formData.project} />
                    </div>
                    <div className="form-group">
                        <Field component={renderFieldForTextarea} onChange={this.handleFieldChange} id="projDesc" rows="4" className="form-control rounded-0"  label="Project Description" name="description" defaultValue={this.state.formData.description}/>
                    </div>

                    <div className="form-group">
                        <Field placeholder="Select an option" component={renderFieldForDropdown}  id="Title" label="Title" options={TitleOptions} onChange={this._onSelect} name="openPosition.title" defaultValue={this.state.formData.openPosition.title} />
                    </div>
                    <div className="form-group">
                        <Field options={SiteOptions} onChange={this._onSelect} defaultValue={this.state.formData.openPosition.OnshoreOffshore} placeholder="Select an option" component={renderFieldForDropdown}  id="Site" label="Onshore/Offshore"/>
                    </div>
                    <div className="form-group">

                        <Field options={SeniorityOptions} id="seniority" onChange={this._onSelect} defaultValue={this.state.formData.openPosition.seniorityLevel} placeholder="Select an option" name="openPosition.seniorityLevel" component={renderFieldForDropdown} label="Seniority" />
                    </div>

                    <div className="form-group">
                        <Field options={LocationOptions} onChange={this._onSelect} defaultValue={this.state.formData.location} placeholder="Select an option" name="location" component={renderFieldForDropdown}  id="Location" label="Location"/>
                    </div>
                    <div className="form-group">
                        <Field name="Skills Required" onChange={this.handleFieldChange} defaultValue={this.state.formData.openPosition.skills} component={renderFieldForTextarea} rows="4" className="form-control rounded-0" name="openPosition.skills" id="skills"  label="Skills Required" />
                    </div>
                    <div className="form-group">
                        <Field name="Job ID" id="JobId" onChange={this.handleFieldChange} defaultValue={this.state.formData.jobId} className="form-control" min="0" type="number" name="jobId" component={renderFieldForText} label="Job ID"/>
                    </div>
                    <div className="form-group">
                        <Field id="projDesc" onChange={this.handleFieldChange} defaultValue={this.state.formData.openPosition.positionDescription} component={renderFieldForTextarea} name="openPosition.positionDescription" rows="4" className="form-control rounded-0"  label="Project Description" />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-default" disabled={submitting} onClick={this.handleSubmit}>
                            Submit
                        </button>
                        <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
   // validate, // <--- validation function given to redux-form
   // warn, // <--- warning function given to redux-form

})(AddPositionForm)
//export default AddPositionForm;