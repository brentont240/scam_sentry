import React from "react";
import Articles from "../data/articles.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ArticlesListPage = () => (
  <div className="container">
      <h1 className="pt-4 display-4">Articles</h1>
    <div className="article-list">
      {Articles.List.map((article, key) => (
        <div className="article-item" key={key }>
          {/* TODO: ADD ALT TEXT to the images? */}
          <Link to={`/articles/${article.Url}`}>
          <img src={require(`../images/${article.Image}.png`)} alt={article.ImageAlt} className="img-thumbnail rounded article-thumbnail-image"></img>
          </Link>
          <div className="article-details">
            <h3>{article.ArticleHeading}</h3>
            <p>Type: <span className="article-type">{article.Type}</span></p>
            {/* TODO: Maybe make it so that this changes when the window is resized? */}
            <p>{article.Content.substring(0,getSubstringLength())}... <Link to={`/articles/${article.Url}`}>Read More <FontAwesomeIcon icon={faArrowRight} /></Link></p>
          </div>
        </div>        
      ))}
    </div>
    </div>
);

// displays a different amount of preview text, depending on the screensize
function getSubstringLength(){
  const screensize = window.innerWidth;
  if(screensize < 770){
    return 200;
  }
  return 500;
}

export default ArticlesListPage;
