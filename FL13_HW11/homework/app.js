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
  
  for (let el of data) {
    
    const li = document.createElement('li');
    const span = document.createElement('span');
    
    span.innerHTML = el.title;
    li.append(span);
    ul.append(li);
    
    if ( el.folder ) {
      if ( el.children ) {
        openFolder(el.children, li);
      } else {
        const empty = document.createElement('span');
        empty.innerHTML = 'Folder is empty';
        li.append(empty);
      }
    }
  }
  root.append(ul);
}

openFolder(data, rootNode);