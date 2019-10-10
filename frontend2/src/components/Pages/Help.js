import React from 'react';

const Help = props => {
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
        <p>I'm UNauthenticated help...</p>
      </div>
    );
  }

  return <div>{help}</div>;
};

export default Help;
