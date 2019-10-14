import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Help = props => {
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
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
      config: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    })
      .then(response => {
        return <Redirect to="/" />;
      })
      .catch(err => {
        // console.log(err);
        return <Redirect to="/home" />;
        // setMessage(
        //   'An error occured. Please try again or contact us for assistance.'
        // );
      });
  };

  let help;
  if (props.user.id) {
    help = (
      <div className="container">
        <h1>I'm authenticated help!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue
          molestie congue. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nulla laoreet justo ut ante laoreet sagittis. Morbi in arcu
          lobortis, molestie magna quis, scelerisque tellus. Sed mattis posuere
          dui eget laoreet. Aenean luctus augue id elit rhoncus, sit amet
          imperdiet sapien molestie. Quisque molestie mauris ut tempus mattis.
          Fusce a interdum nibh.
        </p>

        <p>
          Nam et magna nec justo congue dapibus. Maecenas fermentum sem nec ex
          ultrices, molestie maximus justo cursus. Mauris iaculis pellentesque
          urna, facilisis vulputate justo suscipit eget. Donec euismod, ligula
          nec laoreet fringilla, nunc tellus ornare quam, ac lacinia ipsum risus
          ut massa. In hac habitasse platea dictumst. Curabitur ultrices, eros
          et euismod venenatis, ipsum nisi egestas augue, eu tempus risus tellus
          sed nunc. Sed vestibulum pellentesque finibus. Nulla molestie nisi
          vitae justo ornare consectetur. Suspendisse eget velit quis est porta
          ornare non in tellus. Fusce at metus vel diam aliquet commodo ac eu
          mi. Etiam quis diam fringilla, sagittis nibh non, molestie massa. Sed
          turpis dolor, vestibulum id scelerisque at, sagittis et massa.
          Pellentesque nunc leo, porttitor eu aliquam non, egestas bibendum
          ligula. Pellentesque pretium, odio ut aliquam aliquet, risus diam
          tristique ligula, in rutrum orci ipsum in massa. Curabitur non urna
          magna.
        </p>

        <p>
          Maecenas nisl felis, lacinia non magna ut, rhoncus malesuada lectus.
          Vestibulum suscipit ullamcorper ante eu ornare. Cras sagittis vel
          risus sit amet luctus. Aliquam ultricies libero ut augue mollis
          ornare. Vivamus dictum et odio sit amet iaculis. Pellentesque non
          turpis ligula. Donec ipsum quam, bibendum eu euismod id, efficitur
          faucibus neque. Nunc condimentum velit metus, eget dictum felis
          convallis eu.
        </p>

        <p>
          Integer at lectus dictum, imperdiet nunc ac, consequat mauris. Ut
          convallis lobortis arcu, et lacinia mauris tristique sit amet.
          Suspendisse ut augue porttitor, porta tortor et, porttitor magna.
          Vestibulum vulputate eros nec odio pharetra iaculis ac eget sapien.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Cras imperdiet posuere tellus a faucibus. In
          ac facilisis dolor. Interdum et malesuada fames ac ante ipsum primis
          in faucibus. Proin at tempor augue. Praesent tristique vitae diam sed
          aliquet. Aliquam placerat velit at lectus facilisis maximus. Aliquam
          elementum lacinia porttitor. Donec nunc ante, pulvinar nec tellus
          eget, molestie convallis urna.
        </p>

        <p>
          Mauris posuere justo nec est faucibus tempus. Etiam dolor justo,
          imperdiet at nulla sed, tincidunt porttitor tortor. Nam porttitor ac
          diam ut ultricies. Sed ultricies dui eget diam gravida, id tincidunt
          lacus luctus. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Maecenas ullamcorper dolor ut
          massa varius condimentum. Sed mollis porttitor mauris. Aenean vel
          scelerisque est, vitae vulputate leo. Mauris porta faucibus justo, id
          ullamcorper libero interdum vel. Suspendisse potenti.
        </p>
      </div>
    );
  } else {
    help = (
      <div className="container">
        <h1>I'm UNauthenticated help!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue
          molestie congue. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Nulla laoreet justo ut ante laoreet sagittis. Morbi in arcu
          lobortis, molestie magna quis, scelerisque tellus. Sed mattis posuere
          dui eget laoreet. Aenean luctus augue id elit rhoncus, sit amet
          imperdiet sapien molestie. Quisque molestie mauris ut tempus mattis.
          Fusce a interdum nibh.
        </p>
      </div>
    );
  }

  if (redirect === true) {
    return <Redirect to="/help" />;
  } else {
    return (
      <div>
        <div>{help}</div>
        <hr />
        <div className="container form-container">
          <span className="red">{message}</span>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nameInput">
              <Form.Label>Your Name:</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="First and Last Name"
                defaultValue={props.user.firstname}
              />
            </Form.Group>
            <Form.Group controlId="emailInput">
              <Form.Label>Your Email Address:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                defaultValue={props.user.email}
              />
            </Form.Group>
            <Form.Group controlId="messageInput">
              <Form.Label>Help Request:</Form.Label>
              <Form.Control
                name="content"
                as="textarea"
                rows="4"
                placeholder="Message"
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
};

export default Help;
