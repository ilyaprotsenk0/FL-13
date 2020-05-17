const root = document.getElementById('root');

let form = document.createElement('form');
form.setAttribute('id', 'book-form');
form.classList.add('hidden');

function createInput (forVal, forText, nameVal, idVal, placeholderVal) {
    let inputWrap = document.createElement('div'),
        inputLabel = document.createElement('label'),
        input = document.createElement('input');

    inputWrap.append(inputLabel, input);
    inputLabel.setAttribute('for', forVal);
    input.setAttribute('name', nameVal);
    input.setAttribute('id', idVal);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholderVal);
    inputLabel.innerText = forText;
    form.appendChild(inputWrap);
}

createInput('book-name', 'Book name ','book-name', 'book-form-name', 'Enter book name');
createInput('book-author', 'Book author ', 'book-author', 'book-form-author', 'Enter book author');
createInput('book-plot', 'Book plot ', 'book-plot', 'book-form-plot', 'Enter book plot');
createInput('book-img', 'Book image ', 'book-img', 'book-form-img', 'Enter book image URL');

let formBtnWrap = document.createElement('div'),
    cancelBtn = document.createElement('input'),
    saveBtn = document.createElement('input');

    formBtnWrap.setAttribute('id', 'form-btn-wrap');
    saveBtn.setAttribute('type', 'button');
    saveBtn.setAttribute('id', 'save');
    saveBtn.setAttribute('value', 'Save');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.setAttribute('id', 'cancel-add-book');
    cancelBtn.setAttribute('value', 'Cancel');

    formBtnWrap.append(saveBtn, cancelBtn);
    form.appendChild(formBtnWrap);

let workSpace = document.createElement('div'),
    bookList = document.createElement('div'),
    actions = document.createElement('div'),
    preview = document.createElement('div');

workSpace.classList.add('work-space'); 
bookList.setAttribute('id', 'book-list');
actions.classList.add('actions');
preview.setAttribute('id', 'preview');
actions.append(preview, form);
workSpace.append(bookList, actions);

let interfaceWrap = document.createElement('div'),
    interFaceHeader = document.createElement('h1'),
    addBookBtn = document.createElement('button');

interfaceWrap.append(interFaceHeader, addBookBtn);
interfaceWrap.setAttribute('id', 'interface');
addBookBtn.setAttribute('id', 'add-book');
interFaceHeader.innerText = 'Book Shelf';
addBookBtn.innerText = 'Add book';

root.appendChild(interfaceWrap);
root.appendChild(workSpace);

let localStorageBooks = JSON.parse(localStorage.getItem('books'));
drawBookList(localStorageBooks);

addBookBtn.addEventListener('click', () => {
    history.pushState(null, null, `index.html#add`);
    saveBtn.classList.remove('save-edit');
    saveBtn.classList.add('save-add');
    document.getElementById('preview').classList.add('hidden');
    for (let i = 0; i < 4; i++) {
        document.forms[0][i].value = '';
    }
    form.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    if (saveBtn.className === 'save-edit') {
        let discard = window.confirm('Discard changes?');
        if (discard) {
            saveBtn.classList.remove('save-edit');
            form.classList.add('hidden');
        }
    } else if (saveBtn.className === 'save-add') {
        form.classList.add('hidden');
        saveBtn.classList.remove('save-add');
    }
});

let currentBook;
saveBtn.addEventListener('click', () => {
    form.classList.add('hidden');
    clearBookList();

    if (saveBtn.className === 'save-add') {
        localStorageBooks.push({
            bookName: document.getElementById('book-form-name').value,
            bookAuthor: document.getElementById('book-form-author').value,
            bookPlot: document.getElementById('book-form-plot').value,
            bookImage: document.getElementById('book-form-img').value
        });
        localStorage.setItem('books', JSON.stringify(localStorageBooks));
        saveBtn.classList.remove('save-add');
    } else {
        localStorageBooks[currentBook].bookName = document.getElementById('book-form-name').value;
        localStorageBooks[currentBook].bookAuthor = document.getElementById('book-form-author').value;
        localStorageBooks[currentBook].bookPlot = document.getElementById('book-form-plot').value;
        localStorageBooks[currentBook].bookImg = document.getElementById('book-form-img').value;
        localStorage.setItem('books', JSON.stringify(localStorageBooks));
        setTimeout(() => alert('Book successfully updated'), 300);
        history.pushState(null, null, `?id=${currentBook}#preview`);
        saveBtn.classList.remove('save-edit');
    }
    drawBookList(JSON.parse(localStorage.getItem('books')));
});

function clearBookList() {
    for (let i = 0; bookList.children.length; i++) {
        bookList.removeChild(bookList.children[0]);
    }
}

function drawBookList(obj) {
    for (let i = 0; i < obj.length; i++) {
        drawBook(i);
    }
}

function drawBook (id) {
    let bookListItem = document.createElement('div'),
        bookName = document.createElement('p'),
        editBtn = document.createElement('button');
    
    bookListItem.classList.add('book-list-item');
    bookListItem.setAttribute('id', `book-${id}`);
    bookName.classList.add('book-name');
    editBtn.classList.add('edit');
    
    bookListItem.append(bookName, editBtn);
    bookList.appendChild(bookListItem);

    bookName.innerText = localStorageBooks[id].bookName;
    editBtn.innerText = 'Edit';

    editBtn.addEventListener('click', function () {
        history.pushState(null, null, `?id=${id}#edit`);
        event.stopPropagation();
        document.getElementById('preview').classList.add('hidden');
        saveBtn.classList.add('save-edit');
        form.classList.remove('hidden');
        currentBook = event.target.parentNode.id.slice(5, 6);
        document.getElementById('book-form-name').value = localStorageBooks[id].bookName;
        document.getElementById('book-form-author').value = localStorageBooks[id].bookAuthor;
        document.getElementById('book-form-plot').value = localStorageBooks[id].bookPlot;
        document.getElementById('book-form-img').value = localStorageBooks[id].bookImage;
    });

    bookListItem.addEventListener('click', function () {
        history.pushState(null, null, `?id=${id}#preview`);
        document.getElementById('preview').classList.remove('hidden');
        form.classList.add('hidden');

        let previewWrap = document.createElement('div'),
            previewName = document.createElement('h3'),
            previewAuthor = document.createElement('p'),
            previewPlot = document.createElement('p'),
            previewImg = document.createElement('div');
    
        previewWrap.classList.add('preview-wrap');
        previewName.classList.add('preview-name');
        previewAuthor.classList.add('preview-author');
        previewPlot.classList.add('preview-plot');
        previewImg.classList.add('preview-img');
        
        previewName.innerText = localStorageBooks[id].bookName;
        previewAuthor.innerText = localStorageBooks[id].bookAuthor;
        previewPlot.innerText = localStorageBooks[id].bookPlot;
        previewImg.style.backgroundImage = `url('${localStorageBooks[id].bookImage}')`;
        
        previewWrap.append(previewName, previewAuthor, previewPlot, previewImg);
        !preview.childElementCount ? preview.appendChild(previewWrap) : preview.firstChild.replaceWith(previewWrap);
    });
}