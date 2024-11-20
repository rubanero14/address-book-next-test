export default function AddressList({ add, deleteAdd, children }) {
  return (
    <li className="card address-list" key={add.id}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-12 text-start ms-2 my-2">
              <i className="bi bi-person-circle"></i> {add.name}
            </div>
            <div className="col-12 text-start ms-2 mb-2">
              <i className="bi bi-envelope-heart"></i> {add.email}
            </div>
            <div className="col-12 text-start ms-2 mb-2">
              <i className="bi bi-telephone"></i> {add.phone}
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex m-auto align-items-center justify-content-center h-100">
            {children}
            <button
              className="btn btn-sm btn-danger d-flex"
              onClick={() => deleteAdd(add.id)}
            >
              <i className="bi bi-trash me-md-1"></i>
              <span className="d-none d-md-block">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
