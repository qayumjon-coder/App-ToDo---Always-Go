function Header({
  isMobile,
  taskInput,
  setTaskInput,
  handleAddTask,
  draggingId,
  handleDragOver,
  handleDropToTrash,
  setShowModal,
}) {
  return (
    <div className="header">
      {!isMobile && (
        <button
          className="darkModeBtn"
          onClick={() => document.body.classList.toggle("dark-mode")}
          aria-label="Toggle Dark Mode"
        >
          <i className="fa-solid fa-moon"></i>
        </button>
      )}

      <div className="headerContent">
        <h1 className="title">My Tasks</h1>
        <form className="addForm" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add new Task"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            required
            className="taskInput"
            aria-label="Yangi vazifa"
          />
          <button type="submit">Add</button>
        </form>
      </div>

      {!isMobile && (
        <button
          className={`deleteAllButton ${draggingId ? "drag-active" : ""}`}
          onDragOver={handleDragOver}
          onDrop={handleDropToTrash}
          onClick={() => setShowModal(true)}
          aria-label="Delete All Tasks"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      )}
    </div>
  );
}

export default Header;
