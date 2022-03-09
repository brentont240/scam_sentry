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
        <span id="button-section"><button type="button" className="btn button-tools" onClick={() => getResult(tool.Id)}>{tool.ButtonText}</button></span> </>;
    else {
        inputAndButton = <div className="input-group">
        <input name="input" id="input" type={tool.InputType} className="input-field-color input-text form-control" placeholder={tool.InputPlaceholderText} />
        <button type="button" className="btn button-tools"  onClick={() => getResult(tool.Id)}>{tool.ButtonText}</button>
        </div>;
    }
    return ( 
       <div className="container">
        <h1 className="pt-3">{tool.Name}</h1>
        <div id="results"></div>
            <form>
            {inputAndButton}
            {/* test different button sizes, colors, and other designs */}
            {/* When the page is loading, put a spinner in the button  (bootstap's docs show how to do this)*/}
            {/* <button type="button" className="btn button-tools"  onClick={() => getResult(tool.Id)}>Check</button> */}
            {/* TESTING DIFFERENT BUTTONS */}
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
    const input = document.querySelector("#input").value;
    // for the button to load!
    // let button = document.querySelector("#button-section");
    // let buttonBefore = button.innerHTML;
    // button.innerHTML = `<button class="btn button-tools" type="button" disabled>
    // <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    // <span> Loading...</span>
    // </button>`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({input: input})
    }
    
    const result = await fetch('https://scam-sentry-backend.herokuapp.com/email-detector', options);       
    const rating = await result.json();
    
    console.log(rating.rating)
    displayResults(rating.rating);
    // button.innerHTML = buttonBefore;
};

function displayResults(rating){
    let resultsSection = document.querySelector('#results');
    switch(rating){
        case 3:
            resultsSection.innerHTML = `<h1 class="text-danger">Scam Detected!</h2>
            <p>This email is definitely a scam</p>`;
            return;
        case 2:
            resultsSection.innerHTML = `<h1 class="text-danger">Scam detected!</h2>`;
            return;
        case 1:
            resultsSection.innerHTML = `<h2 class="text-warning">Possible scam detected.</h2>`;
            return;
        default:
            resultsSection.innerHTML = `<h2 class="text-success">No scam detected!</h2>`;
    }
}

export default ToolsPage;

