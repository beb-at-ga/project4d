import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Help = props => {
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();


    let body = new URLSearchParams();
    body.append('name', e.target.name.value);
    body.append('email', e.target.email.value);
    body.append('content', e.target.content.value);
    body.append('subject', 'Help Request from SLS');

    const EMAIL_ENDPOINT =
      'https://6svshijol0.execute-api.us-east-1.amazonaws.com/dev/email/send/formencoded/';

    axios({
      method: 'post',
      url: EMAIL_ENDPOINT,
      data: body,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    })
      .then(response => {

      })
      .catch(err => {
        // console.log(err);
        setRedirect(true);
        // setMessage(
        //   'An error occured. Please try again or contact us for assistance.'
        // );
      });
  };

  let help;
  if (props.user.id) {
    help = (
      <div>
        <p>I'm authenticated help...</p>
      </div>
    );
  } else {
    help = (
      <div>
        <p>I'm un_authenticated help...</p>
      </div>
    );
  }

  if (redirect === true) {
    return <Redirect to="/help" />;
  } else {
    return (
      <div>
        <div>{help}</div>
        <div>
          <span className="red">{message}</span>
          <form id="contactForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              required
            ></input>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              id="email"
            ></input>
            <label>Message</label>
            <textarea
              rows="5"
              placeholder="Message"
              name="content"
              required
              id="content"
            ></textarea>
            {/* <div id="toast"></div> */}
            <button type="submit" id="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Help;
