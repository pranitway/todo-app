let taskInput = document.querySelector("#task-input");
let addTaskBtn = document.querySelector("#addBtn");
let showTask = document.querySelector("#showTask");
let removeAll = document.querySelector("#removeAllBtn");
let taskNumb = 0;
let todoArr = [];
let todosFromLocal = JSON.parse(localStorage.getItem("todos"));

todoIterator(todosFromLocal);

function todoIterator(todos) {
    if (todos) {
        todoArr = [...todos];
        for (let task of todos) {
            addTaskToNode(task);
        }
    }
}

function addTaskToNode(task) {
    let div = document.createElement("div");
    div.setAttribute(
        "class",
        "alert alert-success task-box text-left d-flex align-items-center pl-3"
    );

    div.textContent = task;

    let icon = document.createElement("i");

    icon.setAttribute("class", "fa-solid fa-circle-xmark fa-lg");
    icon.setAttribute("key", String(taskNumb++));

    div.appendChild(icon);

    showTask.appendChild(div);
    // console.log(div);

    deleteTask(div);
}

function deleteTask(divRef) {
    todoArr = JSON.parse(localStorage.getItem("todos"));
    divRef.addEventListener("click", function (event) {
        console.log(event.target);

        let key = Number(event.target.getAttribute("key"));
        console.log(key);

        todoArr = todoArr.filter((value, index) => {
            return index !== key;
        });
        // resetting a task Key Number
        taskNumb = 0;
        if (todoArr.length !== 0) {
            localStorage.setItem("todos", JSON.stringify(todoArr));
            showTask.innerHTML = "";
            todoIterator(todoArr);
        } else {
            localStorage.removeItem("todos");
        }
    });
}
// showTask.addEventListener("click", function (event) {
//     console.log(event.target);
// });

addTaskBtn.addEventListener("click", function () {
    if (taskInput.value !== "") {
        todoArr.push(taskInput.value);
        localStorage.setItem("todos", JSON.stringify(todoArr));

        addTaskToNode(todoArr[todoArr.length - 1]);

        // console.log("todofrom local:", typeof todosFromLocal, todosFromLocal);

        taskInput.value = "";
    }

    console.log(todoArr);
});

taskInput.addEventListener("keypress", function (event) {
    if (taskInput.value !== "" && event.key === "Enter") {
        todoArr.push(taskInput.value);
        localStorage.setItem("todos", JSON.stringify(todoArr));
        addTaskToNode(todoArr[todoArr.length - 1]);

        taskInput.value = "";
    }
});

removeAll.addEventListener("click", function () {
    localStorage.removeItem("todos");
});

setInterval(function () {
    todosFromLocal = JSON.parse(localStorage.getItem("todos"));
    if (!todosFromLocal) {
        todoArr = [];
        showTask.innerHTML = "";
        // todoIterator();
    }
}, 50);

console.log(todoArr);
