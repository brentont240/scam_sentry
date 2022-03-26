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
        {/* <Link to={'/articles-list'}><FontAwesomeIcon icon={faArrowLeft} /> Go back to article list</Link>
        <p><b>Do i want this go back button?</b></p> */}
        <div className="text-center pb-2">
            <h1>{article.ArticleHeading}</h1>
            <h3 className="text-muted">{article.ArticleSubHeading}</h3>            
        </div>

        
        <img src={require(`../images/${article.Image}.png`)} alt={article.ImageAlt} className="article-image"/>
        <p className="bg-danger w-color text-center mt-3 p-3"><strong>⚠⚠Add alt text to the images⚠⚠</strong></p>
        <div className="my-4" dangerouslySetInnerHTML={ {__html: article.Content} }></div>
        </div>
    );
};


export default ArticlesPage;