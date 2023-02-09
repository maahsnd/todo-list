function getInputs() {
    let inputs = document.querySelectorAll('.to-do-item > input');
    let inputValues = [];
    inputs.forEach(input => {
        inputValues.push(input.value);
    });
    addToList(currentListIndex, inputValues);
    renderItemOnSubmit();
    //call function to render last item of list to DOM
};

function renderItemOnSubmit() {
    let list = masterList[currentListIndex].toDoItems;
    let itemIndex = list.length - 1;
    renderItemToDom(list[itemIndex], itemIndex);
}

//list object
const protoList = {};
//master list or list of lists
let masterList = [];
//variable to store location of current list in master list index
let currentListIndex;
//create new list
const createNewList = () => {
    const getListTitle = () => (document.querySelector('#list-title')).value || "myFirstList";
    const setCurrentListIndex = () => currentListIndex = masterList.length - 1;
    const makeList = () => {masterList.push(
            Object.assign(
                Object.create(protoList), {listTitle: getListTitle()}, {toDoItems: []}
            )   
        );
        setCurrentListIndex();
        //clear title input field
        document.querySelector('#list-title').value = '';
        };
    return { makeList };
};
//set default list
createNewList().makeList();

//add listener to new list btn
const newList = document.querySelector('.new-list-button');
newList.addEventListener("click", () => {
//pull up new-list-form!!
});

//add listener to submit btn
const submit = document.querySelector('.to-do-item-submit');
submit.addEventListener("click", getInputs);

//add listener to new list submit button
const newListSubmit = document.querySelector('.new-list-submit-button');
newListSubmit.addEventListener("click", () => {createNewList().makeList(
)});

//add listener to show all lists button
const showAllListsBtn = document.querySelector('.show-all-lists');
showAllListsBtn.addEventListener("click", showAllLists);

// add item to toDoItems array within to do list
function addToList (listIndex, todoItem) {
    masterList[listIndex].toDoItems.push(
        {
            title: todoItem[0],
            dueDate: todoItem[1],
            priority: todoItem[2],
            description: todoItem[3]
        }
    );
};

//show all lists func (renders to DOM)
function showAllLists() {
    const contentDiv = document.querySelector('#content');
    let masterListToRender = [];
    for (let i = 0; i < masterList.length; i++) {
        let el = document.createElement('button');
        el.textContent = masterList[i].listTitle;
        el.value = i;
        el.addEventListener("click", () => {
            showList(masterList[i])
            currentListIndex = i;
            }
        );
        masterListToRender.push(el);
    };
    masterListToRender.forEach(input => {
        contentDiv.append(input);
    });
};

//show list function
function showList(list) {
    for (let i = 0; i < list.toDoItems.length; i++) {
        renderItemToDom(list.toDoItems[i], i);
    }
}

function deleteItem(event) {
    let itemIndex = event.target.value;
    masterList[currentListIndex].toDoItems.splice(itemIndex, 1);
    const item = document.querySelector(`#d${itemIndex}`);
    item.remove();
}

//render inputs to DOM. Takes individual todo item object as input
function renderItemToDom(taskInputs, itemIndex) {
    console.log(itemIndex);
    const contentDiv = document.querySelector('#content');
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.id = `c${itemIndex}`;
    const itemDiv = document.createElement('div');
    const title = document.createElement('div');
    title.innerHTML = taskInputs.title;
    const dueDate = document.createElement('div');
    dueDate.innerHTML = taskInputs.dueDate;
    const priority = document.createElement('div');
    priority.innerHTML = taskInputs.priority;
    const description = document.createElement('div');
    description.innerHTML = taskInputs.description;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete Item";
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-button");
    deleteBtn.value = itemIndex;
    deleteBtn.addEventListener("click", deleteItem);
    itemDiv.append(checkBox, title, dueDate, priority, description, deleteBtn);
    itemDiv.id = `d${itemIndex}`;
    itemDiv.classList.add("todo-item-wrap");
    contentDiv.append(itemDiv);
};
//add to list
//render last item of list