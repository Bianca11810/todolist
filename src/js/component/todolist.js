import React, {useState} from "react";

const TodoList = () => {
    const [todos, setTodos] = useState(
        [
            // {"id": 1, "name": "", "completed": false},
            // {"id": 2, "name": "", "completed": false},
            // {"id": 3, "name": "", "completed": false}
        ]
    )

    const handleSubmit = (event) => {
        // with the event, we need to cancel the default
        event.preventDefault()
        let task = {
            "id": Math.floor(Date.now() / 1000), 
            "name": event.target.todo.value, 
            "completed": false
        }
        console.log(task);
        // set the state to whatever the list currently is, plus the new value
        setTodos([...todos, task])
        event.target.todo.value = ""
    }

    const completeTask = (id) => {
        todos.forEach(todo => {
            if (todo.id == id) {
                todo.completed = true;
            }
        })

        // for(let i = 0; i < todos.length; i++) {
        //     if (todos[i].id == id) {
        //         todos[i].completed = true
        //     }
        // }

        setTodos([...todos])
    }

    const deleteTask = (id) => {
        // filter everything that does not match the ID
        let filtered = todos.filter(todo => todo.id !== id)

        setTodos([...filtered])
    }

    const showDelete = (i) => {
        const btn = document.querySelector("#delete-btn-" + i)
        btn.style.visibility = "visible"
    }

    const hideDelete = (i) => {
        const btn = document.querySelector("#delete-btn-" + i)
        btn.style.visibility = "hidden"
    }

    return (
            <>
            <h1>Todos</h1>
            <div className="todo-wrapper">
                <form className="todo-form" onSubmit={handleSubmit}>
                    <input type="text" name="todo" placeholder={todos[0] ? "add todo" : "no todo, add todo"} />
                </form>
            </div>
            <ul className="todo-list">
            {todos.map((todo, i) => {
                return (
                    <li key={i} className="todo-item"
                        onMouseOver={() => showDelete(i)}
                        onMouseOut={() => hideDelete(i)}
                    >
                        <p className={todo.completed ? "completed" : ""}>{todo.name}</p>
                        {/* <button className="complete-task" onClick={() => completeTask(todo.id)}>Complete</button> */}
                        <button 
                            id={"delete-btn-" + i} 
                            className="delete-task" 
                            onClick={() => deleteTask(todo.id)}
                        >Delete
                        </button>
                    </li>
                );
            })}
        </ul>
            </>
            )
}

export default TodoList