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
        inputAndButton = <> <textarea name="input" id="input" cols="50" rows="15" className="input-field-color email-detector-text-area" placeholder={tool.InputPlaceholderText} ></textarea> 
        <span id="button-section"><button type="button" className="btn button-tools text-field-button" onClick={() => getResult(tool.Id)}>{tool.ButtonText}</button></span> </>;
    else {
        inputAndButton = <div className="input-group">
        <input name="input" id="input" type={tool.InputType} className="input-field-color input-text form-control" placeholder={tool.InputPlaceholderText} />
        <button type="button" className="btn button-tools"  onClick={() => getResult(tool.Id)}>{tool.ButtonText}</button>
        </div>;
    }
    return ( 
       <div className="container">
        <h1 className="pt-3">{tool.Name}</h1>
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
        resultsSection.innerHTML = `<div class="alert alert-danger">
        <h1>Error: No input</h1>
        <p>Please enter valid information into the input field below.</p>
        </div>`;
        return;
    }

    // shows that the results are loading TODO: work on making this look better (see bootstrap spinners for help)
    // FIXME: is this good when it is centered aligned or should i do something else? should I use a different loading spinner?
    resultsSection.innerHTML = `<div class="text-center"> <div class="spinner-border tool-spinner" role="status">
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
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/email-detector', options);    
    } else if(id===3){
        getAPI = await fetch('https://scam-sentry-backend.herokuapp.com/guru-detector', options); 
    }
    const rating = await getAPI.json();
    // TODO: FIXME: use rating.isShort to see if the email is short or not!!!
    console.log(rating.rating);
    console.log(rating);
    // TODO: implement the use short if the rating is 0 or 1!!!
    console.log(rating.isShort);
    displayResults(rating.rating);
    // button.innerHTML = buttonBefore;
};

function displayResults(rating){
    // TODO: maybe use an icon with these
    // &#9888 = warning icon!
    let resultsSection = document.querySelector('#results');
    // TODO: https://getbootstrap.com/docs/5.0/components/alerts/ LOOK AT ALERT COMPONENTS FOR MORE STYLING IDEAS!!!
    // use icons!!! (maybe use svgs!!!)
    switch(rating){
        case 3:
            resultsSection.innerHTML = `<div class="alert alert-danger">
            <h1>Scam detected!</h1>
            <p>This email is definitely a scam</p>
            </div>`;
            return;
        case 2:
            resultsSection.innerHTML = `<div class="alert alert-danger">
            <h1>Scam detected!</h1>
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
            resultsSection.innerHTML = `<div class="alert alert-success" role="alert">
            <h2>No scam detected</h2>
            </div>`;
    }
}

export default ToolsPage;

