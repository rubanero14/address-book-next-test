export default function Form({
  name,
  email,
  phone,
  submitHandler,
  changeHandler,
  handleClose,
}) {
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter name.."
        className="form-control mb-1"
        name="name"
        onChange={(e) => changeHandler(e)}
        value={name}
      />
      <input
        type="email"
        placeholder="Enter email.."
        className="form-control mb-1"
        name="email"
        onChange={(e) => changeHandler(e)}
        value={email}
      />
      <input
        type="tel"
        placeholder="Enter phone number.."
        className="form-control mb-1"
        name="phone"
        onChange={(e) => changeHandler(e)}
        value={phone}
      />
      <input
        type="submit"
        value="Submit"
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
