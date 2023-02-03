import todoItem from './todoItem';


const newTodo = todoItem('website','asap', 'medium-high', 'finish this thing');
const item2 = todoItem('1','2','3','4');
const list1 = []
list1.push(newTodo);
list1.push(item2);
console.log(list1);