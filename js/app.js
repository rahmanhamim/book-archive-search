const loadBookData = () => {
 const searchField = document.getElementById("search-field");
 searchValue = searchField.value;
 // clear search value
 searchField.value = "";
 // fetch data
 fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
  .then((res) => res.json())
  .then((data) => displayResults(data.docs));
};

const displayResults = (books) => {
 // all search result container
 const resultContainer = document.getElementById("result-container");
 // total result number container
 const totalResultNumber = document.getElementById("total-result");

 // clear inner HTML
 resultContainer.textContent = "";
 totalResultNumber.textContent = "";

 // check if result available
 if (books.length === 0) {
  resultContainer.innerHTML = `<h1 class='text-center text-danger mx-auto'>No result found</h1>`;
 } else {
  // loop & append child
  books.forEach((book) => {
   // check cover image available or not
   if (book.cover_i === undefined) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
   <div class="card h-100">
       <img src="./image/dummy-book.png" style="height: 450px" alt="..." />
       <div class="card-body">
        <h3 class="card-title">${book.title}</h3>
        <h5>${
         book.author_name ? book.author_name[0] : "Author Name Not Found"
        }</h5>
        <p class="card-text">
         First Publish date: ${
          book.publish_date ? book.publish_date[0] : "Not Found"
         }
        </p>
        <p class="card-text">
         Publisher: ${book.publisher ? book.publisher[0] : "Not Found"}
        </p>
       </div>
      </div>
  `;
    resultContainer.appendChild(div);
   }
   // if image is available
   else {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
   <div class="card h-100">
       <img src="https://covers.openlibrary.org/b/id/${
        book.cover_i
       }-M.jpg" class="card-img-top" style="height: 450px" alt="..." />
       <div class="card-body">
        <h3 class="card-title">${book.title}</h3>
        <h5>${
         book.author_name ? book.author_name[0] : "Author Name Not Found"
        }</h5>
        <p class="card-text">
         First Publish date: ${
          book.publish_date ? book.publish_date[0] : "Not Found"
         }
        </p>
        <p class="card-text">
         Publisher: ${book.publisher ? book.publisher[0] : "Not Found"}
        </p>
       </div>
      </div>
  `;
    resultContainer.appendChild(div);
   }
  });
 }
 // total number of result
 const totalResultDiv = document.createElement("div");
 totalResultDiv.innerHTML = `
      <h1 class="text-center text-danger my-5 shadow-text">Total Result Found: ${books.length}</h1>
 `;
 totalResultNumber.appendChild(totalResultDiv);
};
