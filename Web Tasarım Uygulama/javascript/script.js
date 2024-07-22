// todo eleman ekleme
//eleman seçimi 

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;



loadItems();
eventlisteners();

function eventlisteners() {
    //submit yani gönderme
    form.addEventListener("submit", addNewItem);
    //eleman silme delete an item
    taskList.addEventListener("click", deleteItem);
    //delete all
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

function addNewItem(e) {
    if (input.value === '') {
        alert("add new item");
        //console.log("submit");//submit=göndermek
    }
    createItem(input.value);
    setItemtoLocalStorage(input.value);
    input.value = "";//ekledikten sonra input alanını boş olur 
    e.preventDefault();//sayfayı tekrar yenilemeyi engeller 
}

//eleman silme
function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            //console.log(e.target);
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}
//tüm elemanları silmek 
function deleteAllItems() {
    if (confirm("tüm elemanları silmek istediğinize emin misiniz ?")) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    //taskList.innerHTML=""; tüm elemanları silme de alternatif yöntem
}
function deleteTodoFromStorage(deletetodo){
    let todos = getItemsFromLS();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
     
}
function loadItems() {
    todos=getItemsFromLS()
    todos.forEach(function (item) {
        createItem(item);
    })
}
//local storage den item alma 
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));//veritabanından aldığımız verileri diziye dönüştürüyoruz stringden
    }
    return todos;

}
//set item local storage 
function setItemtoLocalStorage(newTodo) {

    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function createItem(newTodo) {
    //li oluşturma 

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(newTodo))

    //a oluşturmak
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);

}