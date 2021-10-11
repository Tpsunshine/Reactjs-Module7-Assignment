import React, { Component, Fragment } from 'react';  //imports system defined React API
import gql from 'graphql-tag'                       //imports system defined graphQL api
import { Query } from 'react-apollo';                //imports system defined  client apollo api that calls GraphQL 
import CountryItem from './CountryItem';  

const Countries_query=gql`
query CountriesQuery{
  countries
      {name
        native
        emoji
        currency
        languages{
          code
          nameL
        }
      }
    }
`;

export class Countries extends Component {
    render(){
    return(
        <Fragment>{}
            <h1 className="display-4 my-3">Countries</h1>
{}
<Query query={Countries_query}>
    {({loading, error, data})=>{
    if(loading ) return <h4>Loading...</h4>; 
    if (error) console.log(error); 
    return (
        <Fragment>
        {data.countries.map(country => (
          <CountryItem key={country.name} country={country} />
        ))}
      </Fragment>
    );
    }
    }

</Query>
        </Fragment>
    );
}
}
 export default Countries;