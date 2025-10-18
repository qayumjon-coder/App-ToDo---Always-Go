function TaskItem({
  task,
  index,
  isMobile,
  draggingId,
  dropTargetId,
  editingTaskId,
  editedTitle,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  handleToggleTask,
  handleSaveEdit,
  handleKeyDown,
  setEditedTitle,
  handleEditTask,
  handleDeleteTask,
  handleShowActions,
}) {
  return (
    <li
      className={`taskItem ${task.completed ? "completed" : ""} ${
        draggingId === task.id ? "dragging" : ""
      } ${dropTargetId === task.id ? "drop-target" : ""}`}
      draggable={!isMobile}
      onDragStart={() => handleDragStart(index, task.id)}
      onDragOver={e => handleDragOver(e, task.id)}
      onDragEnd={handleDragEnd}
      onDrop={() => handleDrop(index, task.id)}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleTask(task.id)}
        className="completeInput"
        aria-label={`Mark task "${task.title}" completed`}
      />

      {editingTaskId === task.id ? (
        <input
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          className="taskInputEdit"
          aria-label="Edit task title"
        />
      ) : (
        <span className="taskName">{task.title}</span>
      )}

      <button
        onClick={handleShowActions}
        className="taskActions"
        aria-label="Task actions"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>

        <div className={`actions ${isMobile ? "mobile-actions" : ""}`}>
          <div className="gr_acts">
            <a onClick={() => handleEditTask(task)} aria-label="Taxrirlash">
              <i className="fa-solid fa-pen"></i>
            </a>
            <a
              onClick={() => handleDeleteTask(task.id)}
              aria-label="O'chirish"
            >
              <i className="fa-solid fa-trash"></i>
            </a>
          </div>
        </div>
      </button>
    </li>
  );
}

export default TaskItem;
