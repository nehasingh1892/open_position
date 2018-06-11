import React from 'react';
import PositionListItem from './PositionListItem';
import '../data.json';
import { Field, reduxForm } from 'redux-form';
import { bake_cookie, read_cookie } from 'sfcookies';
import Dropdown from 'react-dropdown';
import Header from './Header';


class AddPositionForm extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            formData:'',
            Selectedvalue:{
                seniorityLevel:'',
                title:'',
                OnshoreOffshore:'',
                seniorityLevel:''
            }
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

            OnshoreOffshore : !isNaN(jobindex) ? positions.positions[jobindex].OnshoreOffshore:'',
            title: !isNaN(jobindex) ? positions.positions[jobindex].title :'',
            seniorityLevel: !isNaN(jobindex) ? positions.positions[jobindex].seniorityLevel :'',
            positionDescription: !isNaN(jobindex) ? positions.positions[jobindex].positionDescription:'',
            skills: !isNaN(jobindex) ? positions.positions[jobindex].skills:''

        }
        this.setState({formData:initialValues,Selectedvalue:initialValues});
    }

    handleFieldChange = (event) => {
        debugger;
        const jobindex = parseInt(this.props.history.location.pathname[9]);
        const name = event.target.name;
        if(isNaN(jobindex)){
            let positions=this.state.formData;
            positions[name]=event.target.value;
            this.setState({formData:positions});
        }else{
            const positions= read_cookie('DataFromJson');
            positions.positions[jobindex][name] = event.target.value;
            this.setState({formData:positions.positions[jobindex]});
        }

        if(name==="location" || name==="title" || name==="OnshoreOffshore" || name==="seniorityLevel"){
            const Selectedvalue=this.state.Selectedvalue[name];
            this.setState({Selectedvalue: event.target.value})
        }

        //this.forceUpdate();
        //console.log(localStorage.getItem(positions))
    }

    renderFieldForText({input,
                           label,
                           type,
                           id,
                           defaultValue,
                           min,
                           placeholder,
                           className,rows,
                           meta: { touched, error, warning }}) {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} label={label} type={type} id={id} min={min} value={defaultValue} />
                    {touched &&
                    ((error && <span><br/>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                </div>
            </div>
        )
    }

    renderFieldForTextarea ({
                                input,
                                label,
                                id,
                                min,
                                className,rows,
                                defaultValue,
                                Change,
                                meta: { touched, error, warning }
                            }) {


        return(
            <div>
                <label>{label}</label>
                <div>
            <textarea {...input} className={className} rows={rows} value={defaultValue} id={id} onChange={Change}>{touched &&
            ((error && <span><br/>{error}</span>) ||
                (warning && <span>{warning}</span>))}</textarea>
                </div>
            </div>
        );

    }

    renderFieldForDropdown ({
                                input,
                                label,
                                id,
                                options,
                                placeholder,
                                onChange,
                                defaultValue,
                                meta: { touched, error, warning }
                            }) {
        return(
            <div>

                <label>{label}</label>
                <Dropdown {...input} options={options} onChange={onChange} value={defaultValue} placeholder={placeholder} />

            </div>
        )
    }




    handleSubmit =(event)=>{
        let positions = read_cookie('DataFromJson');
        const data=this.state.formData;
        const jobindex = parseInt(this.props.history.location.pathname[9]);
        if(isNaN(jobindex)){
            positions.positions.push(this.state.formData);
        }else{
            positions.positions[jobindex] = this.state.formData;
        }
        bake_cookie('DataFromJson', positions);
        this.props.history.push('/Dashboard');
    }

    validate = values => {
        const errors = {}

    }

    render(){

        const {  pristine, reset, submitting } = this.props;


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


        if(this.state.formData===""){
            return null;
        }
        return(
            <div className="AddPositionform">
                <Header />
                <div className="LoginWrapper AddPosition">
                    {/*<h1>{jobindexFrom}</h1>
                    <h1>{positions.positions[jobindex].project}</h1>*/}
                    <div className="panel panel-success">
                        <div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <h1>{this.props.history.location.pathname === '/add' ? 'Add Open Position Details' : 'Update Position details'}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <Field id="projname" onChange={this.handleFieldChange}  className="form-control"  type="text" component={this.renderFieldForText} label="Project Name" name="project" defaultValue={this.state.formData.project} />
                        </div>
                        <div className="form-group">
                            <Field Change={this.handleFieldChange} component={this.renderFieldForTextarea} id="projDesc" rows="4" className="form-control rounded-0"  label="Project Description" name="description" defaultValue={this.state.formData.description}/>
                        </div>

                        <div className="form-group">
                            <Field placeholder="Select an option" component={this.renderFieldForDropdown}  id="Title" label="Title" options={TitleOptions} onChange={this.handleFieldChange} name="title" defaultValue={this.state.Selectedvalue.title} />
                        </div>
                        <div className="form-group">
                            <Field options={SiteOptions} onChange={this.handleFieldChange} defaultValue={this.state.Selectedvalue.OnshoreOffshore} placeholder="Select an option" component={this.renderFieldForDropdown}  id="Site" label="Onshore/Offshore"/>
                        </div>
                        <div className="form-group">

                            <Field options={SeniorityOptions} id="seniority" onChange={this.handleFieldChange} defaultValue={this.state.Selectedvalue.seniorityLevel} placeholder="Select an option" name="seniorityLevel" component={this.renderFieldForDropdown} label="Seniority" />
                        </div>

                        <div className="form-group">
                            <Field options={LocationOptions} onChange={this.handleFieldChange} defaultValue={this.state.Selectedvalue.location} placeholder="Select an option" name="location" component={this.renderFieldForDropdown}  id="Location" label="Location"/>
                        </div>
                        <div className="form-group">
                            <Field Change={this.handleFieldChange}  defaultValue={this.state.formData.skills} component={this.renderFieldForTextarea} rows="4" className="form-control rounded-0" name="skills" id="skills"  label="Skills Required" />
                        </div>
                        <div className="form-group">
                            <Field  id="JobId" onChange={this.handleFieldChange}  defaultValue={this.state.formData.jobId} className="form-control" min="0" type="number" name="jobId" component={this.renderFieldForText} label="Job ID"/>
                        </div>
                        <div className="form-group">
                            <Field Change={this.handleFieldChange} component={this.renderFieldForTextarea} id="positionDesc"  rows="4" className="form-control rounded-0" label="Project Description"  name="positionDescription"  defaultValue={this.state.formData.positionDescription} />
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