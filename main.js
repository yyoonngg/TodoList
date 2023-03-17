//유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1.check버튼을 클릭하는 순각 true false
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let textInput = document.getElementById("text-input");
let addButton = document.getElementById("add-button");
let taskList=[];
let tabs = document.querySelectorAll(".tabs div");
let menu = "all-tab";
let filterList=[];
let underLine = document.getElementById("tab-underline");

addButton.addEventListener("click", addTask);
textInput.addEventListener("keypress",function(event) {
    if(event.key == "Enter") {
        event.preventDefault();
        document.getElementById("add-button").click();
    }
})

for(let i=0; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}
function addTask(){
    let taskValue = textInput.value;
    let task = {
        content : taskValue,
        isComplete : false,
        id : randomId()
    }
    taskList.push(task);
    textInput.value = "";
    render();
}

function render(){
    resultList=[];
    result= "";
    if(menu == "all-tab"){
        resultList = taskList;
    }else{
        resultList = filterList;
    }

    for(let i= 0; i<resultList.length;i++){
        if(resultList[i].isComplete == true){
            result += `<div class="task-box">
                <div class="toggle-task">${resultList[i].content}</div>
                <div>
                    <button onclick="toggleDone('${resultList[i].id}')">check</button>
                    <button onclick="deleteTask('${resultList[i].id}','${menu}')">delete</button>
                </div>
            </div>`
        }
        else{
            result += `<div class="task-box">
                <div>${resultList[i].content}</div>
                <div>
                    <button onclick="toggleDone('${resultList[i].id}')">check</button>
                    <button onclick="deleteTask('${resultList[i].id}','${menu}')">delete</button>
                </div>
            </div>`
        }
    }
    document.getElementById("task-board").innerHTML = result;
}

function toggleDone(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}
function deleteTask(id, menu){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter();
}

function filter(event){
    if(event){
        menu = event.target.id;
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    filterList = [];
    if(menu == "all-tab"){
        render();
    }
    else if(menu == "ongoing-tab"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    else if(menu == "done-tab"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

const randomId = function(length = 6) {
    return Math.random().toString(36).substring(2, length+2);
  };
