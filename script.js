class book{
    constructor(title='unknown',author='unknown',pages=0,isRead=false){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isRead= isRead;
    }
}

class library{
    constructor(){
        this.books=[];
    }

    addNewBook(newBook) {
        if (!this.books.some(book => book.title === newBook.title)) {
          this.books.push(newBook);
        }
      }

    removeBook(rB){
        this.books.remove((book)=> book.title==rB);
    }

    getBook(gB){
        this.books.find((book)=> book.title==gB);
    }
}

const storedLibString = localStorage.getItem('libString');
const lib = new library();

if(storedLibString){
    lib.books = JSON.parse(storedLibString);
    console.log("old lib");
}else{
console.log("new lib")
}

//UI

const add=document.getElementById('add');
const dialog=document.getElementById('dialog');
const close=document.getElementById('close');
const submit=document.getElementById('submit');

dialog.close();


add.addEventListener('click',function(){
    dialog.showModal();
    dialog.style.display='flex';
})

close.addEventListener('click',function(){
    dialog.close();
    dialog.style.display='none';
})

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var title =document.getElementById('bookname'),
      authorname=document.getElementById('authorname'),
      pages=document.getElementById('pages'),
      readstatus=document.getElementById('readStatus');

      const b1=new book(title.value,authorname.value,pages.value,readstatus.value);

      lib.addNewBook(b1);
      console.log(lib);

      dialog.close();  
      dialog.style.display='none'; 

});

function generateUI() {
    const libraryContainer = document.getElementById('library');

    libraryContainer.innerHTML = '';
  
    lib.books.forEach((element) => {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const titleElement = document.createElement('h2');
      titleElement.innerText = `${element.title}`;
      
      const authorElement = document.createElement('h3');
      authorElement.innerText = `Author: ${element.author}`;
      
      const pageElement = document.createElement('h4');
      pageElement.innerText = `Pages: ${element.pages}`;


      const d=document.createElement('button');
      d.classList.add('delete');

      
      // Append the title, author, and page elements to the book div
      card.appendChild(titleElement);
      card.appendChild(authorElement);
      card.appendChild(pageElement);
  
      // Append the book div to the library container
      libraryContainer.appendChild(card);
      save();
    });
  }
  
  generateUI();

  function save(){
    const libString = JSON.stringify(lib.books);
    localStorage.setItem('libString', libString);
  }
  
  setInterval(generateUI, 2000);