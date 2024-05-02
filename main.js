const todolist_inputfield = document.getElementById("todolist-inputfield");
const create_todo_btn = document.querySelector(".createtodobtn");
const todolist_itemsul = document.querySelector(".todolistitems-ul");
let updated_todotext = null;
// ============================================ the updated_todotext is set to null which means it doesn't even exist ============================================

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

// ============================================ edit todo if not marked as completed ============================================
function update_todo(e) {
    let todolist_itemtext = e.parentElement.previousElementSibling;
    if(todolist_itemtext.classList.contains("task-completed")) {
        alert("can't edit this task because it's marked as completed");
        return false;
    }
    else {
        todolist_inputfield.value = todolist_itemtext.innerText;
        updated_todotext = todolist_itemtext; /* ============================================ make sure the updated_todotext now exists by referencing it's existence from todolist_itemtext which is our ptag holding the todo task so now the updated_todotex exists in our enviroment ============================================ */
        create_todo_btn.setAttribute("onclick","updatetodo_itemtext()");
    }
}

function updatetodo_itemtext() {
  // ============================================ check if the updated_todotext exists in our enviroment then edit the particular todo task by updating it & then reset the inputfield's value & again make sure the updated_todotext isn't existing in our enviroment ============================================
  if(updated_todotext !== null) {
    updated_todotext.innerText = todolist_inputfield.value;
    create_todo_btn.setAttribute("onclick","create_todo()");
    todolist_inputfield.value = "";
    updated_todotext = null;
  }
}

// ============================================ delete todo ============================================
function delete_todo(e) {
    if(confirm(`are you sure that you want to delete the ${e.parentElement.previousElementSibling.innerText}`)) {
        e.parentElement.parentElement.remove();
    }
}