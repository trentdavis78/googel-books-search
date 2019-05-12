import React, { Component } from "react";
import Banner from "../components/Banner";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import Book from "../components/Book";

class Search extends Component {
  state = {
    books: [],
    q: ""
  };

  //componentDidMount() {
  //   this.loadBooks();
  // }

  loadBooks = () => {
    console.log(this.state.q);
    API.getBooks(this.state.q)
      .then( 
       res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  handleSubmitClick= event =>{
    event.preventDefault();
    console.log("SearchingFor:",this.state.q);
    this.loadBooks();
  };

  handleInputChange = event => {
    const {  value } = event.target;
    console.log("q:",value);
    this.setState({
      q: value
    });
  };

  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.loadBooks());
  };

  render() {
    return (
      <div className="container">
          <Banner/>
          <div className="text-center">
            <form className="form-inline">
                <Input name="title" placeholder="Enter a Book"  onChange={this.handleInputChange}  q={this.state.q}/>
                <FormBtn onClick={this.handleSubmitClick} > Submit Book</FormBtn>
            </form>
          </div>
          <div className="row">
          <div className="col-10 col-centered card-content mb-4">
            <h1 className="heading-title mx-sm-3 mb-2 text-center">Results</h1>

            {this.state.books.length ? (
              <ul className="list-group">
                {this.state.books.map(book => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        onClick={() => this.handleBookSave(book.id)}
                        className="btn save-button  heading-subtitle ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
            </ul>
            ) : (
              <div className="mockup-content">
                <h2 className="heading-title text-center">
                  {this.state.message}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
