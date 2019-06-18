import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import EditProject from "./components/projects/EditProject";
import Demo from "./components/auth/Demo";

//React version 16.8.6
//Testing demo mode branch
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Switch>
            <Route exact path="/dashboard/:id" component={Dashboard} />
            {/* Need to be able to redirect to dashboard when path='/' and the user is logged in,
            otherwise the use gets redirected to signin */}
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/demo" component={Demo} />
            {/* <Route path="/" component={SignIn} /> */}
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create/:id" component={CreateProject} />
            <Route path="/edit/:id" component={EditProject} />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
