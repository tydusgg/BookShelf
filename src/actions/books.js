import {GET_BOOKS} from './types';

import firebase from 'firebase/app';

// Get all books
export const GetBooks = (id) => dispatch => {

    const userDataRef = firebase.firestore().collection('data').doc(id);

    userDataRef.collection('library').doc('empty').set({info:{id: 0}}, {merge: true});

    userDataRef.collection('library')
    .get().then(
        (querySnapshot) => {
            let library = []
            querySnapshot.forEach((doc) => {
                library.push(doc.data())
                library = library.filter(cat => cat.info.id !== 0)
            });
            dispatch({
                type: GET_BOOKS,
                payload: library
            })
    }).catch((error) => {
        console.log(error.message);
    });
};

// Add new category
export const AddNewCategory = (id, formData, length) => dispatch => {
    const {category, color} = formData;

    const userLibraryRef = firebase.firestore().collection('data').doc(id).collection('library');
    const userDataRef = firebase.firestore().collection('data').doc(id);

    debugger
    const newLength = Number.parseInt(length)+1
    userDataRef.set({
        length: newLength
    }, {merge: true})

    userLibraryRef.doc(`${newLength}`).set({
        books: [],
        info: {
            title: category,
            color: color,
            id: newLength,
            length: 0
        }
    }, {merge: true})
};

// Add new book
export const AddNewBook = (id,  catId, booksList, formData) => dispatch => {
    const {title, author} = formData;

    const categoryRef = firebase.firestore().collection('data').doc(id).collection('library').doc(`${catId}`);

    const length = booksList.find(category => category.info.id === catId)

    const books = booksList.find(category => category.info.id === catId).books;
    console.log(books)
    const bookId=books.length+1;

    categoryRef.set({
        books: [...books,  {
            title: title,
            author: author,
            id: bookId,
            status: 0,
            rating: 0,
            summary: ''
        }]
    }, {merge: true})
};

// Edit book 
export const EditBookInfo = (id, catId, bookId, books, book) => dispatch => {
    const categoryRef = firebase.firestore().collection('data').doc(id).collection('library').doc(`${catId}`);

    books[bookId] = book;

    categoryRef.set({
        books: books
    }, {merge: true})
};

// Delete book
export const DeleteBook = (id, catId, bookId, books) => dispatch => {
    const categoryRef = firebase.firestore().collection('data').doc(id).collection('library').doc(`${catId}`);

    let book = books.find(book => book.id ===bookId);

    console.log(books.indexOf(book))
    debugger
    books.splice(books.indexOf(book), 1);

    categoryRef.set({
        books: books
    }, {merge: true})

};

// Delete category
export const DeleteCategory = (id, catId) => dispatch => {
    const categoryRef = firebase.firestore().collection('data').doc(id).collection('library').doc(`${catId}`)

    categoryRef.delete()
};