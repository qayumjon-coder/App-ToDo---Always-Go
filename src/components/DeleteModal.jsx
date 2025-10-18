import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

export default function DeleteModal({ isOpen, onClose, onConfirm, onDeleteCompleted }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // fon bosilganda ham modal yopilsin
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()} // modal ichidagi bosish fon yopilishini oldini oladi
          >
            <h2>Do you delete all?</h2>
            <p>Do you really want to delete all tasks? This action cannot be undone.</p>
            
            {onDeleteCompleted && (
              <button
                type="button"
                className="delete-completed-btn"
                onClick={onDeleteCompleted}
              >
                Delete all, completed
              </button>
            )}

            <div className="modal-buttons">
              <button type="button" className="confirm-btn" onClick={onConfirm}>
                Confirm
              </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
