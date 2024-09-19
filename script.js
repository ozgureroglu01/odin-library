const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".openAddForm");
const closeButton = document.querySelector("#close-btn");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});


const addBook = document.querySelector(".addBook");
const authorInput = document.querySelector("#author");
const bookTitleInput = document.querySelector("#title");
const pageNumInput = document.querySelector("#pageNum");
const isReadInput = document.querySelector("#isRead");
const bookGrid = document.querySelector(".container");

addBook.addEventListener("click", addBookToLibrary);


let myLibrary = [];

function Book(title, author, pageNumber, isread, id) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.isread = isread;
    this.id = id;
    this.info = function () {
        console.log('Title: ' + this.title + ', Author: ' + this.author + ', Pages: ' + this.pageNumber + ' Read: ' + this.isread);
    }
}

function readStateOfCheckbox() {
    return isReadInput.checked ? "Yes" : "No";
}




function addBookToLibrary() {
    myLibrary.push(new Book(bookTitleInput.value, authorInput.value, pageNumInput.value, readStateOfCheckbox(), myLibrary.length));
    bookGrid.innerHTML = "";

    if (!bookTitleInput.value || !authorInput.value || !pageNumInput.value) {
        alert('Please fill in all fields.');
        return;
    }

    myLibrary.forEach(book => {
        const bookContainerDiv = document.createElement("div");
        bookContainerDiv.classList.add("book");
        bookContainerDiv.setAttribute("id", `book-${book.id}`);

        const titleH2 = document.createElement("h2");
        titleH2.classList.add("bookTitle");
        titleH2.innerText = book.title;

        const pAuthor = document.createElement("p");
        pAuthor.classList.add("authorName");
        pAuthor.innerText = `Author: ${book.author}`;

        const page = document.createElement("p");
        page.classList.add("bookPage");
        page.innerText = `Page Number: ${book.pageNumber}`;

        const read = document.createElement("p");
        read.classList.add("read");
        read.innerText = `Have You Read It: ${book.isread}`;

        const toggleRead = document.createElement("button");
        toggleRead.classList.add("toggleRead");
        toggleRead.innerText = "Toggle Read Value";
        toggleRead.addEventListener("click", () => {
            book.isread = (book.isread === "Yes") ? "No" : "Yes";
            read.innerText = `Have You Read It: ${book.isread}`;
            console.log(myLibrary);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            bookContainerDiv.remove();
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            console.log(myLibrary);
        });


        bookContainerDiv.appendChild(titleH2);
        bookContainerDiv.appendChild(pAuthor);
        bookContainerDiv.appendChild(page);
        bookContainerDiv.appendChild(read);
        bookContainerDiv.appendChild(toggleRead);
        bookContainerDiv.appendChild(deleteBtn);
        bookGrid.appendChild(bookContainerDiv);
    });

}


