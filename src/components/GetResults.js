const PHONE_API_KEY = process.env.REACT_APP_PHONE_KEY;
const URLSCAN_API_KEY = process.env.REACT_APP_URLSCAN_KEY;
// this fixes cors errors
const FIX_CORS = 'https://fix-cors-problems.herokuapp.com/';

// TODO: in the website detector say that they can go to the guru detector to see if a website is a get rich quick scheme website

// used to get the results on the tools page
export const getResult = async (id) => {
    // TODO: maybe reset the results section when the button is click, so the user knows that the results will be for the new input!!!
    const input = document.querySelector("#input").value;

    // for the button to load!
    // let button = document.querySelector("#button-section");
    // let buttonBefore = button.innerHTML;
    // button.innerHTML = `<button class="btn button-tools" type="button" disabled>
    // <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    // <span> Loading...</span>
    // </button>`;
    let resultsSection = document.querySelector('#results');
    // if there is no input, show an error message.
    if (input === ""){
        // scroll to the top, if there is an error
        window.scrollTo(0, 0,);
        resultsSection.innerHTML = `<div class="alert alert-danger">
        <h1>Error: No input</h1>
        <p>Please enter valid information into the input field below.</p>
        </div>`;
        return;
    }

    // shows that the results are loading TODO: work on making this look better (see bootstrap spinners for help)
    // FIXME: is this good when it is centered aligned or should i do something else? should I use a different loading spinner?
    resultsSection.innerHTML = `<div class="text-center"> 
    <div class="spinner-border tool-spinner" role="status">
     <span class="visually-hidden">Loading...</span>
    </div></div>`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({input: input})
    }
    // TODO: Change the backend link based on the id that is put into here!
    let getAPI ="";
    if(id===0){
        // email
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/email-detector', options);
        const results = await getAPI.json();
        // TODO: BETTER DESCRIPTIONS FOR SHORT EMAILS THAT ARENT IDENTIFIED AS SCAMS!
        displayResults(results, id);    
    } else if(id===1){
        // website
        // TODO: try https://www.virustotal.com/  or https://urlscan.io/ OR ANOTHER THING FROM https://zeltser.com/lookup-malicious-websites/
        const websiteOptions = {
            method: 'POST',
            url: 'https://urlscan.io/api/v1/scan/',
            // mode: 'no-cors',
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json',
                'API-Key': URLSCAN_API_KEY
            },
            body: JSON.stringify({"url": input, "visibility": "public"})
        }
        console.log(websiteOptions);
        // getAPI = await fetch('https://urlscan.io/api/v1/scan/', websiteOptions);
        // const results = await getAPI.json();
        // console.log(results);
        // note this does not work in local host!
        fetch(FIX_CORS+'https://urlscan.io/api/v1/scan/', websiteOptions)
        .then(response => response.json())
        .then(response =>  {
            console.log(response);
            console.log("results = " + response.api);
            const resultsURL = 'urlscan.io/api/v1/result/'+response.uuid;
            const resultOptions = {
                method: 'GET',
                url: response.api,
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': URLSCAN_API_KEY
                }
            };
            fetch(FIX_CORS+resultsURL, resultOptions)
            .then(results => results.json())
            .then(results => console.log(results));
        })
        .catch(err => console.error(err));
    } else if(id===2){ 
        // phone
        const phoneOptions = {
            method: 'POST',
        }
        // TODO: undo this when done testing!!!
        getAPI = await fetch('http://apilayer.net/api/validate?access_key='+PHONE_API_KEY+'&number='+input , phoneOptions)
        const results = await getAPI.json();
        // for testing
        // const results = {
        //     "valid": true,
        //     "line_type": "mobile",
        //     "carrier": "t-mobile"
        // }
        displayResults(results, id);
    } else if(id===3){
        // guru
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/guru-detector', options); 
        const results = await getAPI.json();
        displayResults(results, id);  
    } else if(id===4){
        // mlm detector
        // TODO: change this
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/guru-detector', options); 
        const results = await getAPI.json();
        displayResults(results, id);  
    }

};

