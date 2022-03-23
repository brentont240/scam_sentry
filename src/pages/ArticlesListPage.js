import React from "react";
import Articles from "../data/articles.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ArticlesListPage = () => (
    <div className="container">
      {/* TODO: maybe use a card component for this? */}
      <h1 className="pt-3">Articles</h1>
      {/* create an article component then generate them with a map or something!!! */}
    <div className="article-list">
      {Articles.List.map((article, key) => (
        <div className="article-item" key={key }>
          <img src={require(`../images/${article.Image}.png`)} alt ="stuff" className="img-thumbnail rounded article-thumbnail-image"></img>
          <div>
            <h3>{article.ArticleHeading}</h3>
            <p>Type: <span className="article-type">{article.Type}</span></p>
            <p>{article.Content.substring(0,200)}... <Link to={`/articles/${article.Url}`}>Read More <FontAwesomeIcon icon={faArrowRight} /></Link></p>
          </div>
        </div>        
      ))}
    </div>
    </div>
);

export default ArticlesListPage;
