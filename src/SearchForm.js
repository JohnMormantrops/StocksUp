import React, { Component } from "react";

//this file renders a search form the props are passed down from stonks.js
// the values are passed back to parent and to search results to display result

class SearchForm extends Component {
  render() {
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;
    return (
      <div className="SearchForm">
        <b>Search:</b>
        <input
          type="text"
          value={searchTermFromProps}
          onChange={onChangeFromProps}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // close the SearchForm component
//**************************************************//
export default SearchForm;
