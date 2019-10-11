import React from 'react';
import SLSSubmit from '../Scrub/SLSSubmit';

const Home = props => {
  if (!props.user.id) {
    return <p>I'm unathenticated home.</p>;
  } else {
    return (
      <div>
        <SLSSubmit user={props.user} />
      </div>
    );
  }
};

export default Home;
