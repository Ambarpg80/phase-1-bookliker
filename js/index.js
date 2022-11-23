document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
	.then(res => res.json())
.then((books) =>  booksList(books)) 
});


 /* =========== LIST OF BOOK TITLES ============== */
function booksList(books){
    const ul = document.getElementById('list')

    for(let book of books){
        let li = document.createElement('li');
        li.innerHTML = book.title ;
        ul.append(li)

    li.addEventListener('click', ()=>{clickedBook(book)})    
    }
}


 /* =========== CLICK ON BOOKLIST FOR DETAILED INFO ============= */
function clickedBook(book){
    const bookDetail = document.querySelector('#show-panel')

    if(book){
        //console.log(book)
        let img = document.createElement('img');
        const description = document.createElement('p')
        const btn = document.createElement('button')
        bookDetail.innerHTML = '';
        img.src = `${book.img_url}` ; 
        description.innerHTML = book.description;
        //console.log(book['users'])
        bookDetail.append(img, description)
        book['users'].forEach(bookUser => {
            const userlist = document.createElement('p')
            userlist.innerText = bookUser['username'];
            bookDetail.append(userlist)
        })
        btn.innerHTML= `<img src="book.png">`
        btn.id = "like-book"
        btn.type = 'submit'
        bookDetail.append(btn)

        btn.addEventListener('click' , () =>{likeABook(book)})
        }
    }


     /* =========== UPDATE USERS IN DB ============= */
function likeABook(book){
fetch(`http://localhost:3000/books/${book.id}`,{
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
            },
        body : JSON.stringify(addAUserlike(book))
        })
    .then(res => res.json())
   .then(book  => clickedBook(book))
   
    }

    /* =========== ADD USER TO USERLIST ============ */
function addAUserlike(book){ 
   book["users"].push({"id" : 1,
       "username": "pouros"}) 
       return(book)
    }
   