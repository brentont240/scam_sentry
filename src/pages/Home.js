import React from "react";

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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis soluta
        fuga veniam cumque sapiente necessitatibus, neque explicabo voluptates,
        nulla ad vitae! Id consequatur fuga rem provident odio illum nobis.
        Ratione repellat sapiente consequatur reprehenderit aliquam labore
        molestiae quisquam repellendus doloremque, in amet et nobis, numquam
        modi explicabo blanditiis aut nulla? Ipsum nulla suscipit nesciunt
        labore quam neque obcaecati, soluta rem, aliquam officia voluptatibus
        debitis ab sequi, ut dolores vitae fugiat expedita. Rem beatae officia
        inventore expedita ipsa iste eius quidem consequatur rerum saepe
        praesentium tempore at, consequuntur, maxime ipsum delectus id soluta
        veniam. Itaque sequi qui libero id fuga. Reprehenderit!
      </p>
      {/* TODO: look at better ways to word / format this!!! */}
      {/* TODO: DO I WANT TO USE THIS QUOTE FORMAT???!!! */}
      <h3>&#8595; might want to change this &#8595;</h3>
      <div className="quote-div">
      <h4><b>Keep in mind:</b></h4>
      <blockquote className="blockquote">
        <p>If it sounds too good to be true, it probably is.</p>
      </blockquote>        
      </div>

      {/* TODO: put sections for the tools page and articles page here!!! */}
    </div>
  </>
);

export default Home;
