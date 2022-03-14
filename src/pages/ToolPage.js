import React from "react";
import tools from '../data/tools.json'
import PageNotFound from "./PageNotFound";
import { useParams } from "react-router-dom";
import { getResult } from "../components/GetResults";
// FIXME: NEED TO FIX THE CORS ERROR
// need to put REACT_APP in front of the environment variables

const ToolsPage = () => {
    let params = useParams();
    const tool = tools.List.find(tool => tool.Url === params.url);
    if(!tool) return <PageNotFound /> // return 404 page if the tool does not exist
    let inputAndButton = ``;
    // if using fetch do npm install --save whatwg-fetch so it can work on ie
    // TODO: add a radar icon to the buttons?
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

export default ToolsPage;