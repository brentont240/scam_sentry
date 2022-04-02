// need to put REACT_APP in front of the environment variables

const PHONE_API_KEY = process.env.REACT_APP_PHONE_KEY;
const FIX_API = process.env.REACT_APP_FIX_API;

// https://getbootstrap.com/docs/5.0/components/alerts/ for more alert icons!
const warning_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 icon-margin" viewBox="0 0 16 16" role="img" aria-label="Warning:">
<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>`;

const info_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="info-fill flex-shrink-0 me-2 icon-margin" viewBox="0 0 16 16" role="img" aria-label="Info:">
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>`;

// used to get the results on the tools page
export const getResult = async (id) => {
    // TODO: maybe reset the results section when the button is click, so the user knows that the results will be for the new input!!!
    const input = document.querySelector("#input").value;
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
        // show error if the input is less than 5 words
        if(countWords(input) < 5){
            window.scrollTo(0, 0,);
            resultsSection.innerHTML = `<div class="alert alert-danger">
            <h1>Error: Input too short</h1>
            <p>Please enter at least 5 words into the input field below.</p>
            </div>`;
            return;
        }
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/email-detector', options);
        const results = await getAPI.json();
        // TODO: BETTER DESCRIPTIONS FOR SHORT EMAILS THAT ARENT IDENTIFIED AS SCAMS!
        displayResults(results, id);    
    } else if(id===2){ 
        // phone
        if(!isValidPhone(input)){
            window.scrollTo(0, 0,);
            // TODO: do I want to show the user information about the phone number?
            resultsSection.innerHTML = `<div class="alert alert-danger">
            <h1>Error: Invalid phone number</h1>
            <p>Please enter a phone number using one of these formats:</p>
            <ul>
            <li>11234567890</li>
            <li>1-123-456-7890</li>
            <li>+1-123-456-7890</li>
            <li>+1 (123) 456-7890</li>
            </ul>
            <p>Include <b>both</b> the country and area code in the number.</p>
            </div>`;
            return;
        }
        const phoneOptions = {
            method: 'POST'
        }
        // TODO: undo this when done testing!!!
        // need to go through another url to fix issue with mixed content
        getAPI = await fetch(FIX_API+'http://apilayer.net/api/validate?access_key='+PHONE_API_KEY+'&number='+input , phoneOptions);
        const results = await getAPI.json();
        // for testing
        // const results = {
        //     "valid": true,
        //     "line_type": "mobile",
        //     "carrier": ""
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
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/mlm-detector', options); 
        const results = await getAPI.json();
        // console.log(results);
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
        case 4:
            return mlmResults(results, resultsSection);
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

// function used to count words in the input field
// used for the email scam detector, as it needs a certain number of words to detect a scam.
function countWords(input) {
    return input.split(' ')
           .filter(function(n) { return n !== '' })
           .length;
}

// function used to see if the phone number inputted is in a valid format
function isValidPhone(phoneNum){
    // remove spaces, +'s, -, and parenthesis from the input (the api ignores these)
    let phoneNumber = phoneNum.replace(/[+()"  *"-]/g, '').trim();
    const phoneFormat = /[0-9]{11}/g;
    // check that the format is 11 numbers and that the length is 11
    return (phoneNumber.match(phoneFormat) && phoneNumber.length === 11 ? true : false);
}

function emailResults(results, resultsSection){
    const rating = results.rating;
    const isShort = results.isShort;
    switch(rating){
        case 3:
            resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
            <h1>${warning_icon}Scam detected!</h1>
            <p><b>This email is without a doubt a scam!</b> It has many characteristics that are common in scam emails.</p>
            <p><b>Do not</b> initiate contact with the scammer! If contact has already been initiated, cease contact immediately.</p>
            <p><b>Do not</b> click on any links or attachments that a scammer sends you; they may contain malicious content.</p>
            <p><b>Never</b> share personal information such as your name, address, birthdate, bank account information, etc. with a stranger over the internet.</p>
            <p><b>Never</b> send a scammer money! You will never receive the money that they promise you.</p>
            <p>You can report this scam to the FTC <a href="https://reportfraud.ftc.gov/#/" class="alert-link" rel="noreferrer" target="_blank">here</a>.</p>
            </div>`;
            return;
        case 2:
            resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
            <h1>${warning_icon}Scam detected!</h1>
            <p>This email is likely a scam.</p>
            <p><b>Do not</b> initiate contact with the scammer! If contact has already been initiated, cease contact immediately.</p>
            <p><b>Do not</b> click on any links or attachments that a scammer sends you; they may contain malicious content.</p>
            <p><b>Never</b> share personal information such as your name, address, birthdate, bank account information, etc. with a stranger over the internet.</p>
            <p><b>Never</b> send a scammer money! You will never receive the money that they promise you.</p>
            <p>You can report this scam to the FTC <a href="https://reportfraud.ftc.gov/#/" class="alert-link" rel="noreferrer" target="_blank">here</a>.</p>
            </div>`;
            return;
        case 1:
            if(!isShort){
            resultsSection.innerHTML = `<div class="alert alert-warning" role="alert">
            <h2>${warning_icon}Possible scam detected</h2>
            <p>This email could possibly be a scam; however, there were not enough similarities to scam emails found to determine that it is.</p>
            <p>If the email is from a stranger and promises large sums of money, a prize, or an incredible opportunity, it is a scam.</p>
            <p>Do not send money or personal information to strangers over the internet. Anyone who asks you to do so is most likely a scammer.</p>
            <p>If you believe this is a scam, it is best to cease all contact with the scammer.</p>
            </div>`;
            return;
        } else{
            resultsSection.innerHTML = `<div class="alert alert-warning" role="alert">
            <h2>${warning_icon}Possible scam detected</h2>
            <p>This email could possibly be a scam; however, there were not enough similarities to scam emails found to determine that it is.</p>
            <p><b>Note:</b> This email is short so there may not be enough information to determine whether it is a scam or not. If the email promises a large sum of money, a prize, or an incredible opportunity, it is a scam. 
            Remember if it sounds too good to be true, it probably is. If you believe this is a scam, it is best to cease all contact with the scammer. Do not send money or personal information to strangers over the internet.</p>
            </div>`;
            return;
        }
        default:
            if(!isShort){
            resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
            <h2>${info_icon}No scam detected</h2>
            <p>No scam was detected. There is a good chance that this email is safe, however be on the lookout for these signs that an email is a scam:</p>
            <p>If the email is from a stranger and promises large sums of money, a prize, or an incredible opportunity, it is a scam.</p>
            <p>Do not send money or personal information to strangers over the internet. Anyone who asks you to do so is most likely a scammer.</p>
            <p>If you believe this is a scam, it is best to cease all contact with the scammer.</p>
            </div>`;
            } else{
            resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
            <h2>${info_icon}No scam detected</h2>
            <p>No scam was detected in this email.</p>
            <p><b>Note:</b> This email is short so there may not be enough information to determine whether it is a scam or not. If the email promises a large sum of money, a prize, or an incredible opportunity, it is a scam. 
            Remember if it sounds too good to be true, it probably is. If you believe this is a scam, it is best to cease all contact with the scammer. Do not send money or personal information to strangers over the internet.</p>
            </div>`;
            }
    }
}

// TODO: ADD LINK TO THE FTC REPORTING THING SO THEY CAN REPORT THIS
function guruResults(results, resultsSection){
    const matchFound = results.matchFound;
    const websiteMatch = results.websiteMatch;
    const guruMatch = results.guruMatch;
    if (!matchFound || (websiteMatch == null && guruMatch == null)){
        resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
        <h2>${info_icon}No known fake guru or fake guru related (get rich quick scheme) website detected</h2>
        </div>`;
        return;
    } else if(guruMatch != null){
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}Fake guru detected!</h2>
        <p><b>${guruMatch}</b> is a known fake guru.</p>
        </div>`;
    } else {     
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}Get rich quick scheme website detected!</h2>
        <p><b>${websiteMatch}</b> is a get rich quick scheme website.</p>
        </div>`;
    }
}

function phoneResults(results, resultsSection){
    // console.log(results);   
    window.scrollTo(0, 0,);
    if (results.success === false){
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}Error with phone detector!</h2>
        </div>`;        
    }
    if(results.valid === false){
        // TODO: put some instructions here!
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}Invalid number detected!</h2>
        <p>This number was detected as being an invalid phone number. This could mean that this phone number is a scam.</p>
        </div>`;
        return;
    }
    const carrier = results.carrier;
    const lineType = results.line_type;
    if (lineType === 'landline' || lineType === 'toll_free' || carrier === ''){
        resultsSection.innerHTML = 
        `<div class="alert alert-warning" role="alert">
        <h2>${warning_icon}Possible scam detected</h2>
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
            <p>Was this number found from a popup or email claiming that you have a virus or that you won something?</p>
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
        <h2>${info_icon}No scam detected</h2>
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
// TODO: ADD LINK TO THE FTC REPORTING THING SO THEY CAN REPORT THIS
// this function helps with the phone form!!!
function showNextPhoneForm(id, value, resultsSection){
    // console.log(id);
    if(value === 'yes'){
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}Scam likely!</h2>
        <p>It is likely that this phone number is a scam!</p>
        <p>Do not give strangers personal information or money over the phone. Never divulge sensitive information such as bank account information or social security number to strangers.</p>
        <p>Do not attempt to call the scammer!</p>
        <p>You can report this scam to the FTC <a href="https://reportfraud.ftc.gov/#/" class="alert-link" rel="noreferrer" target="_blank">here</a>.</p>
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
        <h2>${info_icon}No scam detected</h2>
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

function mlmResults(results, resultsSection){
    const matchFound = results.matchFound;
    const company = results.match;
    const type = results.type;

    // TODO: ADD MORE TO THE INFO FOR THESE???
    // TODO: ADD LINK TO THE FTC REPORTING THING SO THEY CAN REPORT THIS SAY THEY CAN REPORT IT AS A PYRAMID SCHEME 

    if(!matchFound){
        resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
        <h2>${info_icon}No MLM detected</h2>
        <p>The entered company is not a known MLM.</p>
        <p>Be sure that you entered the company name properly.</p>
        </div>`
    } else if(type !== ''){
        // if the type is not empty
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}MLM detected!</h2>
        <p><b>${company}</b> is an MLM for ${type}.</p>
        <p>You can report pyramid schemes and fraudulent businesses to the FTC <a href="https://reportfraud.ftc.gov/#/" class="alert-link" rel="noreferrer" target="_blank">here</a>.</p>
        </div>`;
    } else{
        resultsSection.innerHTML = `<div class="alert alert-danger" role="alert">
        <h2>${warning_icon}MLM detected!</h2>
        <p><b>${company}</b> is an MLM.</p>
        <p>You can report pyramid schemes and fraudulent businesses to the FTC <a href="https://reportfraud.ftc.gov/#/" class="alert-link" rel="noreferrer" target="_blank">here</a>.</p>
        </div>`;
    }
}


// old phone not scam text:
// eslint-disable-next-line no-lone-blocks
{/* <div class="alert alert-success" role="alert">
        <h2>No scam detected</h2>
        <p><b>Note: </b> if this number shows up as "scam likely" in your phone, it probably is a scam. Also note if anyone asks for payment over the phone especially through giftcards, wire transfer, bitcoin, prepaid debit card, private courier, or similar method, it is a scam. Also be advised of any unkown caller attemting to scare or threaten you, it is most likely a scam.</p>
        </div>` */}