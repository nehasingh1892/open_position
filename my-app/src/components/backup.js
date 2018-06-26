import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {bake_cookie, read_cookie} from "sfcookies";
import axios from "axios/index";
import Header from '../components/Header'

class AdminAdd extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            formData:'',
            Selectedvalue:{
                seniorityLevel:'',
                title:'',
                OnshoreOffshore:'',
                seniorityLevel:''
            }
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    const TempValue = ' ';
        const checkPosition = (this.props.positions == " ") ;
        const initialValues = {
            project: !checkPosition ? this.props.positions.project : ' ',
            jobId : !checkPosition ? this.props.positions.jobId : '',
            location: !checkPosition ? this.props.positions.location : '',
            description : !checkPosition ? this.props.positions.description : TempValue,

            OnshoreOffshore : !checkPosition ? this.props.positions.OnshoreOffshore:'',
            title: !checkPosition ? this.props.positions.title :'',
            seniorityLevel: !checkPosition ? this.props.positions.seniorityLevel :'',
            positionDescription: !checkPosition ? this.props.positions.positionDescription: TempValue,
            skills: !checkPosition ? this.props.positions.skills: TempValue

        }
        this.setState({formData:initialValues,Selectedvalue:initialValues});
    }

    handleFieldChange = (event, NameDD) => {
        debugger;
        let name=''

        if(NameDD==="location" || NameDD==="title" || NameDD==="OnshoreOffshore" || NameDD==="seniorityLevel"){
             name = NameDD;
            if(this.props.positions == " "){
                let positions=this.state.formData;
                positions[name]=event.value;
                this.setState({formData:positions});
            }else{
                const positions= this.props.positions;
                positions[name] = event.value;
                this.setState({formData:positions});
            }
        }
        else{
            name = event.target.name;
            if(this.props.positions == " "){
                let positions=this.state.formData;
                positions[name]=event.target.value;
                this.setState({formData:positions});
            }else{
                const positions= this.props.positions;
                positions[name] = event.target.value;
                this.setState({formData:positions});
            }

        }






    }

    handleSubmit(){
        console.log('inside submit method');

        if(this.props.positions == " "){
            axios.post(' http://10.221.6.36:3000/users/addposition', {
                project : document.getElementById('projname').defaultValue,
                description : document.getElementById('projDesc').defaultValue,
                location : 'Pune',
                jobId  :  document.getElementById('JobId').defaultValue,
                title : 'UI developer',
                numberOfPositions : document.getElementById('numberOfPosition').defaultValue ,
                OnshoreOffshore : 'Offshore',
                skills : document.getElementById('skills').defaultValue ,
                positionid: '200',
                positionDescription : document.getElementById('positionDesc').defaultValue,
                seniorityLevel : 'Junior',

            })
                .then(function (response) {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch(function (error) {

                });
        }
else{
            axios.post(' http://10.221.6.36:3000/users/updateposition', {
                project : document.getElementById('projname').defaultValue,
                description : document.getElementById('projDesc').defaultValue,
                location : this.props.positions.location,
                jobId  :  document.getElementById('JobId').defaultValue,
                title : this.props.positions.title,
                numberOfPositions : document.getElementById('numberOfPosition').defaultValue ,
                OnshoreOffshore : this.props.positions.OnshoreOffshore,
                skills : document.getElementById('skills').defaultValue ,
                positionid: this.props.positions.positionid,
                positionDescription : document.getElementById('positionDesc').defaultValue,
                seniorityLevel : this.props.positions.seniorityLevel,

            })
                .then(function (response) {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch(function (error) {

                });
        }




    }

    required = value => (value ? undefined : 'Required')


    renderFieldForText({input,
                           label,
                           type,
                           id,
                           defaultValue,
                           min,
                           placeholder,
                           className,rows,validate,
                           meta: { touched, error, warning }}) {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} label={label} validate={validate} type={type} id={id} min={min} value={defaultValue} />
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
                                placeholder,
                                meta: { touched, error, warning }
                            }) {


        return(
            <div>
                <label>{label}</label>
                <div>
            <textarea {...input} className={className} rows={rows}  placeholder={placeholder} value={defaultValue} id={id} onChange={Change}>{touched &&
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
                                ChangeDD,
                                defaultValue,
                                meta: { touched, error, warning }
                            }) {
        return(
            <div>

                <label>{label}</label>
                <Dropdown {...input} options={options}  onChange={ChangeDD} value={defaultValue} placeholder={placeholder} />

            </div>
        )
    }

    render() {

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
        const TitleOptionsTest = [
            { value: 'DEV | Java', label: 'DEV | Java' },
            { value: 'UI | Java', label: 'UI  | Java' },

        ]
        const SeniorityOptions  = [
            { value: 'Senior', label: 'Senior' },
            { value: 'Semi Senior', label: 'Semi Senior', className: 'myOptionClassName' },
            { value: 'Junior', label: 'Junior', className: 'myOptionClassName' }
        ]

        debugger;
        const props = this.props.positions;
        console.log(props);
        return (
            <div>

                <div className="AddPositionform">
                    <div className="LoginWrapper AddPosition">
                        <div>
                            <div className="panel-body">
                                <h2>Add/Update Position</h2>
                                <div className="form-group">
                                    <Field id="projname" required validate={this.required} onChange={this.handleFieldChange}  className="form-control"  type="text" component={this.renderFieldForText} label="Project Name" name="project" defaultValue={this.state.formData.project} />
                                </div>
                                <div className="form-group">
                                    <Field Change={this.handleFieldChange} validate={this.required}  component={this.renderFieldForTextarea} id="projDesc" rows="4" className="form-control rounded-0"  label="Project Description" name="description" defaultValue={this.state.formData.description}  placeholder="Enter project description"/>
                                </div>

                                <div className="form-group">
                                    <Field ChangeDD={(e) => (this.handleFieldChange(e,'title'))} validate={this.required} className="form-control" name="title" label="Title" component={this.renderFieldForDropdown} options={TitleOptionsTest} defaultValue={this.state.formData.title} onChange={this.handleFieldChange}/>
                                </div>
                                <div className="form-group">
                                    <Field ChangeDD={(e) => (this.handleFieldChange(e,'OnshoreOffshore'))} validate={this.required} options={SiteOptions}  placeholder="Select an option" component={this.renderFieldForDropdown}  id="Site" label="Onshore/Offshore" name="OnshoreOffshore" defaultValue={this.state.formData.OnshoreOffshore}/>
                                </div>
                                <div className="form-group">

                                    <Field ChangeDD={(e) => (this.handleFieldChange(e,'seniorityLevel'))} validate={this.required} options={SeniorityOptions} id="Seniority"  placeholder="Select an option" name="seniorityLevel" component={this.renderFieldForDropdown} name="seniorityLevel" label="Seniority" defaultValue={this.state.formData.seniorityLevel}/>
                                </div>

                                <div className="form-group">
                                    <Field ChangeDD={(e) => (this.handleFieldChange(e,'location'))} validate={this.required} options={LocationOptions}  placeholder="Select an option" name="location" component={this.renderFieldForDropdown}  id="Location" name="location" label="Location" defaultValue={this.state.formData.location}/>
                                </div>
                                <div className="form-group">
                                    <Field Change={this.handleFieldChange} validate={this.required} component={this.renderFieldForTextarea} rows="4" className="form-control rounded-0" name="skills" id="skills"  label="Skills Required" defaultValue={this.state.formData.skills}/>
                                </div>
                                <div className="form-group">
                                    <Field  id="numberOfPosition"  validate={this.required} onChange={this.handleFieldChange}  className="form-control" min="0" type="number" name="numberOfPositions" component={this.renderFieldForText} label="Number Of Positions" defaultValue={this.state.formData.numberOfPositions}/>
                                </div>
                                <div className="form-group">
                                    <Field  id="JobId"  validate={this.required} onChange={this.handleFieldChange}  className="form-control" min="0" type="number" name="jobId" component={this.renderFieldForText} label="Job ID" defaultValue={this.state.formData.jobId}/>
                                </div>
                                <div className="form-group">
                                    <Field  Change={this.handleFieldChange} validate={this.required} component={this.renderFieldForTextarea} id="positionDesc"  rows="4" className="form-control rounded-0" label="Project Description"  name="positionDescription"  defaultValue={this.state.formData.positionDescription}/>
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-primary" disabled={submitting} onClick={this.handleSubmit}>
                                        Submit
                                    </button>
                                    <button type="button" className="btn btn-default" onClick={this.props.cancelAddForm.bind(this)} >
                                        {/*onClick={this.props.cancelAddForm.bind(this)}*/}
                                        Cancel
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div></div>

            </div>
        );
    }




}

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    //validate, // <--- validation function given to redux-form
    // warn, // <--- warning function given to redux-form

})(AdminAdd)



