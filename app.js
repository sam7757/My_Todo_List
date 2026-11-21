        
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "./firebaseconfig.js";
  
        
        let todos = [];
        let todoListElm = document.querySelector(".todo-lists");


    let addTodo = async () => {
    let todoInput = document.querySelector("#todo-inp");
    if (todoInput.value.trim() === "") return;

    try {
        await addDoc(collection(db, "todos"), {
            text: todoInput.value,
            isCompleted: false,
            createdAt: new Date().getTime()
        });

        todoInput.value = '';
        await getTodosFromFirestore(); 
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};



let getTodosFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        todos = [];

        querySnapshot.forEach((docSnap) => {
            todos.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        renderTodos();
    } catch (error) {
        console.error("Error getting todos:", error);
    }
};

getTodosFromFirestore();


let startTodoApp = async () => {
    let userName = "";

    while (!userName || userName.trim() === "") {
        userName = prompt("Enter your name to open Todo List:");
        if (userName === null) break;
    }

    if (userName && userName.trim() !== "") {
        alert("Welcome " + userName.trim());
    }

    await getTodosFromFirestore();
};

startTodoApp();


        
// let getTodosFromLocalStorage = () => {
//     let todosData = JSON.parse(window.localStorage.getItem("todos"));
//     todos = todosData || [];
// }
// getTodosFromLocalStorage();


// let setTodosInLocalStorage = () => {
//     window.localStorage.setItem("todos", JSON.stringify(todos))
// }



let deleteAllTodos = async () => {
    if (todos.length === 0) {
        alert("No todos to delete");
        return;
    }

    let sure = confirm("Are you sure you want to clear all tasks and delete todo?");
    if (!sure) return;

    try {
        for (let i = 0; i < todos.length; i++) {
            await deleteDoc(doc(db, "todos", todos[i].id));
        }
        await getTodosFromFirestore();
        alert("All todos deleted");
    } catch (err) {
        console.error("Delete all error:", err);
    }
};





let deleteTodo = async (todo_id) => {
    console.log(todo_id);
    try {
        await deleteDoc(doc(db, "todos", todo_id));
        await getTodosFromFirestore();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};

let updateTodo = async (todo_id) => {
    console.log('update', todo_id);
    let todoInput = document.querySelector("#todo-inp");
    if (todoInput.value.trim() === "") return;

    try {
        await updateDoc(doc(db, "todos", todo_id), {
            text: todoInput.value
        });

        todoInput.value = "";

        let delBtns = document.querySelectorAll('.del-btn');
        let editBtns = document.querySelectorAll('.edit-btn');
        let donebtns = document.querySelectorAll('.done-btn');
        document.querySelector('#delAllBtn').disabled = false;
        delBtns.forEach((btn) => btn.disabled = false);
        editBtns.forEach((btn) => btn.disabled = false);
        donebtns.forEach((btn) => btn.disabled = false);

        let addBtn = document.querySelector("#addBtn");
        addBtn.innerText = 'add';
        addBtn.removeAttribute('onClick');
        addBtn.setAttribute('onClick', `addTodo()`);

        await getTodosFromFirestore();
    } catch (error) {
        console.error("Error updating todo:", error);
    }
    renderTodos();
};


    /// also update the localstorage
    // setTodosInLocalStorage()
    // console.log(todos);


let doneTodo = async (todo_id) => {
    console.log(todo_id);
    try {
        await updateDoc(doc(db, "todos", todo_id), {
            isCompleted: true
        });
        await getTodosFromFirestore();
    } catch (error) {
        console.error("Error marking todo done:", error);
    }
};


let editTodo = (todo_id) => {
    console.log(todo_id);

    let delBtns = document.querySelectorAll('.del-btn'); /// []
    let editBtns = document.querySelectorAll('.edit-btn'); /// []
    let donebtns = document.querySelectorAll('.done-btn'); /// []
    
    
    document.querySelector('#delAllBtn').disabled = true; /// []
    delBtns.forEach((btn) => btn.disabled = true)
    editBtns.forEach((btn) => btn.disabled = true)
    donebtns.forEach((btn) => btn.disabled = true)

    let findTodo = todos.find((todo) => todo.id == todo_id)
    document.querySelector("#todo-inp").value = findTodo.text;

    let addBtn = document.querySelector("#addBtn");
    addBtn.innerText = 'update';

    addBtn.removeAttribute('onClick');
    addBtn.setAttribute('onClick', `updateTodo('${todo_id}')`);
    // addBtn.addEventListener('click', () => updateTodo(todo_id))
}


let renderTodos = () => {
    console.log(todos);

    todoListElm.innerHTML = ''
    todos.map((item) => {
        let todoList = document.createElement('div');
        todoList.className = 'todo'

        if (item.isCompleted) {
            todoList.className += ' done'
            todoList.innerHTML = `
        <div>
        <span>${item.text}</span>
        <button class='del-btn' onClick="deleteTodo('${item.id}')">del</button>
        </div>
        `
        }
        else {
            todoList.innerHTML = `
        <div>
        <button class='done-btn' onClick="doneTodo('${item.id}')">done</button>
        <span>${item.text}</span>
        <button class='del-btn' onClick="deleteTodo('${item.id}')">del</button>
        <button class='edit-btn' onClick="editTodo('${item.id}')">edit</button>
        </div>
        `}
        todoListElm.appendChild(todoList)

    });

}

renderTodos()


window.addTodo = addTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.doneTodo = doneTodo;
window.updateTodo = updateTodo;
window.deleteAllTodos = deleteAllTodos;