import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

// import Home from './pages/home';
import Todolist from './pages/todolist';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Allen"
        }
    }
    onButtonClick = () => {
        console.log(this.state.name);
    }
    render() {
        return <div onClick={this.onButtonClick}>Hello</div>
    }
}

const App = () => {
    return (
        <HashRouter>
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/todolist" exact component={Todolist} />
            </div>
        </HashRouter>
    )
}

export default App;