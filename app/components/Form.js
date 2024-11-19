import { useState } from "react";

export default function Form({
  name,
  email,
  phone,
  submitHandler,
  changeHandler,
  handleClose,
}) {
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    changeHandler(e);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formValidated =
      formData.name !== undefined &&
      formData.email !== undefined &&
      formData.phone !== undefined &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.phone !== "";
    if (formValidated) {
      setError(false);
      submitHandler();
      setFormData({ name: "", email: "", phone: "" });
      handleClose();
    } else {
      setError(true);
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        placeholder="Enter name.."
        className="form-control mb-1"
        name="name"
        onChange={(e) => onChange(e)}
        value={formData.name}
      />
      <input
        type="email"
        placeholder="Enter email.."
        className="form-control mb-1"
        name="email"
        onChange={(e) => onChange(e)}
        value={formData.email}
      />
      <input
        type="tel"
        placeholder="Enter phone number.."
        className="form-control mb-1"
        name="phone"
        onChange={(e) => onChange(e)}
        value={formData.phone}
      />
      {error && (
        <p className="text-danger mb-2">Please ensure all fields are filled!</p>
      )}
      <input
        type="submit"
        value={name ? "Update" : "Submit"}
        className="btn btn-success w-100 mb-1"
      />
      <button
        type="button"
        className="btn btn-secondary w-100"
        onClick={handleClose}
      >
        Close
      </button>
    </form>
  );
}
