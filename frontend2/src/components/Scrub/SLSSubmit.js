import React, { useState } from 'react';
import ReactTable from 'react-table';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import convertArrayToCSV from 'convert-array-to-csv';
import Button from 'react-bootstrap/Button'


import 'react-table/react-table.css';
// import ReactDOM from 'react-dom';

const SLSSubmit = props => {
  const [leads, setLeads] = useState([]);

  const [phone, setPhone] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');

  const onChange = e => {
    // console.log(e.target.name);
    switch (e.target.name) {
      case 'phone':
        setPhone(e.target.value);
        // console.log(phone);
        break;
      case 'lastname':
        setLastname(e.target.value);
        // console.log(lastname);
        break;
      case 'address':
        setAddress(e.target.value);
        // console.log(address);
        break;
      case 'zip':
        setZip(e.target.value);
        // console.log(zip);
        break;
      default:
      // code block
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const csv = convertArrayToCSV(leads);


    let body = new URLSearchParams();
    body.append('name', 'System');
    body.append('email', 'dns@strofina.com');
    body.append('content', csv);
    body.append('subject', 'Lead Scrub Request');

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
        let t = [];
        setLeads(t);
        return <Redirect to="/" />;
      })
      .catch(err => {
        let t = [];
        setLeads(t);
        return <Redirect to="/home" />;

      });
  };

  const handleAdd = e => {
    e.preventDefault();

    let newLead = {
      phone: phone,
      lastname: lastname,
      address: address,
      zip: zip,
    };

    let t = [...leads, newLead];
    setLeads(t);

    setPhone('');
    setAddress('');
    setLastname('');
    setZip('');

    console.log(t);
  };

  const renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...leads];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          setLeads(data);
        }}
        dangerouslySetInnerHTML={{
          __html: leads[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  };

  const columns = [
    {
      Header: 'Phone',
      accessor: 'phone',
      Cell: renderEditable,
    },
    {
      Header: 'Last Name',
      accessor: 'lastname',
      Cell: renderEditable,
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: renderEditable,
    },
    {
      Header: 'Zip',
      accessor: 'zip',
      Cell: renderEditable,
    },
    {
      Header: 'Remove',
      accessor: 'delete',
      Cell: row => (
        <span
          onClick={() => {
            let data = [...leads];
            data.splice(row.index, 1);
            setLeads(data);
          }}
        >
          X
        </span>
      ),
    },
  ];

  return (
    <div className="container form-container">
    <p>Please enter up to 10 leads to scrub. Your results will be emailed to you shortly.</p>
    <hr/>
      <form onSubmit={handleAdd}>
        <input
          className="add-lead"
          type="text"
          name="phone"
          value={phone || ''}
          placeholder="Phone"
          onChange={onChange}
        />
        <input
          className="add-lead"
          type="text"
          name="lastname"
          value={lastname || ''}
          placeholder="Last Name"
          onChange={onChange}
        />
        <input
          className="add-lead"
          type="text"
          name="address"
          value={address || ''}
          placeholder="Address"
          onChange={onChange}
        />
        <input
          className="add-lead"
          type="number"
          name="zip"
          value={zip || ''}
          placeholder="Zip"
          onChange={onChange}
        />

        <Button className="btn btn-secondary" type="submit">Add</Button>
      </form>

      {/* <hr /> */}
      <div className="table-wrapper">
        <ReactTable
          id="lead-table"
          data={leads}
          columns={columns}
          defaultPageSize={10}
          minRows={1}
          showPagination={false}
          classNameName="-striped -highlight"
        />
      </div>
      <Button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default SLSSubmit;
