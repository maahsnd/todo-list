function getInputs() {
    let inputs = document.querySelectorAll('.to-do-item-form > input');
    let inputValues = [];
    inputs.forEach(input => {
        inputValues.push(input.value);
    });
    addToList(currentListIndex, inputValues);
    renderItemOnSubmit();
};

function renderItemOnSubmit() {
    let list = masterList[currentListIndex].toDoItems;
    let itemIndex = list.length - 1;
    renderItemToDom(list[itemIndex], itemIndex);
}

//proto list object
const protoList = {};
//array containing individual lists as objects
let masterList = [];
//variable to store location of current list in master list index
let currentListIndex;

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

//add listeners
//to submit btn
const submit = document.querySelector('.to-do-item-submit');
submit.addEventListener("click", getInputs);
//to new list submit button
const newListSubmit = document.querySelector('.new-list-submit-button');
newListSubmit.addEventListener("click", () => {createNewList().makeList(
)});
//to show all lists button
const showAllListsBtn = document.querySelector('.show-all-lists');
showAllListsBtn.addEventListener("click", showAllLists);
//to new list btn
const newList = document.querySelector('.new-list-button');
newList.addEventListener("click", () => {
//pull up new-list-form!! INCOMPLETE
});
const popupX = document.querySelector('.x-out');
popupX.addEventListener("click", closePopup);

function closePopup() {
    const popup = document.querySelector('.popup-div');
    popup.style.display = "none";
}

// add item to toDoItems array within to do list object
function addToList (listIndex, todoItem) {
    masterList[listIndex].toDoItems.push(
        {
            title: todoItem[0],
            dueDate: todoItem[1],
            priority: todoItem[2],
            description: todoItem[3]
        });
};

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

function showList(list) {
    for (let i = 0; i < list.toDoItems.length; i++) {
        renderItemToDom(list.toDoItems[i], i);
    }
}

function handleCheck(event) {
    let itemIndex = parseInt(event.target.id.slice(1))
    const checkedItemDiv = document.querySelector(`#d${itemIndex}`);
    event.target.checked ? checkedItemDiv.classList.add('checked') :
        checkedItemDiv.classList.remove('checked');
}

function deleteItem(event) {
    let itemIndex = event.target.value;
    masterList[currentListIndex].toDoItems.splice(itemIndex, 1);
    const item = document.querySelector(`#d${itemIndex}`);
    item.remove();
}

function expandItem(event) {
    const itemIndex = event.target.value;
    const popupDiv = document.querySelector('.popup-div');
    popupDiv.style.display = "flex";
    renderToPopup(itemIndex);
}

function renderToPopup(itemIndex) {
    const title = document.querySelector('.popup-item>#title');
    const titleText = masterList[currentListIndex].toDoItems[itemIndex].title;
    title.value = titleText;
}

//render inputs to DOM. Takes individual todo item object as input
function renderItemToDom(taskInputs, itemIndex) {
    const contentDiv = document.querySelector('#content');
    //check box
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.id = `c${itemIndex}`;
    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add("checkbox-div");
    checkBox.addEventListener("click", handleCheck)
    checkBoxDiv.append(checkBox);
    //to do item attributes
    const itemDiv = document.createElement('div');
    const title = document.createElement('div');
    title.innerHTML = taskInputs.title;
    const dueDate = document.createElement('div');
    dueDate.innerHTML = taskInputs.dueDate;
    /* const priority = document.createElement('div');
    priority.innerHTML = taskInputs.priority; */
    /* const description = document.createElement('div');
    description.innerHTML = taskInputs.description; */
    //expand button
    const expandBtn = document.createElement('button');
    expandBtn.innerHTML = "See Details";
    expandBtn.type = "button";
    expandBtn.value = itemIndex;
    expandBtn.addEventListener("click", expandItem);
    expandBtn.classList.add("expand-button")
    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete Item";
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-button");
    deleteBtn.value = itemIndex;
    deleteBtn.addEventListener("click", deleteItem);
    const btnDiv = document.createElement('div');
    btnDiv.classList.add("btn-div");
    btnDiv.append(expandBtn, deleteBtn)
    //gather elements to create to do item 
    itemDiv.append(checkBoxDiv, title, dueDate, btnDiv);
    itemDiv.id = `d${itemIndex}`;
    itemDiv.classList.add("todo-item-wrap");
    contentDiv.append(itemDiv);
};
