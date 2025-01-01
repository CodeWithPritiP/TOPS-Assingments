const books = [
  { name: "Five Point Someone", author: "Chetan Bhagat", category: "Fiction", price: 290 },

  { name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Self-Help", price: 130 },

  { name: "The God of Small Things", author: "Arundhati Roy", category: "Non-Fiction", price: 900 },

  { name: "Train to Pakistan", author: "Khushwant Shinh", category: "Motivational", price: 400 },
  
  { name: "Malguddi Days", author: "R.K Narayan", category: "Child Book", price: 780 },

  { name: "Midnight Childern", author: "Salman Rushdie", category: "Fiction", price: 650 },

  { name: "My Gita", author: "Paulo Coelho", category: "Fiction", price: 200 },

  { name: "Azaadi ke liye padhai", author: "Jhumpa Laheri", category: "Child Book", price: 890 },

  { name: "A suitable Boy", author: "R.K Narayan", category: "Mystery", price: 730 },

  { name: "Clear Light of Day", author: "Vikram Sheth", category: "Science Fiction", price: 120 },
];

// Function to render books in the table
function renderBooks(filteredBooks) {
  const tableBody = document.getElementById("book-table");
  tableBody.innerHTML = ""; // Clear existing rows

  if (filteredBooks.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='4'>No books found</td></tr>";
    return;
  }

  filteredBooks.forEach((book) => {
    const row = `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${book.price}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

// Initial render of all books
renderBooks(books);

// Filter Logic
function applyFilters() {
  const authorFilters = Array.from(document.querySelectorAll(".author-filter:checked")).map(el => el.value);
  const categoryFilters = Array.from(document.querySelectorAll(".category-filter:checked")).map(el => el.value);
  const minPrice = document.getElementById("min-price").value ? parseInt(document.getElementById("min-price").value) : 0;
  const maxPrice = document.getElementById("max-price").value ? parseInt(document.getElementById("max-price").value) : Number.MAX_SAFE_INTEGER;

  const filteredBooks = books.filter(book => {
    const matchesAuthor = authorFilters.length === 0 || authorFilters.includes(book.author);
    const matchesCategory = categoryFilters.length === 0 || categoryFilters.includes(book.category);
    const matchesPrice = book.price >= minPrice && book.price <= maxPrice;

    return matchesAuthor && matchesCategory && matchesPrice;
  });

  renderBooks(filteredBooks);
}

// Add event listeners to filter inputs
document.querySelectorAll(".author-filter, .category-filter").forEach(input => {
  input.addEventListener("change", applyFilters);
});

document.getElementById("min-price").addEventListener("input", applyFilters);
document.getElementById("max-price").addEventListener("input", applyFilters);

