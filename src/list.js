import { saveToLocal, currentListIndex, masterList } from "./index";
import default  from './DOM';

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

export default list;