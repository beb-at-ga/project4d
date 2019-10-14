import React from 'react';
import { Redirect } from 'react-router-dom';

import Events from '../Administrator/Events';
import Dashboard from '../Administrator/Dashboard';
import Users from '../Administrator/Users';
import Settings from '../Administrator/Settings';


// import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';


const Admin = props => {
  if (!props.user.id) {
    return <Redirect to="/" />;
  }

  if (props.user.id && props.user.isAdmin === false) {
    return (
      <div>
        <p>{props.user.firstname} is not an admin.</p>
        <p>Unauthorized access denied.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <Tab.Container
        className="left-tabs"
        id="left-tabs"
        defaultActiveKey="dashboard"
      >
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="users">Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings">Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="events">Event Log</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
                <Dashboard user={props.user} />
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                <Users user={props.user} />
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
                <Settings user={props.user} />
              </Tab.Pane>
              <Tab.Pane eventKey="events">
                <Events user={props.user} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Admin;
