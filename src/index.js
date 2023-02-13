//globals
//proto list object
const protoList = {};
//array containing individual lists as objects
let masterList = [];
let currentListIndex = 0; 

//call getinputs, handle new list, showall lists, closepopup, save changes
const eventListeners = () => { 
    const submit = document.querySelector('.to-do-item-submit');
    submit.addEventListener("click", () => {list().getInputs()});
    const newListSubmit = document.querySelector('.new-list-submit-button');
    newListSubmit.addEventListener("click", () => {list().handleNewList()});
    const showAllListsBtn = document.querySelector('.show-all-lists');
    showAllListsBtn.addEventListener("click", () => {list().showAllLists()});
    const newList = document.querySelector('.new-list-button');
    newList.addEventListener("click", () => {
        document.querySelector('.new-list-form').style.display = "block";
    });
    const saveChangesBtn = document.querySelector('.save-changes-button');
    saveChangesBtn.addEventListener("click", () => {edit().saveChanges(event)});
    const closePopup = () => {
        const popup = document.querySelector('.popup-div');
        popup.style.display = "none";
    };
    const popupX = document.querySelector('.x-out');
    popupX.addEventListener("click", closePopup);
    return { closePopup }
};
//add event listeners
eventListeners();

// calls create new list, save to local, renderedit, closepopup
//called by event listener
const edit = () => {
    const saveChanges = (event) => {
        const itemIndex = event.target.value;
        const todoItemProperties = document.querySelectorAll('textarea');
        let inputValues = [];
        todoItemProperties.forEach(prop => {
            inputValues.push(prop.value);
        });
        const todoItem = masterList[currentListIndex].toDoItems[itemIndex];
        todoItem.title = inputValues[0];
        todoItem.dueDate = inputValues[1];
        todoItem.priority = inputValues[2];
        todoItem.description = inputValues[3];
        renderEdit(itemIndex, todoItem.title, todoItem.dueDate)
        saveToLocal(currentListIndex, masterList[currentListIndex]);
        eventListeners().closePopup();
    }
    const renderEdit = (itemIndex, editedTitle, editedDate) => {
        const content = document.getElementById('content');
        const titleToEdit = content.children[itemIndex].children[1];
        const dateToEdit = content.children[itemIndex].children[2];
        titleToEdit.innerHTML = editedTitle;
        dateToEdit.innerHTML = editedDate;
    }
    return { saveChanges }
}

//calls savetolocal, renderitemtodom
//called by getinputs, reliant on access to global masterlist, loadfromlocal, event handler
const list = () => {
    //variable to store location of current list in master list index
    const makeList = () => {masterList.push(
        Object.assign(
            Object.create(protoList), {listTitle: getListTitle()}, {toDoItems: []}
        )   
    );
    //clear title input field
    document.querySelector('#list-title').value = '';
    };
    const getInputs = () => {
        let inputs = document.querySelectorAll('fieldset > input');
        let inputValues = [];
        inputs.forEach(input => {
            inputValues.push(input.value);
            input.value = '';
        });
        addToList(inputValues);
        renderItemOnSubmit();
    };
    const renderItemOnSubmit = () => {
        let toDoItemList = masterList[currentListIndex].toDoItems;
        let itemIndex = toDoItemList.length - 1;
        DOM().renderItemToDom(toDoItemList[itemIndex], itemIndex);
    };
    const getListTitle = () => (document.querySelector('#list-title')).value;
    // add item to toDoItems array within to do list object
    const addToList = (todoItem) => {
        masterList[currentListIndex].toDoItems.push(
            {
                title: todoItem[0],
                dueDate: todoItem[1],
                priority: todoItem[2],
                description: todoItem[3]
            });
        saveToLocal(currentListIndex, masterList[currentListIndex])
    };
    const showAllLists = () => {
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
                currentListIndex = i;
                }
            );
            masterListToRender.push(el);
        };
        masterListToRender.forEach(input => {
            contentDiv.append(input);
        });
    };
    const showList = (list) => {
        for (let i = 0; i < list.toDoItems.length; i++) {
            DOM().renderItemToDom(list.toDoItems[i], i);
        }
    };
    const clearContent = () => {
        const contentChildNodeList = document.querySelectorAll('#content>*');
        contentChildNodeList.forEach(node => node.remove());
    };
    const handleNewList = () => {
        makeList();
        currentListIndex = masterList.length - 1;
        document.querySelector('#list-title-header').innerHTML = masterList[currentListIndex].listTitle;
        clearContent();
        saveToLocal(currentListIndex , masterList[currentListIndex]);
        document.querySelector('.new-list-form').style.display = "none";
    };
    return { addToList, showAllLists, showList, handleNewList, currentListIndex, getInputs}
}

