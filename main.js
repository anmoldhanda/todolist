const todolist_inputfield = document.getElementById("todolist-inputfield");
const create_todo_btn = document.querySelector(".createtodobtn");
const todolist_itemsul = document.querySelector(".todolistitems-ul");
let updated_todotext = "";

// ============================================ create new todo ============================================
function create_todo() {
  if (todolist_inputfield.value !== "") {
    let li_tag = document.createElement("li");
    li_tag.setAttribute("ondblclick","complete_todo(this)");
    li_tag.className = "each-todolist-itembox";
    li_tag.innerHTML = `<p class="todolist-itemtext"></p>
        <div class="iconsdiv">
            <i class="fa-solid fa-pencil" title="Edit todo" onclick="update_todo(this)" id="edit-todoitem"></i>
            <i class="fa-solid fa-trash" title="Delete todo" onclick="delete_todo(this)" id="delete-todoitem"></i>
        </div>`;
    let todolist_itemtext = li_tag.querySelector(".todolist-itemtext");
    todolist_itemtext.innerText = todolist_inputfield.value;
    todolist_itemsul.appendChild(li_tag);
    todolist_inputfield.value = "";
  } else {
    alert("enter the value to the form first");
    todolist_inputfield.focus();
  }
}

function complete_todo(e) {
    e.firstElementChild.classList.add("task-completed");
    e.lastElementChild.firstElementChild.remove();
}

todolist_inputfield.onkeyup = function (e) {
//   console.log(`key code for ${e.key} is ${e.keyCode}`);
  // ============================================ if the user pressed entered inside the inputfield then create a todo by calling todo function ============================================
  if (e.keyCode === 13) {
    create_todo();
  }
};

// ============================================ edit todo if not marked as completed ============================================
function update_todo(e) {
    let todolist_itemtext = e.parentElement.previousElementSibling;
    if(todolist_itemtext.classList.contains("task-completed")) {
        alert("can't edit this task because it's marked as completed");
        return false;
    }
    else {
        todolist_inputfield.value = e.parentElement.previousElementSibling.innerText;
        // create_todo_btn.removeAttribute("onclick","create_todo()");
        create_todo_btn.setAttribute("onclick","updatetodo_itemtext(this)");
        // e.parentElement.previousElementSibling.innerText = todolist_inputfield.value;
    }
}

function updatetodo_itemtext(e) {
    console.log(updated_todotext.innerText);
    // updated_todotext.innerText = todolist_inputfield.value;
}

// ============================================ delete todo ============================================
function delete_todo(e) {
    if(confirm(`are you sure that you want to delete the ${e.parentElement.previousElementSibling.innerText}`)) {
        e.parentElement.parentElement.remove();
    }
}