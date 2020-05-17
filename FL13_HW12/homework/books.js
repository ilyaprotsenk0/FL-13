let books = [{
    bookName: 'A Wrinkle in Time',
    bookAuthor: `Madeleine L'Engle`,
    bookPlot: 'It was a dark and stormy night; Meg Murry, her small brother Charles Wallace, and her mother had',
    bookImage: 'https://images-na.ssl-images-amazon.com/images/I/41ojAS1IpsL._SX275_BO1,204,203,200_.jpg'
    },
    {
    bookName: `The Classic Treasury of Aesop's Fables`,
    bookAuthor: 'Aesop',
    bookPlot: 'Get in step with the colorful animals that race, waddle, and leap through these pages!',
    bookImage: 'https://images-na.ssl-images-amazon.com/images/I/61LWfFWoiiL._SX378_BO1,204,203,200_.jpg'
    },
    {
    bookName: 'Bridge to Terabithia',
    bookAuthor: 'Katherine Paterson',
    bookPlot: 'Jess Aarons has been practicing all summer so he can be the fastest runner in the fifth grade. And he',
    bookImage: 'https://images-na.ssl-images-amazon.com/images/I/61bAjZpm+hL._SX307_BO1,204,203,200_.jpg'
}];

if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(books));
}