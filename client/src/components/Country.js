import React, {Component, Fragment} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';


const Country_query = gql`
query CountryQuery($name:String!)
{
    country(name: $name){
    name
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
export class Country extends Component{
    render(){
        let {name}= this.props.match.params;
    return (
        <Fragment>
            <Query query={Country_query} variables={{name}}>
                {({loading,error,data})=>
                {
                    if(loading) return <h4>Loading...</h4>
                    if(error) console.log(error);
                    const{
                        name,
                        native,
                        emoji,
                        currency,
                        languages:{
                            code,
                            nameL
                        }
                    }=data.country;
                    return (
                        <div>
                          <h1 className="display-4 my-3">
                  <span className="text-light">Country:</span> {name}
                </h1>
                <h4 className="mb-3">Country Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    name: {name}
                  </li>
                  <li className="list-group-item">
                    native: {native}
                  </li>
                  <li className="list-group-item">
                    Currency:{currency}
                 
                  </li>
                </ul>

                <h4 className="my-3">Language Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Code: {code}</li>
                  <li className="list-group-item">
                    name: {nameL}
                  </li>
                  </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>  
                        </div>
                    );
                }              
                }
            </Query>
        </Fragment>
    );
    }
}

export default Country;