import React, { Component } from "react";
import Review from "./components/Review";
import Settings from "./components/Settings";
import Instructions from "./components/Instructions";
import { AppProvider } from "@shopify/polaris";
import "./css/style.css";
import "@shopify/polaris/dist/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  // NavLink,
} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <header>
            <h1 id="title">
              PRODUCT REVIEWS ADMIN PAGE |
              <a
                href="https://apps.omegatheme.com/customer-reviews/guide.html"
                id="title-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                DOCUMENT HERE !
              </a>
            </h1>
            <div id="group-button">
              <Link className="btn btn-light  .btn-lg top-button" to="/">
                List reviews
              </Link>
              <Link
                className="btn btn-light  .btn-lg top-button"
                to="/settings"
              >
                Settings
              </Link>
              <Link
                className="btn btn-light  .btn-lg top-button"
                to="/instructions"
              >
                Instructions
              </Link>
            </div>
          </header>
          <div id="arrow"></div>
          <div id="reviews-box">
            <Route path="/" exact component={Review} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/instructions" exact component={Instructions} />
          </div>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
