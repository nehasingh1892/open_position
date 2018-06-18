import { SubmissionError } from 'redux-form';
import axios from 'axios';
import {bake_cookie} from "sfcookies";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {

        // simulate server latency
        debugger;


        return fetch('http://10.221.6.36:3000/users/login',
            {
                method: 'post',
                headers:{'Content-Type': 'application/json'},
                userid: values1.email,
                password : values1.password
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
            .catch(error => {console.log(error);});

}

export default submit