import React, { Component } from "react";

import '../styles/App.css';
import '../styles/PostList.css';
import PostList from "./PostList";

class App extends Component {
  render() {
    return (
      <div className="articles">
        <PostList/>
      </div>
  );
  }
}

export default App;