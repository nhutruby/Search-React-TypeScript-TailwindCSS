import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Search } from "./posts/Search";
import { PostList } from "./posts/PostList";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          render={() => (
            <React.Fragment>

              <Search />



              <PostList />

            </React.Fragment>
          )}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
