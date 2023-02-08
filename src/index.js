function getInputs() {
        let inputs = document.querySelectorAll('.to-do-item > input');
        let inputValues = [];
        inputs.forEach(input => {
            inputValues.push(input.value);
        });
        //call to render to DOM
        renderToDom(inputValues);
        addToList(currentListIndex, inputValues);
    };

//list object
const protoList = {};
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
                Object.create(protoList), {listTitle: getListTitle()}, {toDoItems: []}
            )   
        );
        setCurrentListIndex();
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
    masterList.forEach(input => {
        let el = document.createElement('button');
        el.textContent = input.listTitle;
        el.addEventListener("click", () => {
            showList(input)}
        );
        masterListToRender.push(el);
    });
    masterListToRender.forEach(input => {
        contentDiv.append(input);
    });
};

//show list function
function showList(list) {
    list.toDoItems.forEach( item => renderToDom(item));
}

//render inputs to DOM. Takes individual todo item object as input
function renderToDom(taskInputs) {
    const contentDiv = document.querySelector('#content');
    const title = document.createElement('div');
    title.innerHTML = taskInputs.title;
    const dueDate = document.createElement('div');
    dueDate.innerHTML = taskInputs.dueDate;
    const priority = document.createElement('div');
    priority.innerHTML = taskInputs.priority;
    const description = document.createElement('div');
    description.innerHTML = taskInputs.description;
    contentDiv.append(title, dueDate, priority, description);
};
//add to list
//render last item of list