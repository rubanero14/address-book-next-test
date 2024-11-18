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

  const handleCreateClose = () => {
    setOpenCreateModal(false);
  };

  const handleCreateOpen = () => {
    setOpenCreateModal(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateOpen = () => {
    setOpenUpdateModal(true);
  };

  useEffect(() => getAddress(), []);
  // console.log(showCreate);
  return (
    <main className="d-flex align-items-center justify-content-center flex-column py-5 px-3">
      <button className="btn btn-secondary" onClick={handleCreateOpen}>
        Create New Address
      </button>
      {openCreateModal && (
        <Modal isOpen={openCreateModal}>
          <div className="text-center">
            <h3 className="text-secondary title">Create New Address</h3>
            <Form
              onSubmit={createAddress}
              handleClose={handleCreateClose}
              submitHandler={createAddress}
              changeHandler={changeHandler}
            />
          </div>
        </Modal>
      )}
      <hr />
      {address && address.length > 0 && (
        <div className="card text-center p-3">
          <h3 className="text-secondary title">Addresses</h3>
          <ul>
            {address &&
              address.map((add) => (
                <>
                  <AddressList add={add} key={add.id}>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={handleUpdateOpen}
                    >
                      Edit
                    </button>
                  </AddressList>
                  {openUpdateModal && (
                    <Modal isOpen={openUpdateModal}>
                      <div className="text-center">
                        <h3 className="text-secondary title">
                          Update New Address
                        </h3>
                        <Form
                          onSubmit={updateAddress}
                          handleClose={handleUpdateClose}
                          submitHandler={updateAddress}
                          changeHandler={changeHandler}
                          name={add.name}
                          email={add.email}
                          phone={add.phone}
                        />
                      </div>
                    </Modal>
                  )}
                </>
              ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default memo(Home);
