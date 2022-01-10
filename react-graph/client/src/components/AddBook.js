import React, { Component } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright"
import { getAuthorsQuery,addBookMutation,getBooksQuery } from '../queries/sharedQueries'

class AddBook extends Component {
    constructor(props) {
      super(props);
        
      this.state ={
          name:'',
          genre:'',
          authorId:''
      }
      this.handleFormChange = this.handleFormChange.bind(this)
    }
   

    handleFormChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    displayAuthor() {
        var data = this.props.getAuthorsQuery        
        if (data.loading) {
            return (<option>Loading Authors...</option>)
        }
        else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}> {author.name}</option>);
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        });
    }

    render() {
        const {name,genre} = this.state       
        return (
            <form id="add-book" onSubmit = {this.submitForm.bind(this)}>
                <h3 id ="book-heading"><label>Add Book</label></h3>
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" name='name' value = {name} onChange = {this.handleFormChange}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name='genre' value = {genre} onChange = {this.handleFormChange}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name='authorId' onChange = {this.handleFormChange}>
                        <option>Select author</option>
                        {this.displayAuthor()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    };
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook)

