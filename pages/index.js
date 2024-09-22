import { useState } from "react";
import TaskModal from '../components/TaskModal';
import styles from '../styles/Home.module.scss';

export default function home(){
    const [task, setTask] = useState([
        { id: 1, title: 'Task 1', completed: false},
        { id: 2, title: 'Task 2', completed: false},
        { id: 3, title: 'Task 3', completed: false},
    ]);
    const[isModaLOpen, setIsModalOpen] = useState(false);

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
            onAddTask={addTask}
            />
        </div>
    );
}