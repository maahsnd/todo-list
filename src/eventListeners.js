import default from './edit';
import default  from './list';

const eventListeners = (() => { 
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
})();

export default eventListeners;