import React, { useState } from 'react';

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

  const onSubmit = e => {
    e.preventDefault();

    let newLead = [phone, lastname, address, zip];

    let t = [...leads, newLead];
    setLeads(t);

    setPhone('');
    setAddress('');
    setLastname('');
    setZip('');

    console.log(t);
  };

  const List = () => (
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Phone</th>
          <th scope="col">Last Name</th>
          <th scope="col">Address</th>
          <th scope="col">Zip</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead, idx) => (
          <tr>
            <th scope="row">X</th>
            <td>{lead[0]}</td>
            <td>{lead[1]}</td>
            <td>{lead[2]}</td>
            <td>{lead[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <input value={phone} onChange={onChange} /> */}

        <input
          type="text"
          name="phone"
          value={phone}
          placeholder="Phone"
          onChange={onChange}
        />
        <input
          type="text"
          name="lastname"
          value={lastname}
          placeholder="Last Name"
          onChange={onChange}
        />
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Address"
          onChange={onChange}
        />
        <input
          type="number"
          name="zip"
          value={zip}
          placeholder="Zip"
          onChange={onChange}
        />

        <button>Add</button>
      </form>
      <hr />
      <List />
    </div>
  );
};

export default SLSSubmit;
