import React from "react";
import Tools from '../data/tools.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faEnvelope, faGlobe, faPhone, faUserTie, faBitcoinSign, faArrowRight, faArrowUpRightFromSquare, faSquareCaretUp} from '@fortawesome/free-solid-svg-icons'

// TODO: maybe add the tools to the toolbar in the header? (want to do that dynamically)

const ToolsListPage = () => (
    <div className="container">
    <span className="text-center">
        <h1 className="pt-4">Tools</h1>
    </span>
    
      {/* put some information about the tools here? */}

      <div className="tools mt-4">
      {Tools.List.map((tool, key) =>(
          <div className="card tool-card shadow-sm" key={key}>
            <div className="card-body">
            <div className="text-center tool-icon">
            <FontAwesomeIcon icon={getIcon(tool.Icon)} className="fa-3x"/>
            </div>
                <h5 className="card-title text-center s-color">{tool.Name}</h5>
                <p className="card-text">{tool.Description}</p>
                {/* change the alignment or not? */}
                {/* FIXME: do some styling (color) changes for the button and center? */}
                {/* FIXME: change a to a Link */}
                {/* this makes the button go to the bottom of the card */}
                <div className="mt-auto d-flex flex-row justify-content-center">
                {/* Links to an external site, if IsExternal is true */}
                {tool.IsExternal ? (
                    <a href={tool.Url} target={"_blank"} className="btn button-tools button-tools-list" rel="noreferrer">Use Tool <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                ) : (
                    <Link to={`/tools/${tool.Url}`} className="btn button-tools button-tools-list">Use Tool <FontAwesomeIcon icon={faArrowRight} /></Link>
                )}
                </div>
            </div>
        </div>
      ))}
      {/* TODO: put the other tools (mlm and crypto one) here */}
      {/* TODO: ALSO PUT THESE INTO THE JSON, BUT IN A SEPARATE ARRAY!!! */}
      {/* TODO: or do I want to put these into the site, but link to an external site and specify this? */}
      </div>
    </div>
  
);

// used to retrieve the proper icons
function getIcon(icon){
    switch(icon){
        case 'envelope':
            return faEnvelope;
        case 'globe':
            return faGlobe;
        case 'phone':
            return faPhone;
        case 'business':
            return faUserTie;
        case 'pyramid':
            return faSquareCaretUp;
        case 'bitcoin':
            return faBitcoinSign;
        default:
            return;
    }
}

export default ToolsListPage;
