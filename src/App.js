import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import "./App.css";
import Scroll from "./Scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfeild: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => {
    this.setState({ searchfeild: event.target.value });
  };

  render() {
    const filterRobots = this.state.robots.filter(robots => {
      return robots.name
        .toLowerCase()
        .includes(this.state.searchfeild.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1>loading</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f-subheadline lh-title">ROBOFRIENDS</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filterRobots} />
          </Scroll>
        </div>
      );
    }
  }
}
export default App;
