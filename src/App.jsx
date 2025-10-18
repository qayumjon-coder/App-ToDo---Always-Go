import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import MobileNav from "./components/MobileNav";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [taskInput, setTaskInput] = useState("");
  const dragTaskIndex = useRef(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // CRUD & actions
  const handleAddTask = (e) => {
    e.preventDefault();
    const title = taskInput.trim();
    if (!title) return;
    setTasks(prev => [...prev, { id: Date.now(), title, completed: false }]);
    setTaskInput("");
  };

  const handleDeleteTask = (id) =>
    setTasks(prev => prev.filter(task => task.id !== id));

  const handleDeleteCompletedTasks = () => {
    const confirmed = window.confirm(
      "Barcha tugatilgan vazifalarni o'chirishga ishonchingiz komilmi?"
    );
    if (confirmed) {
      setTasks(prev => prev.filter(t => !t.completed));
      setShowModal(false);
    }
  };

  const handleToggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleMarkAllCompleted = () => {
    const allCompleted = tasks.every(t => t.completed);
    setTasks(prev => prev.map(t => ({ ...t, completed: !allCompleted })));
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) return;
    setTasks(prev =>
      prev.map(t =>
        t.id === editingTaskId ? { ...t, title: editedTitle.trim() } : t
      )
    );
    setEditingTaskId(null);
    setEditedTitle("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  const handleShowActions = (e) => {
    const actions = e.currentTarget.parentElement.querySelector(".actions");
    actions?.classList.toggle("showActions");
  };

  // Drag & Drop
  const handleDragStart = (index, id) => {
    if (isMobile) return;
    dragTaskIndex.current = index;
    setDraggingId(id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (isMobile) return;
    if (draggingId !== id) setDropTargetId(id);
  };

  const handleDragEnd = () => {
    if (isMobile) return;
    setDraggingId(null);
    setDropTargetId(null);
  };

  const handleDrop = (dropIndex, id) => {
    if (isMobile) return;
    const dragIndex = dragTaskIndex.current;
    if (dragIndex === null || dragIndex === dropIndex) return;

    setTasks(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(dragIndex, 1);
      copy.splice(dropIndex, 0, moved);
      return copy;
    });
    setDropTargetId(null);
  };

  const handleDropToTrash = (e) => {
    e.preventDefault();
    if (isMobile) return;
    const dragIndex = dragTaskIndex.current;
    if (dragIndex === null) return;
    setTasks(prev => {
      const copy = [...prev];
      copy.splice(dragIndex, 1);
      return copy;
    });
    dragTaskIndex.current = null;
  };

  return (
    <>
      <Header
        isMobile={isMobile}
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        handleAddTask={handleAddTask}
        draggingId={draggingId}
        handleDragOver={handleDragOver}
        handleDropToTrash={handleDropToTrash}
        setShowModal={setShowModal}
      />

      <TaskList
        tasks={tasks}
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
        handleMarkAllCompleted={handleMarkAllCompleted}
      />

      {isMobile && (
        <MobileNav
          handleMarkAllCompleted={handleMarkAllCompleted}
          setShowModal={setShowModal}
        />
      )}

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setTasks([]);
          setShowModal(false);
        }}
        onDeleteCompleted={handleDeleteCompletedTasks}
        isMobile={isMobile}
      />
    </>
  );
}

export default App;