function displayResults(results, id){
    // TODO: maybe use an icon with these
    // &#9888 = warning icon!
    let resultsSection = document.querySelector('#results');
    // TODO: https://getbootstrap.com/docs/5.0/components/alerts/ LOOK AT ALERT COMPONENTS FOR MORE STYLING IDEAS!!!
    // use icons!!! (maybe use svgs!!!)
    // scroll to the top, before getting results
    window.scrollTo(0, 0,);
    switch(id){
        case 3:
            return guruResults(results, resultsSection);
        case 2:
            return phoneResults(results, resultsSection);
        case 1:
            resultsSection.innerHTML = `<div class="alert alert-warning">
            <h2>Possible scam detected</h2>
            </div>`;
            return;
        default:
            return emailResults(results, resultsSection);
    }
}


function emailResults(results, resultsSection){
    const rating = results.rating;
    const isShort = results.isShort;
    switch(rating){
        case 3:
            resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
            <h1>Scam detected!</h1>
            <p>This email is definitely a scam</p>
            </div>`;
            return;
        case 2:
            resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
            <h1>Scam detected!</h1>
            </div>`;
            return;
         // TODO: implement the use short if the rating is 0 or 1!!!
        case 1:
            if(!isShort){
            resultsSection.innerHTML = `<div class="alert alert-warning" role="alert">
            <h2>Possible scam detected</h2>
            </div>`;
            return;
        } else{
            resultsSection.innerHTML = `<div class="alert alert-warning" role="alert">
            <h2>Possible scam detected</h2>
            <p>This is email is short ... (put something about short emails here)</p>
            </div>`;
            return;
        }
        // TODO: implement the use short if the rating is 0 or 1!!!
        default:
            if(!isShort){
            resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
            <h2>No scam detected</h2>
            </div>`;
            } else{
            resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
            <h2>No scam detected</h2>
            <p>This is email is short ... (put something about short emails here)</p>
            </div>`;
            }
    }
}

// TODO: NEED TO ADD MORE GURUS / SITES TO THE DATABASE
function guruResults(results, resultsSection){
    const matchFound = results.matchFound;
    const websiteMatch = results.websiteMatch;
    const guruMatch = results.guruMatch;
    if (!matchFound || (websiteMatch == null && guruMatch == null)){
        resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
        <h2>No known fake guru or fake guru related website detected</h2>
        </div>`;
        return;
    } else if(guruMatch != null){
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>Fake guru detected!</h2>
        <p><b>${guruMatch}</b> is a known fake guru.</p>
        </div>`;
    } else {     
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>Get rich quick scheme website detected!</h2>
        <p><b>${websiteMatch}</b> is a get rich quick scheme website.</p>
        </div>`;
    }
}

// TODO:
// TODO: 
// TODO:
// TODO:
// TODO: MAKE IT SO THAT IT AUTO FORMATS THE PHONE NUMBER OR CHECKS IT SO THEY CAN'T UNPUT IT WRONG
function phoneResults(results, resultsSection){
    console.log(results);   
    if (results.success === false){
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>Error with phone detector!</h2>
        </div>`;        
    }
    if(results.valid === false){
        // TODO: put some instructions here!
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>Invalid number!</h2>
        </div>`;
        return;
    }
    const carrier = results.carrier;
    const lineType = results.line_type;
    if (lineType === 'landline' || lineType === 'toll_free' || carrier === ''){
        resultsSection.innerHTML = 
        `<div class="alert alert-warning" role="alert">
        <h2>Possible scam detected</h2>
        <p>Please fill out this form with additional information to help determine if this phone number is a scam or not:</p>
        <div class="phone-form">        
        <p>Did this phone number appear as "scam likely" in your phone?</p>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="scam_likely" id="scam_likely_yes"  value="yes"/>
            <label class="form-check-label" for="scam_likely_yes">Yes</label>
            </div>
            <div class="form-check">
            <input  class="form-check-input" type="radio" name="scam_likely" id="scam_likely_no"  value="no"/>
            <label class="form-check-label" for="scam_likely_no">No</label>
            </div>

            <section class="question-2 hidden">
            <br />
            <p>Was this an unsolicited call from an unknown number?</p>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="unsolicited" id="unsolicited_yes"  value="yes"/>
            <label class="form-check-label" for="unsolicited_yes">Yes</label>
            </div>
            <div class="form-check">
            <input  class="form-check-input" type="radio" name="unsolicited" id="unsolicited_no" value="no"/>
            <label class="form-check-label" for="unsolicited_no">No</label>
            </div>
            </section>

            <section class="question-3 hidden">
            <br />
            <p>Was this number found from a popup or email claiming you have a virus or claiming you won something?</p>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="popup" id="popup_yes"  value="yes"/>
            <label class="form-check-label" for="popup_yes">Yes</label>
            </div>
            <div class="form-check">
            <input  class="form-check-input" type="radio" name="popup" id="popup_no" value="no"/>
            <label class="form-check-label" for="popup_no">No</label>
            </div>
            </section>

            <section class="question-4 hidden">
            <br />
            <p>Did this number ask for money or make threats in any manner?</p>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="moneyThreat" id="moneyThreat_yes"  value="yes"/>
            <label class="form-check-label" for="moneyThreat_yes">Yes</label>
            </div>
            <div class="form-check">
            <input  class="form-check-input" type="radio" name="moneyThreat" id="moneyThreat_no" value="no"/>
            <label class="form-check-label" for="moneyThreat_no">No</label>
            </div>
            </section>
            </div>
        </div>`;
        
        // adds an event listener to each radio button
        document
        .querySelector(".phone-form")
        .addEventListener("change", function (e) {
          // eslint-disable-next-line eqeqeq
          if (e.target.classList == "form-check-input") {
            showNextPhoneForm(e.target.id, e.target.value, resultsSection);
          }
        });


    } else {
        // include more info about scams here!
        // TODO: format this better!!!
        resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
        <h2>No scam detected</h2>
        <p>Note that even though no scam was detected, this phone number could still be a scam. These are a few signs to look out for to determine if a phone call is a scam:
        <ul>
        <li>If a number shows up as "scam likely" in your phone.</li>
        <li>If someone asks for payment over the phone especially through giftcards, wire transfer, bitcoin, prepaid debit card, private courier, or similar method.</li>
        <li>If an unkown caller attemts to scare or threaten you.</li>
        </ul>
        <p>If any of these are true, it is a scam.</p>
        </div>`;
    }
}

