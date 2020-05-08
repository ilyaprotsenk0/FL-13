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

const openFolder = (item, root) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = item.title;
  li.appendChild(span);

  if ( item.folder ) {
    if ( item.children ) {
      for (const element of item.children) {
        openFolder(element, root);
      }
    } 
  }
  root.appendChild(li);
};

for (const element of data) {
  openFolder(element, rootNode);
}