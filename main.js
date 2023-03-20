//유저가 값을 입력한다. o
// +버튼을 누르면 할일이 추가된다. o
//check버튼을 누르면 linethrough가 생긴다. o
//check버튼을 다시 누르면 복귀 o 
//delete버튼을 누르면 삭제된다. o 
//ongoing탭을 누르면 아직 안한 일만 나온다. o 
//done탭을 누르면 다 한 일만 나온다. o 
//all탭을 다시 누르면 모든 할일이 나온다. o
//ongoing, done 탭에서도 delete가 된다.
//enter버튼을 클릭하면 자동으로 아이템 추가하기 o
// 할일을 추가하면 input창 비우기 o
//탭에 언더바 추가하기 o
//스타일 주기 
 
let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let taskTabs = document.querySelectorAll(".tabs div");
let list = [];
let menu = "all";
let underLine = document.getElementById("underbar");

addButton.addEventListener("click", addTask);
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-button").click();
  }
});


for(let i=1; i<taskTabs.length;i++){
    taskTabs[i].addEventListener("click", function(event){
        filter(event);
    });
}
function addTask(){
    let input = userInput.value;
    let task = {
        content : input,
        isComplete: false,
        id : randomId()
    }
    taskList.push(task);
    userInput.value = "";
    render();
}

function render() {
    let inputHTML = '';
    if(menu == "all"){
        list = taskList;
    }
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            inputHTML += `<div class="task-box done-box">
                <div class="toggle-task">${list[i].content}</div>
                <div class="button-area">
                    <button class="rotate-button" onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                    <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`
        }
        else{
        inputHTML += `<div class="task-box">
                <div>${list[i].content}</div>
                <div class="button-area">
                    <button class="check-button" onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                    <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`
        }
    }

    document.getElementById("task-board").innerHTML = inputHTML;
}

function toggleDone(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter();
}

function filter(e){
    if(e){
        menu = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
    }

    list = [];
    if(menu == "all"){
        render();
    }else if(menu == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                list.push(taskList[i]);
            }
        }
    }else if(menu == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                list.push(taskList[i]);
            }
        }
    }
    render();
}
function randomId(length = 6){
    return Math.random().toString(36).substring(2, length+2);
}
