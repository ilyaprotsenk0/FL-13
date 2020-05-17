const root = document.getElementById('root');

// Отрисовка формы
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
createInput('book-year', 'Book year ', 'book-year', 'book-form-year', 'Enter book year');
createInput('book-img', 'Book image ', 'book-img', 'book-form-img', 'Enter book image URL');

let formBtnWrap = document.createElement('div'),
    cancelBtn = document.createElement('input'),
    confirmBtn = document.createElement('input');

    formBtnWrap.setAttribute('id', 'form-btn-wrap');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.setAttribute('id', 'confirm');
    confirmBtn.setAttribute('value', 'Confirm');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.setAttribute('id', 'cancel-add-book');
    cancelBtn.setAttribute('value', 'Cancel');

    formBtnWrap.append(confirmBtn, cancelBtn);
    form.appendChild(formBtnWrap);

// Создаем разделение экрана на две части (где отобр. карточки и где вылазят формы)
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

//Отрисовка шапки 
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

let books = [{
        bookName: 'Преступление и наказание',
        bookAuthor: 'Ф. М. Достоевский',
        bookYear: '1893',
        bookImage: 'https://img2.goodfon.ru/wallpaper/nbig/e/d5/anime-k-on-azusa-nakano-yui.jpg'
        },
        {
        bookName: 'Преступление и наказание',
        bookAuthor: 'Ф. М. Достоевский',
        bookYear: '1893',
        bookImage: 'https://img2.goodfon.ru/wallpaper/nbig/e/d5/anime-k-on-azusa-nakano-yui.jpg'
        },
        {
        bookName: 'Преступление и наказание',
        bookAuthor: 'Ф. М. Достоевский',
        bookYear: '1893',
        bookImage: 'https://img2.goodfon.ru/wallpaper/nbig/e/d5/anime-k-on-azusa-nakano-yui.jpg'
        }];

// Отрисовка данных из localStorage
localStorage.getItem('books') ?
books = JSON.parse(localStorage.getItem('books')) : 
localStorage.setItem('books', JSON.stringify(books));

drawBookList(JSON.parse(localStorage.getItem('books')));

// Появление формы при нажатии на кнопку добавить

addBookBtn.addEventListener('click', () => {
    confirmBtn.classList.remove('confirm-edit');
    confirmBtn.classList.add('confirm-add');
    document.getElementById('preview').classList.add('hidden');
    for (let i = 0; i < 4; i++) {
        document.forms[0][i].value = '';
    }
    form.classList.remove('hidden');
});

// Скрываем форму при нажатии на кнопку отменить

cancelBtn.addEventListener('click', () => {
    form.classList.add('hidden');
});

// Отрисовка нового массива при подтверждении добавления
let currentBook;

// Очистка предыдущих блоков -> Добавление/изменение данных в массиве -> Отрисовка новых данных
confirmBtn.addEventListener('click', () => {
    form.classList.add('hidden');
    clearBookList();

    if (confirmBtn.className === 'confirm-add') {
        books.push({
            bookName: document.getElementById('book-form-name').value,
            bookAuthor: document.getElementById('book-form-author').value,
            bookYear: document.getElementById('book-form-year').value,
            bookImage: document.getElementById('book-form-img').value
        });
        localStorage.setItem('books', JSON.stringify(books));
        confirmBtn.classList.remove('confirm-add');
    } else {
        books[currentBook].bookName = document.getElementById('book-form-name').value;
        books[currentBook].bookAuthor = document.getElementById('book-form-author').value;
        books[currentBook].bookYear = document.getElementById('book-form-year').value;
        books[currentBook].bookImg = document.getElementById('book-form-img').value;
        localStorage.setItem('books', JSON.stringify(books));
        confirmBtn.classList.remove('confirm-edit');
    }
    drawBookList(JSON.parse(localStorage.getItem('books')));
});

// Функция очистки страницы (удаление всех существующих блоков, исп. перед отрисовкой новых)
function clearBookList() {
    for (let i = 0; bookList.children.length; i++) {
        bookList.removeChild(bookList.children[0]);
    }
}

// Функция отрисовки всех элементов массива
function drawBookList(obj) {
    for (let i = 0; i < obj.length; i++) {
        drawBook(i);
    }
}

// Функция отрисовки одного элемента массива
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

    bookName.innerText = books[id].bookName;
    editBtn.innerText = 'Edit';

    // Заполнение инпутов формы данными из массива
    editBtn.addEventListener('click', function () {
        event.stopPropagation();
        document.getElementById('preview').classList.add('hidden');
        confirmBtn.classList.add('confirm-edit');
        form.classList.remove('hidden');
        currentBook = event.target.parentNode.id.slice(5, 6);
        document.getElementById('book-form-name').value = books[id].bookName;
        document.getElementById('book-form-author').value = books[id].bookAuthor;
        document.getElementById('book-form-year').value = books[id].bookYear;
        document.getElementById('book-form-img').value = books[id].bookImage;
    });

    // Отрисовка превью книги
    bookListItem.addEventListener('click', function () {
        document.getElementById('preview').classList.remove('hidden');
        form.classList.add('hidden');

        let previewWrap = document.createElement('div'),
            previewName = document.createElement('h3'),
            previewAuthor = document.createElement('p'),
            previewYear = document.createElement('p'),
            previewImg = document.createElement('div');
    
        previewWrap.classList.add('preview-wrap');
        previewName.classList.add('preview-name');
        previewAuthor.classList.add('preview-author');
        previewYear.classList.add('preview-year');
        previewImg.classList.add('preview-img');
        
        previewWrap.append(previewName, previewAuthor, previewYear, previewImg);
        
        previewName.innerText = books[id].bookName;
        previewAuthor.innerText = books[id].bookAuthor;
        previewYear.innerText = books[id].bookYear;
        previewImg.style.backgroundImage = `url('${books[id].bookImage}')`;

        // Если в блоке уже содержится нода, заменить ее на новую
        !preview.childElementCount ? preview.appendChild(previewWrap) : preview.firstChild.replaceWith(previewWrap);
    });
}