export default function AddressList({ add, deleteAdd, children }) {
  return (
    <li className="card" key={add.id}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-12">Name: {add.name}</div>
            <div className="col-12">Email: {add.email}</div>
            <div className="col-12">Phone: {add.phone}</div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex align-items-center justify-content-center h-100">
            {children}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteAdd(add.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
