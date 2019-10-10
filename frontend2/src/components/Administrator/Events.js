import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../constants';

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
          let t = [];
          t.id = r.id;
          t.data = r.data;
          t.updatedAt = r.updatedAt;
          t.type = r.type;
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

  let eventsDiv;

  if (eventsReceived === true) {
    // console.log(`events: ${events}`);
    eventsDiv = events.map((e, idx) => (
      <div>
        <p key={idx}>
          {e.updatedAt}, {e.user}, {e.type}, {e.data}
        </p>
      </div>
    ));
    // console.log(eventsDiv);
  }

  return (
    <div>
      <h1>Application Events</h1>
      <span className="red">{message}</span>
      <ul>{eventsDiv}</ul>
    </div>
  );
};

export default Events;
