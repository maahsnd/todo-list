import eventListeners from './eventListeners';
import edit from './edit';
import DOM from './dom';
import item from './item';
import list from './list';
//globals
//proto list object
const protoList = {};
//array containing individual lists as objects
let masterList = [];
let currentListIndex = 0;

//called by savechanges, delete item, handlenewlist, addtolist
function saveToLocal(listIndex, currentList) {
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

export { protoList, masterList, currentListIndex, saveToLocal };