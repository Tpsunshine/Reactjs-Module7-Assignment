import React, { Component, Fragment } from 'react';  //imports system defined React API
import gql from 'graphql-tag';                       //imports system defined graphQL api
import { Query } from 'react-apollo';                //imports system defined  client apollo api that calls GraphQL 
import LaunchItem from './LaunchItem';               //import user defined component


//client side query strcuture to retreive data via GraphQL from the RESt API
//We need to get all the launch data records via GraphQL from the RESP API
const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component { //custom class component
  render() {
    return (
      <Fragment>                                           {/*avoid Dom node creation like <div>, Improves performance of rendering views */}
        <h1 className="display-4 my-3">Launches</h1>
        {/*fire the above defined query structure & pass query parameter 
           //Promise returns processing notification, data on success or error*    
           //Display Loading until Data Arrives via GraphQL from the REST API 
           //If error display error info
        */}  
        
        <Query query={LAUNCHES_QUERY}>                     
          {({ loading, error, data }) => {                 
            if (loading) return <h4>Loading...</h4>;       
            if (error) console.log(error);                 

            return (
               /*Fragment avoids DOM node creation like nested <div>, Improves performance of rendering views 
                 map() function iterates over evey launch data record
                 passed individual rrecords to LaunchItem
              */
              <Fragment>
                {data.launches.map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;
