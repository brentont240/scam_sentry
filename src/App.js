import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ArticlesListPage from "./pages/ArticlesListPage";
import ToolsListPage from "./pages/ToolsListPage";
import ToolsPage from "./pages/ToolPage";
import ArticlesPage from "./pages/ArticlesPage";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";


// TODO: when done, change the text in the readme to be about the project! ( use srs stuff )
// Do I want to make the tool pages dynamic (have 1 page and then change it depending on what tool is used?) 


// FIXME: FIX IT SO THE 404 PAGE SHOWS UP ON NETLIFY AND THAT IT DOESN'T MESS UP WHEN REFRESHED!!!!

// TODO: FRI
// TODO: HOST THE FRONT AND BACKEND ON DIFFERENT THINGS (BACKEND ON HEROKU AND MAYBE GITHUB PAGES OR NETLIFY FOR FRONT END)
function App() {
  return (
    <Router>
      <ScrollToTop>
      <NavBar />
      {/* TODO: MAKE SURE TO MEET ALL OF THE REQUIREMENTS THAT I HAVE SET UP!!! */}
      {/* follow the back end video when setting up the backend!!! */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/articles-list" element={<ArticlesListPage />} />
          <Route path="/tools-list" element={<ToolsListPage />} />
          <Route path="/tools/:url" element={<ToolsPage />} />
          <Route path="/articles/:url" element={<ArticlesPage />} />
          <Route path="*" element={<PageNotFound />}/> {/* use path="*" to catch any page that is not specified!*/}
        </Routes>
      </main>
      <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
