import React, { Component, Fragment } from 'react';  //imports system defined React API
import gql from 'graphql-tag';                       //imports system defined graphQL api
import { Query } from 'react-apollo';                //imports system defined  client apollo api that calls GraphQL 
import { Link } from 'react-router-dom';            //imports system defined React API
import classNames from 'classnames';               //system defined node module for conditionally applying bootstrap classNames .


//client side query strcuture to retreive data from GrpahQl at the server end
//We need to get launch data for a specific flight number
const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params; //retreive the dynamic url route 
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
         {/*fire the above defined query structure & pass query parameter 
           Promise returns processing notification, data on success or error
           Display Loading until Data Arrives via GraphQL from the REST API 
           If error display error info
           Fragment avoids DOM node creation like nested <div>, Improves performance of rendering views 
           map() function iterates over evey launch data record
          passed individual rrecords to LaunchItem
        
        */}   
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            const {                       //Launch record retreived for speciifc fligh number stored in this object
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type }
            } = data.launch;

            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="text-light">Mission:</span> {mission_name}
                </h1>
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Flight Number: {flight_number}
                  </li>
                  <li className="list-group-item">
                    Launch Year: {launch_year}
                  </li>
                  <li className="list-group-item">
                    Launch Successful:{' '}
                    <span
                      className={classNames({
                        'text-success': launch_success,
                        'text-danger': !launch_success
                      })}
                    >
                      {launch_success ? 'Yes' : 'No'}
                    </span>
                  </li>
                </ul>

                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket ID: {rocket_id}</li>
                  <li className="list-group-item">
                    Rocket Name: {rocket_name}
                  </li>
                  <li className="list-group-item">
                    Rocket Type: {rocket_type}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launch;
