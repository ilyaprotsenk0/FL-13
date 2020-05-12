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

function drawTree () {

  function createTree (data, root) {
    const ul = document.createElement('ul');
    
    for ( let el of data ) {
      const li = document.createElement('li');
      const p = document.createElement('p');
      const icon = document.createElement('i');
      const wrap = document.createElement('div');
      const input = document.createElement('input');
      input.classList.add('closed');
      wrap.classList.add('wrap');
      icon.classList.add('material-icons');
      p.innerText = el.title;
      wrap.prepend(icon, input, p);
      li.append(wrap);
      ul.append(li);
      
      if ( el.folder ) {
        wrap.classList.add('folder');
        icon.innerText = 'folder';
        if ( el.children ) {
          createTree(el.children, li);
        } else {
          const empty = document.createElement('em');
          empty.innerText = 'Folder is empty';
          li.append(empty);
        }
      } else {
        wrap.classList.add('file');
        icon.innerText = 'insert_drive_file';
      }
    }
    root.append(ul);
  }
  createTree(data, rootNode);
  addFoldersAction();
  addContextMenu();
}

function addFoldersAction () {
  let folders = document.getElementsByClassName('folder');
  
  for ( let folder of folders ) {
    folder.nextSibling.classList.add('closed');

    folder.onclick = function () {
      if ( folder.nextSibling.classList.value === 'closed' ) {
        folder.nextSibling.classList.remove('closed');
        folder.firstElementChild.innerText = 'folder_open';
      } else {
        folder.nextSibling.classList.add('closed');
        folder.firstElementChild.innerText = 'folder';
      }
    }
  }
}

let contextMenu = document.createElement('div'),
    delOption = document.createElement('p'),
    renameOption = document.createElement('p');

delOption.innerText = 'Delete item';
renameOption.innerText = 'Rename';

contextMenu.classList.add('context-menu', 'closed');
delOption.setAttribute('id', 'delete');
renameOption.setAttribute('id', 'rename');

contextMenu.append(renameOption, delOption);
rootNode.append(contextMenu);

function addContextMenu() {
  let filesAndFoldersNames = document.getElementsByClassName('wrap');

  for (let name of filesAndFoldersNames) {
    
    name.oncontextmenu = function (event) {
      event.preventDefault();
      contextMenu.classList.remove('closed');
      let x = event.pageX;
      let y = event.pageY;
      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;
      
      let input = name.children[1],
          p = name.lastElementChild;

      contextMenu.onclick = function (event) {
      
        if ( event.target.id === 'rename' ) {
          input.classList.remove('closed');
          p.classList.add('closed');
        } else if ( event.target.id === 'delete' ) {
          name.parentNode.classList.add('closed');
        }
      }

      document.onclick = function () {
        contextMenu.classList.add('closed');

        if ( input.value ) {
          p.innerText = input.value;
          input.classList.add('closed');
          p.classList.remove('closed');
          input.value = '';
        }
      }
    }
  }
}

drawTree();