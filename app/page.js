"use client";
import { memo, useState, useEffect } from "react";
import Modal from "./components/Modal";
import AddressList from "./components/AddressList";
import Form from "./components/Form";

function Home() {
  // CRUD NAME, EMAIL, PHONE FIELDS
  const [address, setAddress] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [form, setForm] = useState(null);

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
  const createAddress = () => {
    const newAddress = {
      id: new Date(),
      name: name,
      email: email,
      phone: phone,
    };
    if (address) {
      setAddress([...address, newAddress]);
      localStorage.setItem(
        "address-book",
        JSON.stringify([...address, newAddress])
      );
    } else {
      setAddress([newAddress]);
      localStorage.setItem("address-book", JSON.stringify([newAddress]));
    }

    getAddress();
  };

  // Read
  const getAddress = () => {
    let data;
    if (localStorage.getItem("address-book")) {
      data = localStorage.getItem("address-book");
      setAddress([...JSON.parse(data)]);
    } else {
      localStorage.setItem("address-book", JSON.stringify([]));
      setAddress([]);
    }
  };

  // Update
  const updateAddress = (id) => {
    address.map((add) => {
      if (id === add.id) {
        add.name = name;
        add.email = email;
        add.phone = phone;
      }
    });
    console.log(address);
    localStorage.setItem("address-book", JSON.stringify([...address]));

    getAddress();
  };

  // Delete
  const deleteAddress = (id) => {
    const newAdd = address.filter((add) => add.id !== id);
    setAddress(newAdd);
    localStorage.setItem("address-book", JSON.stringify(newAdd));
    getAddress();
  };

  const handleCreateClose = () => {
    setOpenCreateModal(false);
  };

  const handleCreateOpen = () => {
    setOpenCreateModal(true);
  };

  const handleUpdateClose = () => {
    setForm(null);
    setOpenUpdateModal(false);
  };

  const handleUpdateOpen = (add) => {
    setForm(add);
    setOpenUpdateModal(true);
  };

  useEffect(() => getAddress(), []);
  return (
    <main className="d-flex align-items-center justify-content-center flex-column py-5 px-3">
      <button className="btn btn-secondary" onClick={handleCreateOpen}>
        <i className="bi bi-file-plus"></i> Create New Address
      </button>
      {openCreateModal && (
        <Modal isOpen={openCreateModal}>
          <h3 className="text-secondary title">Create New Address</h3>
          <Form
            onSubmit={createAddress}
            handleClose={handleCreateClose}
            submitHandler={createAddress}
            changeHandler={changeHandler}
            actionType="create"
          />
        </Modal>
      )}
      <hr />
      {address && address.length > 0 ? (
        <div className="card text-center p-3">
          <h3 className="text-secondary title">Addresses</h3>
          <ul>
            {address &&
              address.map((add) => (
                <AddressList add={add} key={add.id} deleteAdd={deleteAddress}>
                  <button
                    className="btn btn-sm btn-primary me-1 d-flex"
                    onClick={() => handleUpdateOpen(add)}
                  >
                    <i className="bi bi-pen me-md-1"></i>
                    <span className="d-none d-md-block">Edit</span>
                  </button>
                </AddressList>
              ))}
          </ul>
          {openUpdateModal && (
            <Modal isOpen={openUpdateModal}>
              <h3 className="text-secondary title">Update Address</h3>
              <Form
                onSubmit={updateAddress}
                handleClose={handleUpdateClose}
                submitHandler={() => updateAddress(form.id)}
                changeHandler={changeHandler}
                name={form.name}
                email={form.email}
                phone={form.phone}
                actionType="update"
              />
            </Modal>
          )}
        </div>
      ) : (
        <h1 className="text-center">Nothing here. Please create new address</h1>
      )}
    </main>
  );
}

export default memo(Home);
