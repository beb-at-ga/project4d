import React from 'react';

const Home = props => {
  if (!props.user.id) {
    return <p>I'm unathenticated home.</p>;
  } else {
    return <p>I'm authenticated home.</p>;
  }
};

export default Home;
