import React from "react";
import articles from '../data/articles.json';
import PageNotFound from "./PageNotFound";
import { useParams } from "react-router-dom";

const ArticlesPage = () => {
    let params = useParams();
    const article = articles.List.find(article => article.Url === params.url);
    if(!article) return <PageNotFound /> // return 404 page if the  article does not exist

    return ( 
       <div className="container pt-4">
        <p className="text-muted">Add a go back to articles button?</p>
        <h1>{article.ArticleHeading}</h1>
        <h2>{article.ArticleSubHeading}</h2>
        <p>center this image, make it look better, and also add alt text</p>
        <p>do good styling for this, look up what looks good!!!</p>
        <p>give credit to images somehow</p>
        <img src={require(`../images/${article.Image}.png`)} alt="" className="article-image"/>
        <p className="my-4">{article.Content}</p>
        </div>
    );
};

export default ArticlesPage;