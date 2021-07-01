import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
    // No longer a class
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: ""
    //     }
    // }

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => { return response.json() })
    //         .then(users => { this.setState({ robots: users }); })
    // }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json() })
            .then(users => { setRobots(users) })
        console.log(count);
    }, [count])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

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
    return !robots.length ?
        <h1 className="tc f1">Loading...</h1> :
        (
            <div className="tc" >
                <h1 className="f1">Robo Friends</h1>
                <button onClick={() => setCount(count + 1)}>Click Me!</button>
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

export default App;