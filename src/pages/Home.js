import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faScrewdriverWrench, faNewspaper, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Home = () => (
  <>
    <div className="container-fluid home-hero">
      <h1 className="display-1 text-center">Scam Sentry</h1>
      <p className="text-center mt-3 fs-5">Suspect, Detect, and Protect</p>
      {/* TODO: put a button here to scroll down? or maybe not? */}
    </div>
    <div className="container mt-4">
      <h1 className="s-color">Suspect that something is a scam?</h1>
      <p>
      Scams are everywhere. You probably come across multiple scams every day. 
      The mission of Scam Sentry is to help you to know if something is a scam or not, and what to do when you come across a scam. 
      Our moto is Suspect, Detect, and Protect. It is the process that you should use whenever you come across a scam. 
      Whenever you find something that seems suspicious, this is what you should do:
      </p>
      {/* TODO: FIX THESE ANCHOR LINKS (NOT WORKING ON MOBILE) ? (They may be working, just might be finicky) */}
      <ol>
        <li><b>Suspect:</b> You come across something that you suspect could be a scam. It could be anything: an email, letter, phone call, job posting, text message, business opportunity, social media post, advertisement, item listing, etc. Always be aware that something may be a scam; if it sounds too good to be true, it probably is.</li>
        <li><b>Detect:</b> Now you need to determine if what you came across is a scam or not. Luckily, we have many tools that can help you to detect if something is a scam. Click <a href="#tools">here</a>  to learn more about the tools we have. We also have many articles that go over different kinds of scams in detail, click <a href="#articles">here</a> to learn more.</li>
        <li><b>Protect:</b> Once you have determined that something is a scam you need to protect yourself and others from it. One of the best ways to do this is to stay away from the scam. Do not contact scammers, they are criminals and are potentially dangerous. Never share personal information with strangers over the phone or internet. Do not send money to strangers over the internet. Legitimate companies will never ask for personal information, passwords, or payments over email, phone, text, or other similar means. If someone asks you for those things, it is a scammer who is pretending to work for the company. Be sure to also help protect others from scams. If you see a scam posted on social media, comment that it is a scam. If someone you know describes something that sounds like a scam, send them to this website. If you come across a scam, you can report it to the FTC by clicking <a href="https://reportfraud.ftc.gov/#/" rel="noreferrer" target="_blank">this link</a>.</li>
      </ol>

      <h1 className="s-color">Words of wisdom</h1>
      <p>Here are some important tips to keep in mind. These can potentially save you or someone you know from being scammed.</p>
      <ul>
        <li>If it sounds too good to be true, it probably is.</li>
        <li>Trust the warnings from your phone, web browser, email provider, etc. If they tell you that something is a scam, it most likely is.</li>
        <li>Don't share personal information with strangers over the internet. Especially information like your address, bank account information, passwords, etc.</li>
        <li>Don't click links that come from strange emails or text messages. They could steal your information or infect your system with malware. Sometimes it may take just one click for a scammer to get access to your account.</li>
        <li>If someone asks you to pay money to get a larger amount of money, it is probably a scam.</li>
        <li>If anyone asks for payment in gift card, bitcoin, or wire transfer service like Western Union or MoneyGram, it is probably a scam.</li>
        <li>If you come across something that says it is urgent, don't panic. Take time to think and examine it more closely. It is easier for you to be scammed if you panic.</li>
        <li>If someone threatens you in any way it is probably a scam. For example, if someone threatens to shut down your account or charge you with a large fee unless you pay them money, it is probably a scam. A reputable company will not threaten you.</li>
        <li>If you receive a message that has a lot of grammatical and spelling errors and/or is written in all capital letters, it may be a scam. An official company email will not be filled with typos, and will be professionally written.</li>
      </ul>
      <p>To learn more about scams and how to know if something is a scam or not, read more about our tools and articles below:</p>
    </div>
    {/* TODO: put sections for the tools page and articles page here!!! */}
    {/* TODO: MAKE THESE LOOK REALLY GOOD */}
    {/* TODO: ADD IN A COOL SHINE COLOR OR AN ANIMATION OR SOMETHING INTERESTING */}
    <div className="tertiary-bg">
      <div className="container py-4">
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="card secondary-bg w-color h-100" id="tools">
              <div className="card-body">
              <h1 className="text-shadow"><FontAwesomeIcon icon={faScrewdriverWrench} /> Tools</h1>
                <p className="card-text text-shadow">
                Need to know if something is a scam? Scam Sentry provides free tools to help detect if something is a scam. Each of these tools specializes in a different type of scam. These include email scams, phone scams, fraudulent websites, cryptocurrency scams, and more. Click the button below to visit the tools page and get started with defending yourself against scams.
                </p>
                <div className="mt-auto d-flex flex-row justify-content-center">
                <Link to={'/tools-list'} className="btn btn-outline-light">
                  Click to go to the tools page <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card secondary-bg w-color h-100" id="articles">
              <div className="card-body">
              <h1 className="text-shadow"><FontAwesomeIcon icon={faNewspaper} /> Articles </h1>
                <p className="card-text text-shadow">
                Want to learn more about different kinds of scams? Scam Sentry's articles go into detail about specific scams. Learn how a specific scam works and what it looks like, so you can identify it when it comes up in the future. Also learn what to do and what not to do when coming across these situations. Click the button below to visit the articles page and learn about different scams.
                </p>
                <div className="mt-auto d-flex flex-row justify-content-center">
                <Link to={'/articles-list'} className="btn btn-outline-light">
                  Click to go to the articles page <FontAwesomeIcon icon={faArrowRight} />
                </Link >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;

