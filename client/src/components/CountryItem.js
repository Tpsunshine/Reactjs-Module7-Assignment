import React from 'react';                 //imports system defined react api
        //imports system defined react api to format time and dipslay ite
import { Link } from 'react-router-dom';   //imports system defined react Links api
import './CountryItem.css'                  //imports custom css file
      //system defined node module for conditionally applying bootstrap classNames .

export default function CountryItem({      //custom functional component
  country: { name, native, currency, languages:{code,nameL} }  //defined custom object to store data passed 
}) {
  return (  //data bind to the launch data passed to this component by LaunchItem component
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Country:
         
              {name}
        
          </h4>
          <p>
            native: {native}  {/* react api to format  time & display it */}
          </p>
        </div>
        <div className="col-md-3">
          <Link to={`/country/${name}`} className="btn btn-secondary">  {/*Calls the Launch Component and passes a flight numer to it */}
            country Details
          </Link>
        </div>
      </div>
    </div>
  );
}
