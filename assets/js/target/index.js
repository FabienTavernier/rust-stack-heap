function updateTarget(content) {
  const parent = document.getElementById(content.parentID);

  if (content.reset) {
    parent.textContent = '';
  }
  
  const { tag, ...attributes } = content.element;

  const element = document.createElement(tag);
  Object.assign(element, attributes);
  
  parent.append(element);
}

function removeTarget(id) {
  document.getElementById(id).remove();
}

function addComment(comment) {
  document.getElementById('panel-comment').innerHTML = comment;
}

export { updateTarget, removeTarget, addComment };
