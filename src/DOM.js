import default from "./item";

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