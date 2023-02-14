import default from './list'
import default from './eventListeners';
import { masterList, currentListIndex, saveToLocal } from './index';

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

export default edit;