import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../constants';
import ReactTable from 'react-table';
// import 'react-table/react-table.css';

let events = [];

const Events = props => {
  const [message, setMessage] = useState('');
  const [eventsReceived, setEventsReveived] = useState(false);

  useEffect(() => {
    if (eventsReceived === false) {
      getEvents();
    }
    // eslint-disable-next-line
  }, [eventsReceived]);

  const getEvents = () => {
    let token = localStorage.getItem('authToken');

    // console.log(`token found: ${token}`)
    axios
      .get(`${BASE_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response);

        response.data.forEach(r => {
          let t = { 
            eventId: r.id,
            eventData: r.data,
            updatedAt: r.updatedAt,
            eventType: r.type
          }

          if (r.user) {
            t.user = r.user.email;
          } else {
            t.user = 'anon';
          }
        
          events.push(t);
        });

        setEventsReveived(true);
      })
      .catch(err => {
        console.log(err);
        setMessage(
          'An error occured. Please try again or contact us for assistance.'
        );
      });
  };

  const columns = [
    {
      Header: 'Event ID',
      accessor: 'eventId',
    },
    {
      Header: 'Time',
      accessor: 'updatedAt',
    },
    {
      Header: 'Event Type',
      accessor: 'eventType',
    },
    {
      Header: 'User',
      accessor: 'user',
    },
    {
      Header: 'Event Data',
      accessor: 'eventData',
    },
  ];


  let eventsDiv;

  if (eventsReceived === true) {
    return ( 
      <ReactTable data={events} columns={columns} defaultPageSize={15}/>
    )

  }

  return (
    <div>
      <h1>Application Events</h1>
      <span className="red">{message}</span>
      <div>{eventsDiv}</div>
    </div>
  );
};

export default Events;
