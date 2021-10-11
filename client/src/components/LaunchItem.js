import React from 'react';                 //imports system defined react api
import Moment from 'react-moment';         //imports system defined react api to format time and dipslay ite
import { Link } from 'react-router-dom';   //imports system defined react Links api
import './LaunchItem.css'                  //imports custom css file
import classNames from 'classnames';       //system defined node module for conditionally applying bootstrap classNames .

export default function LaunchItem({      //custom functional component
  launch: { flight_number, mission_name, launch_date_local, launch_success }  //defined custom object to store data passed 
}) {
  return (  //data bind to the launch data passed to this component by LaunchItem component
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Mission:
            <span
              className={classNames({ //Bootstrap styling
                'text-success': launch_success,
                'text-warning': !launch_success
              })}
            >
              {mission_name}
            </span>
          </h4>
          <p>
            Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>  {/* react api to format  time & display it */}
          </p>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">  {/*Calls the Launch Component and passes a flight numer to it */}
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}
