import React from "react";
import "./intro.css";
import arrowMobile from "./arrow_intro_mobile.jpg";
import arrowDesktop from "./arrow_intro_desktop.jpg";

export default class Introduction extends React.Component {
  render() {
    return(
      <div className="intro">

          <div className="intro__arrow">
            <picture>
              <source srcSet={arrowDesktop} media="(min-width: 900px)" />
              <img className="intro__arrow__picture" src={arrowMobile} alt="Arrow image leading the user to button that opens list" />
            </picture>
            <h2>Choose from the list</h2>
          </div>

          <div className="intro__text">
              <h2>Learn by listening</h2>

              <p>With our application you can get the most
              of English grammar, phrases, idioms,
              collocations and much more.
              Listen to real dialogues from famous sitcom
              and have fun!
              </p>

              <p>There’s more to learning than hard routine!</p>

          </div>

      </div>
    )
  }
}