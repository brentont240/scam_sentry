import React from "react";
import articles from '../data/articles.json';
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const ArticlesPage = () => {
    let params = useParams();
    const article = articles.List.find(article => article.Url === params.url);
    if(!article) return <PageNotFound /> // return 404 page if the  article does not exist

    return ( 
       <div className="container pt-4">
        <Link to={'/articles-list'}><FontAwesomeIcon icon={faArrowLeft} /> Go back to article list</Link>
        <p><b>Do i want this go back button?</b></p>
        <h1>{article.ArticleHeading}</h1>
        <h2>{article.ArticleSubHeading}</h2>
        <p>center this image, make it look better, and also add alt text</p>
        <img src={require(`../images/${article.Image}.png`)} alt={article.ImageAlt} className="article-image"/>
        <div className="my-4" dangerouslySetInnerHTML={ {__html: article.Content} }></div>
        </div>
    );
};


export default ArticlesPage;