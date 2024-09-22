import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TaskModal from '../components/TaskModal';
import styles from '../styles/Home.module.scss';

export default function home(){
    const [task, setTask] = useState([]);
    const[isModaLOpen, setIsModalOpen] = useState(false);
    const [showDeleteDialog,  setShowDeleteDialog] = useState(false);


    const addTask = (title) =>{
        const newTask = {id: Date.now(), title, completed: false};
        setTask([...task, newTask]);
    };

    const toggleTaskCompletion = (taskId) => {
        setTask(
            task.map((task) => 
                task.id === taskId ? {...task, completed: !task.completed} : task
            )
        );
    };
    const deleteTask = (taskId) => {
        setTask(task.filter((task) => task.id !== taskId));
    };
    
    return(
        <div className="container">
            <h1 className={styles.title}>Suas tarefas</h1>
            <ul className={styles.taskList}>
                {task.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                        <div>
                            <input type="checkBox" 
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            />
                            <span className={task.completed ? styles.taskCompleted : ''}>{task.title}</span>
                        </div>
                        <button 
                        className={styles.deleteButton}
                        onClick={() => deleteTask(task.id)}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
                Adicionar Tarefa
            </button>
            <TaskModal
            isOpen={isModaLOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={addTask}
            />
        </div>
    );
}