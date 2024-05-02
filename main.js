const todolist_inputfield = document.getElementById("todolist-inputfield");
const create_todo_btn = document.querySelector(".createtodobtn");
const todolist_itemsul = document.querySelector(".todolistitems-ul");
const todolist_notification = document.getElementById("todolist-notification");
// ============================================ the updated_todotext is set to null which means it doesn't even exist ============================================
let updated_todotext = null;
// ============================================ editing mode is initially set as false which means the user's isn't editing it's existing todo item ============================================
let editing_mode_todotext = false;
const todoitem_deletion_confirmationbox = document.getElementById("todoitem-deletion-confirmationbox");
const cancel_deletionbtn = document.getElementById("cancel-deletionbtn");
const yes_deletionbtn = document.getElementById("yes-deletionbtn");
const overlay_notification_indicatortext = document.querySelectorAll(".overlay-notification-indicatortext");
const emptyinput_alertbox = document.getElementById("emptyinput-alertbox");
const closebtn_emptyinput_alertbox = document.getElementById("closebtn-emptyinput-alertbox");

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
    show_todolist_notification("new task added successfully");
    todolist_inputfield.value = "";
  } else {
    emptyinput_alertbox.classList.add("showhide");
    overlay_notification_indicatortext.forEach((each_overlay_notification_indicatortext)=>{
      each_overlay_notification_indicatortext.innerText = "enter the value for the todo item to submit";
    })
    closebtn_emptyinput_alertbox.onclick = function() {
      emptyinput_alertbox.classList.remove("showhide");
    }
    todolist_inputfield.focus();
  }
}

todolist_inputfield.onkeyup = function(e) {
  // console.log(`the key code for ${e.key} is ${e.keyCode}`);
  if(e.keyCode === 13 || e.key === "Enter") {
    editing_mode_todotext === true ? updatetodo_itemtext(): create_todo();
  }
}

// ============================================ removing the edit icon & marking the todoitem as completed ============================================
function complete_todo(e) {
    e.firstElementChild.classList.add("task-completed");
    e.lastElementChild.querySelector(".fa-pencil").remove();
}

// ============================================ edit todo if not marked as completed ============================================
function update_todo(e) {
    let todolist_itemtext = e.parentElement.previousElementSibling; /* ====================== ptag holding the todotext =================== */
    if(todolist_itemtext.classList.contains("task-completed")) {
        alert("can't edit this task because it's marked as completed");
        return false;
    }
    else {
        todolist_inputfield.value = todolist_itemtext.innerText;
        updated_todotext = todolist_itemtext; /* ============================================ make sure the updated_todotext now exists by referencing it's existence from todolist_itemtext which is our ptag holding the todo task so now the updated_todotex exists in our enviroment ============================================ */
        create_todo_btn.setAttribute("onclick","updatetodo_itemtext()");
        editing_mode_todotext = true;
      }
    }
    
function updatetodo_itemtext() {
      // ============================================ check if the updated_todotext exists in our enviroment then edit the particular todo task by updating it & then reset the inputfield's value & again make sure the updated_todotext isn't existing in our enviroment ============================================
      if(updated_todotext !== null && editing_mode_todotext === true) {
        updated_todotext.innerText = todolist_inputfield.value;
        create_todo_btn.setAttribute("onclick","create_todo()");
        todolist_inputfield.value = "";
        updated_todotext = null;
        editing_mode_todotext = false;
      show_todolist_notification("task updated successfully");
  }
}

// ============================================ delete todo ============================================
function delete_todo(e) {
  overlay_notification_indicatortext.forEach((each_overlay_notification_indicatortext)=>{
    each_overlay_notification_indicatortext.innerHTML = `are you sure that you want to delete the ${e.parentElement.previousElementSibling.innerText}`;
  })
  // ============================================ if clicked on cancel delete btn then just hide the overlay notification popup box ============================================ 
  todoitem_deletion_confirmationbox.classList.add("showhide");
  cancel_deletionbtn.onclick = function() {
    todoitem_deletion_confirmationbox.classList.remove("showhide");
  }
  // ============================================ if clicked on delete btn then hide the overlay notification popup box & delete the particular whole litag of todoitem ============================================ 
  yes_deletionbtn.onclick = function() {
    e.parentElement.parentElement.remove();
    todoitem_deletion_confirmationbox.classList.remove("showhide");
  }
}

// ========================== notification indicating new task added or existing task updated ==========================
function show_todolist_notification(notification_message) {
  todolist_notification.innerText = notification_message;
  todolist_notification.style.display = "block";
  setTimeout(() => {
    todolist_notification.style.display = "none";
  }, 2000);
}