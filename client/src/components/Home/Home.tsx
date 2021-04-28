import React from "react";

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <ul className="home-list">
        <li>
          <a href="#what">What is ezBlogs?</a>
        </li>
        <li>
          <a href="#why">Why ezBlogs?</a>
        </li>
        <li>
          <a href="#how">How does ezBlogs work?</a>
        </li>
        <li>
          <a href="#use">Can I use it?</a>
        </li>
        <li>
          <a href="#plans">What is ezBlogs' future?</a>
        </li>
      </ul>
      <div className="home-content">
        <h2 id="what">What is ezBlogs?</h2>
        <p>
          ezBlogs is a simple, easy-to-use blogging platform. It's an ambitious project
          that I decided to start, but it has been an amazing way to learn and grow as a
          developer. The development will steadily continue and features will be added,
          and if you would like to join the development, feel free to contribute!
          <br />
          The code is hosted on{" "}
          <a
            href="https://github.com/daniel-ulises/ezblogs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github.
          </a>
        </p>

        <h2 id="why">Why ezBlogs?</h2>
        <p>
          That's a good question. The sole purpose of this project is to learn and grow as
          a developer. In the beginning, this was nothing but a side project that I
          started to practice my skills using the{" "}
          <span className="emphasis">PERN stack</span>, but it has become something that I
          would like to keep in continuous development, and who knows, maybe it becomes a
          feature rich project that will be used by people one of these days.
        </p>

        <h2 id="how">How does ezBlogs work?</h2>
        <p>
          The functionality is rather simple at this stage. You register, log in, and
          you're ready to add blogs. The features are currently limited to write and read
          people's blogs, but I do have some features in mind that I will implement{" "}
          <span className="emphasis">very shortly</span>.
        </p>

        <h2 id="use">Can I use it?</h2>
        <p>
          If you happen to like it and want to use it, go ahead! This is an open-source
          project and will remain as such. Feel free to fork and change it if you like,
          your contributions -<em>if you choose to contribute</em>- are always welcome!!
          <br />
        </p>

        <h2 id="plans">What is ezBlogs' future?</h2>
        <p>
          I have a few features in mind that I will be implementing rather soon, this is
          one of the projects I am working on the most right now and it will most probably
          stay like that. Also, since there are things that I am still discovering,
          chances are that the code will be changing continuously{" "}
          <span className="emphasis">for the better</span>, obviously.
        </p>
      </div>
    </div>
  );
};
