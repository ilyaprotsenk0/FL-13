const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const usersList = document.getElementById('users-list');
const GET_STATUS = 200,
      POST_STATUS = 201,
      PUT_STATUS = 204,
      DELETE_STATUS = 204;

const cleanUsersList = () => {
    while (usersList.children.length) {
        usersList.removeChild(usersList.children[0]);
    }
}

const enableEditDelButtons = () => {
    const updateBtns = document.getElementsByClassName('update');
    for (const updateBtn of updateBtns) {
        updateBtn.addEventListener('click', () => {
            const currentUserId = updateBtn.parentNode.id;
            editUser(currentUserId);
        });
    }

    const deleteBtns = document.getElementsByClassName('delete');
    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', () => {
            const currentUserId = deleteBtn.parentNode.id;
            deleteUser(currentUserId);
        });
    }
};

const drawUsersList = (obj) => {
    cleanUsersList();
    for (const person of obj) {
        let personInfoWrap = document.createElement('div'),
            personId = document.createElement('span'),
            inputPersonName = document.createElement('input'),
            inputPersonUserName = document.createElement('input'),
            updateBtn = document.createElement('button'),
            deleteBtn = document.createElement('button');
        
        personId.innerText = person.id;
        inputPersonName.value = person.name;
        inputPersonUserName.value = person.username;
        updateBtn.innerText = 'Update';
        deleteBtn.innerText = 'Delete';

        personInfoWrap.setAttribute('id', person.id);
        updateBtn.classList.add('update');
        deleteBtn.classList.add('delete');
        
        personInfoWrap.append(personId, inputPersonName, inputPersonUserName, updateBtn, deleteBtn);
        usersList.appendChild(personInfoWrap);
    }
    enableEditDelButtons();
};

const getUsers = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${baseUrl}/users/`);
    xhr.responseType = 'json';

    xhr.onprogress = () => {
        document.getElementById('loading').style.display = 'block';
    }

    xhr.onload = () => {
        xhr.status === GET_STATUS ? drawUsersList(xhr.response) : console.error(xhr.response);
        document.getElementById('loading').style.display = 'none';
    };
    xhr.send();
};

window.addEventListener('load', getUsers);

const addUser = () => {
    const body = {
        name: `${document.forms.addNewUser.userName.value}`,
        username: `${document.forms.addNewUser.fullUserName.value}`
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseUrl}/users/`);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
    
    xhr.onprogress = () => {
        document.getElementById('addBtn').disabled = true;
    }
    
    xhr.onload = () => {
        xhr.status === POST_STATUS ? getUsers() : console.error(xhr.response);
        document.getElementById('addBtn').disabled = false;
    };
    xhr.send(JSON.stringify(body));
};

document.getElementById('addBtn').addEventListener('click', addUser);

const editUser = (id) => {
    const body = {
        name: `${document.getElementById(id).children[1].value}`,
        username: `${document.getElementById(id).children[2].value}`
    }

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${baseUrl}/users/${id}/`);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = () => {
        xhr.status === PUT_STATUS ? getUsers() : console.error(xhr.response);
    };
    xhr.send(JSON.stringify(body));
};

const deleteUser = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${baseUrl}/users/${id}/`);
    xhr.setRequestHeader('Authorization' , 'admin');
    
    xhr.onload = () => {
        xhr.status === DELETE_STATUS ? getUsers() : console.error(xhr.response);
    };
    xhr.send(JSON.stringify(id));
};