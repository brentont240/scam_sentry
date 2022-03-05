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
            <form action="http://localhost:8000/email-detector" method="POST">
            <textarea name="input" id="input" cols="30" rows="10"></textarea>
            <button type="submit" className="btn">Check</button>
            </form>
        </div>
    );
};

export default ToolsPage;