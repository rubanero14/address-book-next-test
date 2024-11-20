export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="custom-modal d-flex align-items-center justify-content-center w-100 h-100"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-dialog bg-light m-auto p-3 text-center card p-3"
        style={{

          borderRadius: "10px",
        }}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
