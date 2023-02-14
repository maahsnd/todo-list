import default  from './list';
import { saveToLocal, masterList, currentListIndex } from './index.js';

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

export default item;