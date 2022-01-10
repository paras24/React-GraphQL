import React, { Component } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright"
import { getAuthorsQuery,addAuthorMutation,getBooksQuery } from '../queries/sharedQueries'

class AddAuthor extends Component {
    constructor(props) {
      super(props);
        
      this.state ={
          name:'',
          age:''
      }
      this.handleFormChange = this.handleFormChange.bind(this)
    }
   

    handleFormChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitForm(e){
        e.preventDefault();
        const age = isNaN(parseInt(this.state.age))?0:parseInt(this.state.age)  
        this.props.addAuthorMutation({
            variables:{
                name:this.state.name,
                age: age               
            },
            refetchQueries:[{query:getAuthorsQuery}]
        });
        this.setState({
            name:'',
            age:''
        })
        alert('New Author Added')       
    }

    render() {
        const {name,age} = this.state       
        return (
            <form id="add-author" onSubmit = {this.submitForm.bind(this)}>
                <h3 id ="author-heading"><label>Add Author</label></h3>
                <div className="field">
                    <label>Author Name:</label>
                    <input type="text" name='name' value = {name} onChange = {this.handleFormChange}/>
                </div>
                <div className="field">
                    <label>Age:</label>
                    <input type="text" name='age' value = {age} onChange = {this.handleFormChange}/>
                </div>               
                <button>+</button>
            </form>
        )
    };
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addAuthorMutation,{name:"addAuthorMutation"})
)(AddAuthor)

