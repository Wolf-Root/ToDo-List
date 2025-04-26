import {
    faTrashAlt,
    faCalendarCheck,
    faCircleXmark,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [tasks, setTasks] = useState(
        localStorage.getItem("Tasks")
            ? JSON.parse(localStorage.getItem("Tasks"))
            : []
    );
    const [newTask, setNewTask] = useState("");

    // handle Input Change
    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    // add New Task;
    function addNewTask() {
        const trimmedTask = newTask.trim();

        if (trimmedTask !== "") {
            const taskToAdd = {
                id: uuidv4(),
                text: trimmedTask,
                Complet: false,
            };
            setTasks([...tasks, taskToAdd]);
            setNewTask("");
        }
    }

    // toggle Task Completion;
    function toggleTaskCompletion(id) {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, Complet: !task.Complet } : task
            )
        );
    }

    // delet Task;
    function deletTask(id) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // LocalStorage
    useEffect(() => {
        localStorage.setItem("Tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="bg-blue-950 min-h-screen flex items-center justify-center px-4">
            <div className="bg-gradient-to-br from-blue-700/60 to-purple-700/60 text-white border border-blue-500/70 min-h-[600px] min-w-full md:min-w-3xl lg:max-w-4xl rounded-2xl p-5 md:py-5 md:px-10">
                {/* heading */}
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faCalendarCheck} size="2xl" />
                    <h1 className="text-3xl font-semibold">To Do List</h1>
                </div>
                {/* Input  */}
                <div className="my-8 bg-white text-stone-900 rounded-xl md:rounded-full">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addNewTask();
                        }}
                        className="flex flex-col md:flex-row "
                    >
                        <label htmlFor="task" className="sr-only">
                            Enter Your Task
                        </label>
                        <input
                            id="task"
                            type="text"
                            placeholder="Enter Your Task ..."
                            onChange={handleInputChange}
                            value={newTask}
                            className="bg-transparent flex-1 p-3 md:p-4 text-lg md:text-xl font-semibold border-none focus:outline-none"
                        />
                        <button
                            aria-label="Add Task"
                            className="bg-orange-600 text-white p-1 md:p-4 text-xl font-semibold w-full md:w-fit rounded-b-xl md:rounded-r-full cursor-pointer duration-300 hover:bg-orange-700"
                        >
                            Add +
                        </button>
                    </form>
                </div>

                {/* Show Tasks */}
                <div
                    className={`${
                        tasks.length > 0
                            ? "bg-blue-50 text-black rounded-2xl duration-300"
                            : ""
                    }`}
                >
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between p-2.5 md:p-4"
                        >
                            <div
                                className="flex items-start w-full wrap-anywhere gap-4 cursor-pointer flex-1"
                                onClick={() => toggleTaskCompletion(task.id)}
                            >
                                {/* chaeck */}
                                {task.Complet ? (
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        className="text-green-600 text-2xl md:text-3xl"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="text-red-600 text-2xl md:text-3xl"
                                    />
                                )}

                                {/* task */}
                                <p
                                    className={`text-xl md:text-2xl font-semibold ${
                                        task.Complet && "line-through"
                                    }`}
                                >
                                    {task.text}
                                </p>
                            </div>
                            {/* delet */}
                            <button
                                aria-label="Delet Task"
                                onClick={() => deletTask(task.id)}
                                className="text-orange-600 cursor-pointer duration-300 hover:text-red-700 text-2xl md:text-3xl"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
