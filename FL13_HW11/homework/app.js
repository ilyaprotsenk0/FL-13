const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

let contextMenu = document.createElement('div');
let delOption = document.createElement('p'),
    renameOption = document.createElement('p');

delOption.innerText = 'Delete item';
renameOption.innerText = 'Rename'
contextMenu.classList.add('context-menu', 'closed');
delOption.setAttribute('id', 'delete');
renameOption.setAttribute('id', 'rename');
contextMenu.append(renameOption, delOption);
rootNode.append(contextMenu);

function drawTree (data, root) {
  const ul = document.createElement('ul');
  
  for ( let el of data ) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    p.innerText = el.title;
    p.prepend(icon);
    li.append(p);
    ul.append(li);
    
    if ( el.folder ) {
      p.classList.add('folder');
      icon.innerText = 'folder';
      if ( el.children ) {
        drawTree(el.children, li);
      } else {
        const empty = document.createElement('em');
        empty.innerText = 'Folder is empty';
        li.append(empty);
      }
    } else {
      p.classList.add('file');
      icon.innerText = 'insert_drive_file';
    }
  }
  root.append(ul);
  folderOpener();
  contextMenuOpener();
}

drawTree(data, rootNode);

function folderOpener () {
  let folders = document.getElementsByClassName('folder');
  
  for ( let folder of folders ) {
    folder.nextSibling.classList.add('closed');

    folder.onclick = function () {
      if ( folder.nextSibling.classList.value === 'closed' ) {
        folder.nextSibling.classList.remove('closed');
        folder.firstElementChild.textContent = 'folder_open';
      } else {
        folder.nextSibling.classList.add('closed');
        folder.firstElementChild.textContent = 'folder';
      }
    }
  }
}

function contextMenuOpener() {
  let paragraphs = document.getElementsByTagName('p');
  
  for (let p of paragraphs) {
    p.oncontextmenu = function (event) {
      event.preventDefault();
      contextMenu.classList.remove('closed');
      let x = event.pageX;
      let y = event.pageY;
      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;
    }
  }

  document.onclick = function () {
    contextMenu.classList.add('closed');
  }
}