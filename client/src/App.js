import React, { Component } from 'react';      // import system defined react api

/*With apollo-link-state, you no longer have to maintain a second store for local state. 
You can instead use the Apollo Client cache as your single source of truth
apollo-bost  includes apollo-link-state underneath the hood for you & it replaces a REDUX Store */
import ApolloClient from 'apollo-boost';       //import system defined  apollo boost  api

import { ApolloProvider } from 'react-apollo'; //import system defined apollo provider api
import { BrowserRouter as Router, Route } from 'react-router-dom'; //import react system defined routing api
import Countries from './components/Countries';   //import custom components 
import Country from './components/Country';       //import custom components 

const client = new ApolloClient({
  uri:'/graphql'
});
class App extends Component{
  render(){
    return(
    <ApolloProvider client={client}>
<Router>
<div className="container">
            <h1>Apollo-Graphql</h1>
            <Route exact path="/country" component={Countries}/>
            <Route exact path="/country/:name" component={Country}/>
            </div>
</Router>
    </ApolloProvider> 
       
    );
  }
}

export default App;
