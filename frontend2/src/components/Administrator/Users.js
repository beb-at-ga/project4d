import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import BASE_URL from '../../constants';
import 'react-table/react-table.css';



const Users = () => {
  const [usersReceived, setUsersReceived] = useState(false);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersReceived === false) {
      getUsers();
    }
    // eslint-disable-next-line
  }, [usersReceived]);

  const getUsers = () => {
    let token = localStorage.getItem('authToken');

    // console.log(`token found: ${token}`)
    axios
      .get(`${BASE_URL}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response);

        response.data.forEach(r => {
          let t = {
            email: r.email,
            firstname: r.firstname,
            lastname: r.lastname,
            phonenumber: r.phonenumber,
            agency_id: r.agency_id,
            agent_id: r.agent_id,
            isAdmin: r.isAdmin,
          };

          users.push(t);
        });

        setUsersReceived(true);
      })
      .catch(err => {
        console.log(err);
        setMessage(
          'An error occured. Please try again or contact us for assistance.'
        );
      });
  };


  const renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...users];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          setUsers(data);
        }}
        dangerouslySetInnerHTML={{
          __html: users[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  };



  const columns = [
    {
      Header: 'Phone',
      accessor: 'phonenumber',
      Cell: renderEditable,
    },
    {
      Header: 'First Name',
      accessor: 'firstname',
      Cell: renderEditable,
    },
    {
      Header: 'Last Name',
      accessor: 'lastname',
      Cell: renderEditable,
    },
    {
      Header: 'Agency ID',
      accessor: 'agency_id',
      Cell: renderEditable,
    },
    {
      Header: 'Agent ID',
      accessor: 'agent_id',
      Cell: renderEditable,
    },
    {
      Header: 'Is Admin',
      accessor: 'isAdmin',
      Cell: renderEditable,
    },
    {
      Header: 'Remove',
      accessor: 'delete',
      Cell: row => (
        <span
          onClick={() => {
            let data = users;
            console.log('Data Before Splice:', data);
            data.splice(row.index, 1);
            setUsers(data);

            console.log('"users", after setUsers(data):', users);
          }}
        >
          X
        </span>
      ),
    },
  ];



  let usersDiv;

  if (usersReceived === true) {
    return ( 
      <ReactTable data={users} columns={columns} defaultPageSize={12}/>
    )
  }

  return (

    <div>
      <h1>Application Events</h1>
      <span className="red">{message}</span>
      <div>{usersDiv}</div>
      <button className="btn btn-primary">Submit</button>
    </div>
  );
};

export default Users;
