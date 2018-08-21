import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from './pages/home';

const App = () => {
    return (
        <HashRouter>
            <div>
                <Route path="/" component={Home} />
            </div>
        </HashRouter>
    )
}

export default App;