import { useState } from "react";
import styles from '../styles/TaskModal.module.scss';

const TaskModal = ({isOpen, onClose, onAdd}) =>{
    const [taskTitle, setTaskTitle] = useState('');

    const handleAddTask = () =>{
        if(taskTitle.trim()){
            onAdd(taskTitle);
            setTaskTitle('');
            onClose();
        }
    };
    if (!isOpen) return null;

    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Nova Tarefa</h2>
                <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Digite Sua tarefa"
                className={styles.inputField}
                />
                <div className={styles.actions}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleAddTask} className={styles.addButton}>Adicionar</button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;