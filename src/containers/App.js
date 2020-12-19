import React, {Component} from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundary";
import './App.css';

//in the app components we have to put 
//properties to enable exchanging data.

class App extends Component {
    constructor() {
        super();
       
        //#region 
        // declaring a class field in js is not like C#
        // this process is done in the constructor. 
        /**
            class person {
                constructor(name) {
                    this.name = name; //the prop name has been declared in the ctor
                }
            } 
         */
        //#endregion
        
        this.state = {
            robots: [],
            searchField : ""
        };
    }

    // as this method is part of the react it does not requird an arrow () => ..
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

    render() {
        const {robots, searchField} = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });

        return !robots.length ?
            <h1 className="tc">Loadings ... </h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filterRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }
}

export default App;