//calls list, savetolocal
//called by expand item, delete item, renderitemtodom
const item = () => {
    //given expand/ delete button click event, returns to do item index
    const findItem = (event) => {
        const childrenOfItemDiv = event.target.parentNode.parentNode.children;
        const titleToSeachFor = childrenOfItemDiv.item(1).innerHTML;
        const toDoItemsToSearch = masterList[currentListIndex].toDoItems;
        for (let i = 0; i < toDoItemsToSearch.length; i++) {
            if (toDoItemsToSearch[i].title === titleToSeachFor){
                return i;
            }
        }
    };
    const deleteItem = (event) => {
        masterList[currentListIndex].toDoItems.splice(findItem(event), 1);
        const item = document.querySelector(`#d${event.target.value}`);
        item.remove();
        saveToLocal(currentListIndex, masterList[currentListIndex]);
    };
    const expandItem = (event) => {
        const popupDiv = document.querySelector('.popup-div');
        popupDiv.style.display = "flex";
        const itemToExpand = findItem(event);
        renderToPopup(itemToExpand);
    };
    const renderToPopup = (itemIndex) => {
        const title = document.querySelector('.popup-item>#title');
        const titleText = masterList[currentListIndex].toDoItems[itemIndex].title;
        title.value = titleText;
        const dueDate = document.querySelector('.popup-item>#duedate');
        const dueDateText = masterList[currentListIndex].toDoItems[itemIndex].dueDate;
        dueDate.value = dueDateText;
        const priority = document.querySelector('.popup-item>#priority');
        const priorityText = masterList[currentListIndex].toDoItems[itemIndex].priority;
        priority.value = priorityText;
        const description = document.querySelector('.popup-item>#description');
        const descriptionText = masterList[currentListIndex].toDoItems[itemIndex].description;
        description.value = descriptionText;
        const saveButton = document.querySelector('.save-changes-button');
        saveButton.value = itemIndex;
    };
    return { expandItem, deleteItem }
};

//calls expanditem, delete item
// called by renderitemonsubmit, showlist
//render inputs to DOM. Takes individual todo item object as input
const DOM = () => {
    const renderItemToDom = (taskInputs, itemIndex) => {
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
        expandBtn.addEventListener("click", () => {item().expandItem(event)});
        expandBtn.classList.add("expand-button")
        //delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Delete Item";
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-button");
        deleteBtn.value = itemIndex;
        deleteBtn.addEventListener("click", () => {item().deleteItem(event)});
        const btnDiv = document.createElement('div');
        btnDiv.classList.add("btn-div");
        btnDiv.append(expandBtn, deleteBtn)
        //gather elements to create to do item 
        itemDiv.append(checkBoxDiv, title, dueDate, btnDiv);
        itemDiv.id = `d${itemIndex}`;
        itemDiv.classList.add("todo-item-wrap");
        contentDiv.append(itemDiv);
    };
    const handleCheck = (event) => {
        let itemIndex = parseInt(event.target.id.slice(1))
        const checkedItemDiv = document.querySelector(`#d${itemIndex}`);
        event.target.checked ? checkedItemDiv.classList.add('checked') :
            checkedItemDiv.classList.remove('checked');
    };
    return { renderItemToDom }
};

//called by savechanges, delete item, handlenewlist, addtolist
function saveToLocal (listIndex, currentList) {
    //pass in current list
    const list = JSON.stringify(currentList);
    localStorage.setItem(`${listIndex}`, list);
}

const loadFromLocal = (() => {
    if (localStorage.length === 0) {
        //set default list
        return list().handleNewList;
    }
    for (let i = 0; i < localStorage.length; i++) {
        masterList.push(JSON.parse(localStorage.getItem(i)));
    }
})();