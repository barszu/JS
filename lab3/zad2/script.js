let stylesCache = {};
let mainContainerChildrenCache = [];
let usedChildrenNo = 0;

function setAllStyles(){
  const htmlObjects = document.querySelectorAll('body *');
  for (const html_object of htmlObjects)  {
    html_object.className = stylesCache[html_object];
  }
}

function deleteAllStyles(){
  const htmlObjects = document.querySelectorAll('body *');
  for (const html_object of htmlObjects)  {
    html_object.className = '';
  }
}

function addContainer(){
  const mainContainer = document.querySelector('main');
  if (usedChildrenNo < mainContainerChildrenCache.length) {
    mainContainer.appendChild(mainContainerChildrenCache[usedChildrenNo]);
    usedChildrenNo++;
    if (usedChildrenNo === mainContainerChildrenCache.length) {
      const button = document.getElementById('container-btn')
      button.disabled = true;
    }
  }
}


window.onload = function () {
  const htmlObjects = document.querySelectorAll('body *');
  for (const html_object of htmlObjects)  {
    stylesCache = {...stylesCache, [html_object]: html_object.className};
    html_object.className = '';
  }

  const mainContainer = document.querySelector('main');
  mainContainerChildrenCache = Array.from(mainContainer.children);
  console.log(mainContainerChildrenCache);
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  console.log(mainContainerChildrenCache);
}