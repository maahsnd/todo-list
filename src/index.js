function getInputs() {
        let inputs = document.querySelectorAll('.to-do-item > input');
        let inputValues = [];
        inputs.forEach(input => {
            inputValues.push(input.value);
        });
        //call to render to DOM
        renderToDom(inputValues);
        addToList(inputValues);
    };

//list object
const protoList = {
    toDoItems: []
};
//master list or list of lists
let masterList = [];
//variable to store location of current list in master list index
let currentListIndex;
//create new list
const createNewList = () => {
    const getListTitle = () => (document.querySelector('#list-title')).value;
    const setCurrentListIndex = () => currentListIndex = masterList.length - 1;
    const makeList = () => {masterList.push(
            Object.assign(
                Object.create(protoList), {title: getListTitle()}
            )   
        );
        setCurrentList();
        //clear title input field
        document.querySelector('#list-title').value = '';
        };
    return { makeList };
};

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

// add item to list
function addToList (list, todoItem) {
    list.push(todoItem);
};

//render inputs to DOM
function renderToDom(taskInputs) {
    const contentDiv = document.querySelector('#content');
    const title = document.createElement('div');
    title.innerHTML = taskInputs[0];
    const dueDate = document.createElement('div');
    dueDate.innerHTML = taskInputs[1];
    const priority = document.createElement('div');
    priority.innerHTML = taskInputs[2];
    const description = document.createElement('div');
    description.innerHTML = taskInputs[3];
    contentDiv.append(title, dueDate, priority, description);
};
//add to list
//render last item of list