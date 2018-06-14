import { SubmissionError } from 'redux-form';
import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    return sleep(1000).then(() => {
        // simulate server latency
        debugger;
        /*axios.get("https://demo0893423.mockable.io/userDetails")
            .then(res => {
                console.log(res.data.userDetails);

                res.data.userDetails.map(function(item, index) {
                    const userList = res.data.userDetails[index].userID;
                    if (userList == values.email) {
                        window.location.assign('#/Dashboard/'+index);
                    }


                });


            })
            .catch(error => {console.log(error);});*/

        var headers = {
            'Content-Type': 'application/json',
    }
        const URL=    'http://10.221.6.36:3000/users';


            axios.post(URL, headers, {
                userid: 'john@globant.com',
                password : 'globant'

            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    // resultElement.innerHTML = generateErrorHTMLOutput(error);
                });



    })
}

export default submit