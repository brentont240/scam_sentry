import React from "react";
import tools from '../data/tools.json'
import PageNotFound from "./PageNotFound";
import { useParams } from "react-router-dom";

// FIXME: NEED TO FIX THE CORS ERROR

const ToolsPage = () => {
    let params = useParams();
    const tool = tools.List.find(tool => tool.Url === params.url);
    if(!tool) return <PageNotFound /> // return 404 page if the tool does not exist
    let inputAndButton = ``;
    // if using fetch do npm install --save whatwg-fetch so it can work on ie
    if(tool.InputType === "textarea")
        inputAndButton = <> <textarea name="input" id="input" cols="50" rows="15" className="mt-2 input-field-color email-detector-text-area" placeholder={tool.InputPlaceholderText} ></textarea> 
        <span id="button-section"><button type="button" className="btn button-tools text-field-button" onClick={() => getResult(tool.Id)}>{tool.ButtonText}</button></span> </>;
    else {
        inputAndButton = <div className="input-group my-4">
        <input name="input" id="input" type={tool.InputType} className="input-field-color input-text form-control" placeholder={tool.InputPlaceholderText} />
        <button type="button" className="btn button-tools"  onClick={() => getResult(tool.Id)}>{tool.ButtonText}</button>
        </div>;
    }
    return ( 
       <div className="container">
        <h1 className="pt-4">{tool.Name}</h1>
        <p>{tool.BodyText}</p>
        <section id="results"></section>
            <form>
            {inputAndButton}
            {/* test different button sizes, colors, and other designs */}
            {/* When the page is loading, put a spinner in the button  (bootstap's docs show how to do this)*/}
            {/* <button type="button" className="btn button-tools"  onClick={() => getResult(tool.Id)}>Check</button> */}

            {/* use this when it is loading */}
            {/* <button className="btn button-tools" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span> Loading...</span>
            </button> */}

            </form>
        </div>
    );
};

// TODO: in the website detector say that they can go to the guru detector to see if a website is a get rich quick scheme website

const getResult = async (id) => {
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
            'Content-Type': 'application/json'
            // 'Accept': 'application/json'
        },
        body: JSON.stringify({input: input})
    }
    // TODO: Change the backend link based on the id that is put into here!
    let getAPI ="";
    if(id===0){
        // email
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/email-detector', options);
        const rating = await getAPI.json();
        // TODO: FIXME: use rating.isShort to see if the email is short or not!!!
    
        // TODO:  implement the use short if the rating is 0 or 1!!!
        console.log(rating.isShort);
        displayResults(rating.rating, id);    
    } else if(id===1){
        // website
        // getAPI = await fetch
    } else if(id===2){ 
        // phone
        // getAPI = await fetch
    } else if(id===3){
        // guru
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
    // TODO: FIXME: use rating.isShort to see if the email is short or not!!!
    switch(id){
        case 3:
            return guruResults(results, resultsSection);
        case 2:
            resultsSection.innerHTML = `<div class="alert alert-danger">
            <h1>Oops, this is not set up yet</h1>
            </div>`;
            return;
            // TODO: implement the use short if the rating is 0 or 1!!!
        case 1:
            resultsSection.innerHTML = `<div class="alert alert-warning">
            <h2>Possible scam detected</h2>
            </div>`;
            return;
            // TODO: implement the use short if the rating is 0 or 1!!!
        default:
            return emailResults(results, resultsSection);
    }
}


function emailResults(rating, resultsSection){
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
            resultsSection.innerHTML = `<div class="alert alert-warning" role="alert">
            <h2>Possible scam detected</h2>
            </div>`;
            return;
            // TODO: implement the use short if the rating is 0 or 1!!!
        default:
            resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
            <h2>No scam detected</h2>
            </div>`;
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

export default ToolsPage;

