const processItem = () => {
  const item = document.querySelectorAll('input')
  const title = item[0];
  const dueDate = item[1];
  const priority = item[2];
  const description = item[3];
  todoItem(title, dueDate, priority, description);
}