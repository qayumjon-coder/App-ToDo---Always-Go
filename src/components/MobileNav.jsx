function MobileNav({ handleMarkAllCompleted, setShowModal }) {
  return (
    <div className="mobile-nav">
      <button
        className="mobile-nav-btn"
        onClick={() => document.body.classList.toggle("dark-mode")}
        aria-label="Toggle Dark Mode"
      >
        <i className="fa-solid fa-moon" style={{ boxShadow: "none" }}></i>
      </button>

      <button
        className="mobile-nav-btn mark-all-btn"
        onClick={handleMarkAllCompleted}
        aria-label="Mark All Completed"
      >
        <i className="fa-solid fa-check-double"></i>
      </button>

      <button
        className="mobile-nav-btn delete-btn"
        onClick={() => setShowModal(true)}
        aria-label="Delete Completed Tasks"
      >
        <i className="fa-solid fa-trash-can" style={{ boxShadow: "none" }}></i>
      </button>
    </div>
  );
}

export default MobileNav;
