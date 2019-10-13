import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ReactDOM from 'react-dom';

const SLSSubmit = props => {
  const [leads, setLeads] = useState([]);
  const [flipOnLeadsUpdated, setFlipOnLeadsUpdated] = useState(false);

  // useEffect(() => {

  // }, [])

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

  function handleRemove(row) {
    let data = leads;
    console.log('Data Before Splice:', data);
    data.splice(row.index, 1);
    console.log('Data After Splice:', data);
    setLeads(data);
    console.log('Leads, after setLeads(data):', leads);
  }

  // const updateStateData = id => {
  //   let item = data.find(item => item.id == id);
  //   item.name += " updated 1";
  //   updateData(data);
  // };

  // function updateStateData(id){
  //   return data.map(item => {
  //     if(item.id !== id) return item
  //     return {...item, name: item.name + ' updated'}
  //   })
  // }

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
            let data = leads;
            console.log('Data Before Splice:', data);
            data.splice(row.index, 1);
            setLeads(data);

            console.log('"leads", after setLeads(data):', leads);
          }}
        >
          X
        </span>
      ),
    },
  ];

  return (
    <div class="contain form-container">
      <form onSubmit={handleAdd}>
        {/* <input value={phone} onChange={onChange} /> */}

        <input
          class="add-lead"
          type="text"
          name="phone"
          value={phone}
          placeholder="Phone"
          onChange={onChange}
        />
        <input
          class="add-lead"
          type="text"
          name="lastname"
          value={lastname}
          placeholder="Last Name"
          onChange={onChange}
        />
        <input
          class="add-lead"
          type="text"
          name="address"
          value={address}
          placeholder="Address"
          onChange={onChange}
        />
        <input
          class="add-lead"
          type="number"
          name="zip"
          value={zip}
          placeholder="Zip"
          onChange={onChange}
        />

        <button>Add</button>
      </form>
      {/* <hr /> */}
      <div class="table-wrapper">
        <ReactTable
          id="lead-table"
          data={leads}
          columns={columns}
          defaultPageSize={10}
          minRows={1}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
      <button class="btn btn-primary">Submit</button>
    </div>
  );
};

export default SLSSubmit;