// this function helps with the phone form!!!
function showNextPhoneForm(id, value, resultsSection){
    // console.log(id);
    if(value === 'yes'){
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>Scam likely!</h2>
        <p>It is likely that this phone number is a scam!</p>
        </div>`;
        window.scrollTo(0, 0,);
        return;
    } else if(id === 'scam_likely_no'){
        document.querySelector('.question-2').classList.remove('hidden');
        return;
    } else if(id === 'unsolicited_no'){
        document.querySelector('.question-3').classList.remove('hidden');
        return;
    } else if(id === 'popup_no'){
        document.querySelector('.question-4').classList.remove('hidden');
        return;
    }
    if(id === 'moneyThreat_no'){
        // make this the exact same as the other no scam found!!!
        // include more info about scams here!
        // TODO: format this better!!!
        resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
        <h2>No scam detected</h2>
        <p>Note that even though no scam was detected, this phone number could still be a scam. These are a few signs to look out for to determine if a phone call is a scam:
        <ul>
        <li>If a number shows up as "scam likely" in your phone.</li>
        <li>If someone asks for payment over the phone especially through giftcards, wire transfer, bitcoin, prepaid debit card, private courier, or similar method.</li>
        <li>If an unkown caller attemts to scare or threaten you.</li>
        </ul>
        <p>If any of these are true, it is a scam.</p>
        </div>`;
        window.scrollTo(0, 0,);
    }
}


// old phone not scam text:
// eslint-disable-next-line no-lone-blocks
{/* <div class="alert alert-success" role="alert">
        <h2>No scam detected</h2>
        <p><b>Note: </b> if this number shows up as "scam likely" in your phone, it probably is a scam. Also note if anyone asks for payment over the phone especially through giftcards, wire transfer, bitcoin, prepaid debit card, private courier, or similar method, it is a scam. Also be advised of any unkown caller attemting to scare or threaten you, it is most likely a scam.</p>
        </div>` */}