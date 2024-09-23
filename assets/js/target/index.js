function updateTarget(content) {
  if (!Array.isArray(content)) {
    content = [content];
  }

  for (const c of content) {
    const parent = document.getElementById(c.parentID);

    if (c.reset) {
      parent.textContent = '';
    }
    
    const { tag, ...attributes } = c.element;

    const element = document.createElement(tag);
    Object.assign(element, attributes);
    
    parent.append(element);
  }
}

function removeTarget(id) {
  document.getElementById(id).remove();
}

function addComment(comment) {
  document.getElementById('panel-comment').innerHTML = comment;
}

export { updateTarget, removeTarget, addComment };
