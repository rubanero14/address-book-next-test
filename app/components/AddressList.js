import { Children } from "react";

export default function AddressList({ add, children }) {
  return (
    <li className="card">
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
            <button className="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </li>
  );
}
