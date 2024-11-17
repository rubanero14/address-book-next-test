"use client";
import { memo, useState, useEffect } from "react";

function Home() {
  // CRUD NAME, EMAIL, PHONE FIELDS
  const [address, setAddress] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      default:
        return;
    }
  };

  // Create
  const createAddress = (e) => {
    e.preventDefault();
    if (address) {
      setAddress([
        ...address,
        {
          id: new Date(),
          name: name,
          email: email,
          phone: phone,
        },
      ]);
      localStorage.setItem(
        "address-book",
        JSON.stringify([
          ...address,
          {
            id: new Date(),
            name: name,
            email: email,
            phone: phone,
          },
        ])
      );
    } else {
      setAddress([
        {
          id: new Date(),
          name: name,
          email: email,
          phone: phone,
        },
      ]);
      localStorage.setItem(
        "address-book",
        JSON.stringify([
          {
            id: new Date(),
            name: name,
            email: email,
            phone: phone,
          },
        ])
      );
    }
    console.log(address);

    getAddress();
  };

  // Read
  const getAddress = () => {
    const data = localStorage.getItem("address-book");
    if (data !== undefined || data.length > 0) {
      setAddress([...JSON.parse(data)]);
    }
  };

  // Update
  const updateAddress = (id) => {
    e.preventDefault();
    address.map((add) => {
      if (id === add.id) {
        setAddress(
          ...(prev) => [
            ...prev,
            {
              [add.name]: name,
              [add.email]: email,
              [add.phone]: phone,
            },
          ]
        );
        localStorage.setItem(
          "address-book",
          JSON.stringify(...address, {
            [add.name]: name,
            [add.email]: email,
            [add.phone]: phone,
          })
        );
      }
    });

    getAddress();
  };

  // Delete
  const deleteAddress = (id) => {
    e.preventDefault();
    setAddress(...address.filter((add) => add.id !== id));

    localStorage.setItem(
      "address-book",
      JSON.stringify(...address.filter((add) => add.id !== id))
    );
    getAddress();
  };

  useEffect(() => getAddress(), []);
  console.log(address);
  return (
    <main className="d-flex align-items-center justify-content-center flex-column py-5 px-3">
      <div className="card text-center mb-3 p-3">
        <h3 className="text-secondary title">Create New Address</h3>
        <form onSubmit={createAddress}>
          <input
            type="text"
            placeholder="Enter name.."
            className="form-control mb-1"
            name="name"
            onChange={(e) => changeHandler(e)}
          />
          <input
            type="email"
            placeholder="Enter email.."
            className="form-control mb-1"
            name="email"
            onChange={(e) => changeHandler(e)}
          />
          <input
            type="tel"
            placeholder="Enter phone number.."
            className="form-control mb-1"
            name="phone"
            onChange={(e) => changeHandler(e)}
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-secondary w-100"
          />
        </form>
      </div>
      {address && address.length > 0 && (
        <div className="card text-center p-3">
          <h3 className="text-secondary title">Addresses</h3>
          <ul>
            {address &&
              address.map((add) => (
                <li key={add.id}>
                  Name: {add.name} \n Email: {add.email} \n Phone: {add.phone}
                </li>
              ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default memo(Home);
