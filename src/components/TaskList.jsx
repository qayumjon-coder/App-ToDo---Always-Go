import TaskItem from "./TaskItem";

function TaskList({
  tasks,
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
  handleMarkAllCompleted,
}) {
  return (
    <div className="taskList">
      <div className="taskHeader">
        <h2 className="taskTitle">List of Tasks</h2>
        {!isMobile && (
          <div className="taskItemTitles">
            <label style={{ display: "flex", alignItems: "center", gap: "1px" }}>
              <input
                type="checkbox"
                className="completeInput"
                checked={tasks.length > 0 && tasks.every(t => t.completed)}
                onChange={handleMarkAllCompleted}
                aria-label="Mark All Completed"
              />
              Status
            </label>
            <p>Task</p>
            <p>Action</p>
          </div>
        )}
      </div>

      <ol className="taskCover">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            isMobile={isMobile}
            draggingId={draggingId}
            dropTargetId={dropTargetId}
            editingTaskId={editingTaskId}
            editedTitle={editedTitle}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            handleDrop={handleDrop}
            handleToggleTask={handleToggleTask}
            handleSaveEdit={handleSaveEdit}
            handleKeyDown={handleKeyDown}
            setEditedTitle={setEditedTitle}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleShowActions={handleShowActions}
          />
        ))}
      </ol>
    </div>
  );
}

export default TaskList;
