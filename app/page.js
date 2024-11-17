"use client";
import { useState } from "react";

export default function Home() {
  // CRUD NAME, EMAIL, PHONE FIELDS
  const [address, setAddress] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // useEffect(() => {}, []);

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
        break;
    }
    console.log(name, email, phone);
  };

  // Create
  const createAddress = (e) => {
    e.preventDefault();
    setAddress((prev) => [
      ...prev,
      {
        id: address.length + 1,
        name: name,
        email: email,
        phone: phone,
      },
    ]);
    localStorage.setItem("address-book", JSON.stringify(address));
    getAddress();
  };

  // Read
  const getAddress = () => {
    e.preventDefault();
    setAddress(JSON.parse(localStorage.getItem("address-book")));
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
      }
    });

    localStorage.setItem("address-book", JSON.stringify(address));
    getAddress();
  };

  // Delete
  const deleteAddress = (id) => {
    e.preventDefault();
    setAddress(...address.filter((add) => add.id !== id));

    localStorage.setItem("address-book", JSON.stringify(address));
    getAddress();
  };
  return (
    <main className="d-flex align-items-center justify-content-center py-5 px-3">
      <div className="card text-center p-3">
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
    </main>
  );
}
