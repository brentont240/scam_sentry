import React from "react";
import tools from '../data/tools.json'
import PageNotFound from "./PageNotFound";
import { useParams } from "react-router-dom";

const ToolsPage = () => {
    let params = useParams();
    const tool = tools.List.find(tool => tool.Url === params.url);
    if(!tool) return <PageNotFound /> // return 404 page if the tool does not exist

    // if using fetch do npm install --save whatwg-fetch so it can work on ie
    return (
       <div className="container">
        <h1 className="pt-3">{tool.Name}</h1>
            <form action="https://scam-sentry-backend.herokuapp.com/email-detector" method="POST">
            <textarea name="input" id="input" cols="50" rows="15" className="input-field-color email-detector-text-area"></textarea>
            {/* test different button sizes, colors, and other designs */}
            {/* When the page is loading, put a spinner in the button  (bootstap's docs show how to do this)*/}
            <button type="submit" className="btn button-tools">Check</button>
            {/* TESTING DIFFERENT BUTTONS */}
            <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
            </button>

            </form>
        </div>
    );
};

export default ToolsPage;