import axios from "axios";

export default {
  // Gets all books
  getBooks: function (query) {
    return axios.get("/api/google", {
      params: { q: "title:" + query }
    });
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/google/" + id);
  },
  // Get Saved books
  // Gets all saved books
  getSavedBooks: function () {
    return axios.get("/api//books");
  },

  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    console.log("API:",bookData);
    return axios.post("/api/books", bookData);
  }
};