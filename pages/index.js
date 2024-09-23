import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TaskModal from '../components/TaskModal';
import styles from '../styles/Home.module.scss';

export default function Home() {
    const [task, setTask] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const addTask = (title) => {
        const newTask = { id: Date.now(), title, completed: false };
        setTask([...task, newTask]);
    };

    const toggleTaskCompletion = (taskId) => {
        setTask(
            task.map((task) => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDeleteTask = () => {
        setTask(task.filter((task) => task.id !== taskToDelete));
        setShowDeleteDialog(false);
        setTaskToDelete(null);
    };

    const deleteDialog = (taskId) => {
        setTaskToDelete(taskId);
        setShowDeleteDialog(true);
    };

    return (
        <div className={`${styles.container} ${isModalOpen || showDeleteDialog ? styles.blur : ''}`}>
            <h1 className={styles.title}>Suas tarefas</h1>
            <ul className={styles.taskList}>
                {task.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                        <div>
                            <input type="checkbox" 
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            <span className={task.completed ? styles.completed : ''}>{task.title}</span>
                        </div>
                        <button 
                            className={styles.deleteButton}
                            onClick={() => deleteDialog(task.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
                Adicionar Tarefa
            </button>
            {isModalOpen && (
                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={addTask}
                />
            )}
            {showDeleteDialog && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogContent}>
                        <h2 className={styles.dialogTitle}>Deletar Tarefa</h2>
                        <p>Tem certeza que você deseja deletar essa tarefa?</p>
                        <button onClick={() => setShowDeleteDialog(false)}>Cancelar</button>
                        <button onClick={handleDeleteTask}>Deletar</button>                        
                    </div>
                </div>
            )}
        </div>
    );
}
