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

function openFolder (data, root) {
  const ul = document.createElement('ul');
  
  for ( let el of data ) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    p.innerHTML = el.title;
    p.prepend(icon);
    li.append(p);
    ul.append(li);
    
    if ( el.folder ) {
      p.classList.add('folder');
      icon.innerHTML = 'folder';
      if ( el.children ) {
        openFolder(el.children, li);
      } else {
        const empty = document.createElement('em');
        empty.innerText = 'Folder is empty';
        li.append(empty);
      }
    } else {
      p.classList.add('file');
      icon.innerHTML = 'insert_drive_file';
    }
  }
  root.append(ul);
  enableInteractivity();
}

openFolder(data, rootNode);

function enableInteractivity() {
  let folders = document.getElementsByClassName('folder');

  for ( let folder of folders ) {
    folder.nextSibling.classList.add('closed');
    
    folder.onclick = function () {
      if ( folder.nextSibling.classList.value === 'closed' ) {
        folder.nextSibling.classList.remove('closed');
        folder.nextSibling.classList.remove('add');
      } else {
        folder.nextSibling.classList.remove('add');
        folder.nextSibling.classList.add('closed');
      }
    }
  }
}