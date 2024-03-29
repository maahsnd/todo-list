function getInputs() {
    let inputs = document.querySelectorAll('fieldset > input');
    let inputValues = [];
    inputs.forEach(input => {
        inputValues.push(input.value);
        input.value = '';
    });
    addToList(createNewList().listIndex.currentListIndex, inputValues);
    renderItemOnSubmit();
};

function renderItemOnSubmit() {
    let list = masterList[createNewList().listIndex.currentListIndex].toDoItems;
    let itemIndex = list.length - 1;
    renderItemToDom(list[itemIndex], itemIndex);
}

//proto list object
const protoList = {};
//array containing individual lists as objects
let masterList = [];

const createNewList = () => {
    const getListTitle = () => (document.querySelector('#list-title')).value || "myFirstList";
    //variable to store location of current list in master list index
    let listIndex = {
        index: 0,
        get currentListIndex() {
            return this.index;
        },
        set currentListIndex(value) {
            this.index = value;
        }
    }
    const makeList = () => {masterList.push(
            Object.assign(
                Object.create(protoList), {listTitle: getListTitle()}, {toDoItems: []}
            )   
        );
        //clear title input field
        document.querySelector('#list-title').value = '';
        };
    return { makeList, listIndex };
};

//add listeners
//to submit btn
const submit = document.querySelector('.to-do-item-submit');
submit.addEventListener("click", getInputs);
//to new list submit button
const newListSubmit = document.querySelector('.new-list-submit-button');
newListSubmit.addEventListener("click", handleNewList);
//to show all lists button
const showAllListsBtn = document.querySelector('.show-all-lists');
showAllListsBtn.addEventListener("click", showAllLists);
//to new list btn
const newList = document.querySelector('.new-list-button');
newList.addEventListener("click", () => {
    document.querySelector('.new-list-form').style.display = "block";
});
//to pop up x out
const popupX = document.querySelector('.x-out');
popupX.addEventListener("click", closePopup);
//to save changes made to pop up
const saveChangesBtn = document.querySelector('.save-changes-button');
saveChangesBtn.addEventListener("click", saveChanges);

function handleNewList() {
    createNewList().makeList();
    createNewList().listIndex.currentListIndex = masterList.length - 1;
    document.querySelector('#list-title-header').innerHTML = masterList[createNewList().listIndex.currentListIndex].listTitle;
    clearContent();
    saveToLocal(createNewList().listIndex.currentListIndex ,masterList[createNewList().listIndex.currentListIndex]);
    document.querySelector('.new-list-form').style.display = "none";
};

function closePopup() {
    const popup = document.querySelector('.popup-div');
    popup.style.display = "none";
}

function saveChanges(event) {
    const itemIndex = event.target.value;
    const todoItemProperties = document.querySelectorAll('textarea');
    let inputValues = [];
    todoItemProperties.forEach(prop => {
        inputValues.push(prop.value);
    });
    const todoItem = masterList[createNewList().listIndex.currentListIndex].toDoItems[itemIndex];
    todoItem.title = inputValues[0];
    todoItem.dueDate = inputValues[1];
    todoItem.priority = inputValues[2];
    todoItem.description = inputValues[3];
    renderEdit(itemIndex, todoItem.title, todoItem.dueDate)
    const currentListIndex = createNewList().listIndex.currentListIndex;
    saveToLocal(currentListIndex, masterList[currentListIndex]);
    closePopup();
}

function renderEdit(itemIndex, editedTitle, editedDate) {
    const titleToEdit = document.querySelector(`#d${itemIndex} div:nth-child(2)`);
    const dateToEdit = document.querySelector(`#d${itemIndex} div:nth-child(3)`);
    titleToEdit.innerHTML = editedTitle;
    dateToEdit.innerHTML = editedDate;
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
    saveToLocal(listIndex, masterList[listIndex])
};

function showAllLists() {
    const contentDiv = document.querySelector('#content');
    clearContent();
    let masterListToRender = [];
    for (let i = 0; i < masterList.length; i++) {
        let el = document.createElement('button');
        el.textContent = masterList[i].listTitle;
        el.value = i;
        el.addEventListener("click", (event) => {
            clearContent();
            document.querySelector('#list-title-header').innerHTML = masterList[event.target.value].listTitle;
            showList(masterList[i])
            createNewList().listIndex.currentListIndex = i;
            }
        );
        masterListToRender.push(el);
    };
    masterListToRender.forEach(input => {
        contentDiv.append(input);
    });
};

function clearContent() {
    const contentChildNodeList = document.querySelectorAll('#content>*');
    contentChildNodeList.forEach(node => node.remove());
}

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

//given expand/ delete button click event, returns to do item index
function findItem(event) {
    const childrenOfItemDiv = event.target.parentNode.parentNode.children;
    const titleToSeachFor = childrenOfItemDiv.item(1).innerHTML;
    console.log(titleToSeachFor);
    const toDoItemsToSearch = masterList[createNewList().listIndex.currentListIndex].toDoItems;
    for (let i = 0; i < toDoItemsToSearch.length; i++) {
        if (toDoItemsToSearch[i].title === titleToSeachFor){
            return i;
        }
    }
}

function deleteItem(event) {
    const currentListIndex = createNewList().listIndex.currentListIndex;
    masterList[currentListIndex].toDoItems.splice(findItem(event), 1);
    const item = document.querySelector(`#d${event.target.value}`);
    item.remove();
    saveToLocal (currentListIndex, masterList[currentListIndex]);
}

function expandItem(event) {
    const popupDiv = document.querySelector('.popup-div');
    popupDiv.style.display = "flex";
    renderToPopup(findItem(event));
}

function isTitle (element, title) {
    return (element.title === title)
}

function renderToPopup(itemIndex) {
    const title = document.querySelector('.popup-item>#title');
    const titleText = masterList[createNewList().listIndex.currentListIndex].toDoItems[itemIndex].title;
    title.value = titleText;
    const dueDate = document.querySelector('.popup-item>#duedate');
    const dueDateText = masterList[createNewList().listIndex.currentListIndex].toDoItems[itemIndex].dueDate;
    dueDate.value = dueDateText;
    const priority = document.querySelector('.popup-item>#priority');
    const priorityText = masterList[createNewList().listIndex.currentListIndex].toDoItems[itemIndex].priority;
    priority.value = priorityText;
    const description = document.querySelector('.popup-item>#description');
    const descriptionText = masterList[createNewList().listIndex.currentListIndex].toDoItems[itemIndex].description;
    description.value = descriptionText;
    const saveButton = document.querySelector('.save-changes-button');
    saveButton.value = itemIndex;
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

function saveToLocal (listIndex, currentList) {
    //pass in current list
    const list = JSON.stringify(currentList);
    localStorage.setItem(`${listIndex}`, list);
}

const loadFromLocal = (() => {
    if (localStorage.length === 0) {
        //set default list
        return handleNewList();
    }
    for (let i = 0; i < localStorage.length; i++) {
        masterList.push(JSON.parse(localStorage.getItem(i)));
    }
})();