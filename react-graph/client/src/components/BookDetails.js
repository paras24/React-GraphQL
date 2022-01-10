import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from '../queries/sharedQueries'


class BookDetails extends Component {
    constructor(props) {
        super(props)
    }

    displayBookDetails() {
        const { book } = this.props.data
        if (book) {
            return (<div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All Books by this Author:</p>
                <ul className="other-books">
                    {book.author.books.map(book => {
                        return (<li key={book.id}>{book.name}</li>)
                    })}
                </ul>
            </div>)
        }
        else {
            return (<div>No Book Selected.....</div>)
        }

    }

    render() {      
        return (
            <div id="book-details">              
                {this.displayBookDetails()}
            </div>
        )
    };
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
