import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { requestRobots, setSearchField } from '../actions';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        searchfield: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App(props) {
    // No longer a class
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: ""
    //     }
    // }

    //const [robots, setRobots];
    //const [searchField, setSearchfield];
    // const [robots, setRobots] = useState([]);
    // const [searchField, setSearchfield] = useState('');
    //const [count, setCount] = useState(0);

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => { return response.json() })
    //         .then(users => { this.setState({ robots: users }); })
    // }

    //useEffect(() => {

    // fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => { return response.json() })
    //     .then(users => { setRobots(users) })
    //console.log(count);
    //})//[count])

    // const onSearchChange = (event) => {
    //     setSearchfield(event.target.value);
    // }
    props.onRequestRobots();
    const { searchfield, onSearchChange, robots, isPending } = props
    // render() {
    // const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    //console.log(filteredRobots);
    /* Longer Method
    if (robots.length === 0) {
        return <h1 className="tc f1">Loading...</h1>
    }
    else {
        return (
            <div className="tc" >
                <h1 className="f1">Robo Friends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        );
    }
    */
    //return !robots.length ?
    return isPending ?
        <h1 className="tc f1">Loading...</h1> :
        (
            <div className="tc" >
                <h1 className="f1">Robo Friends</h1>
                {
                    //<button onClick={() => setCount(count + 1)}>Click Me!</button>
                }
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        )

    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);