import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Login from './Login'
import AdminIndex from './AdminIndex'
function Main(){
    return (
        <Router>
            <div>
                <Route path="/" exact component={Login} />
                <Route path="/index/" component={AdminIndex} />
            </div>      
            
           
        </Router>
    )
}
export default Main


