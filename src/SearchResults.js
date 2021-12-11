import React, { Component } from "react";
class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //global array contains api data
      globalArray: this.props.globalArray
    };
  }

  stockFilter(searchTerm) {
    return function (stockObject) {
      //stock filter allows user to search name symbol or sector of stock case insensetive
      let stockname = stockObject.stock.name.toLowerCase();
      let stocksymbol = stockObject.stock.symbol.toLowerCase();
      let stocksector = stockObject.stock.sector.toLowerCase();

      return (
        stockname.includes(searchTerm.toLowerCase()) ||
        stocksymbol.includes(searchTerm.toLowerCase()) ||
        stocksector.includes(searchTerm.toLowerCase())
      ); // end of return statement
    }; // end of return function
  } // end of addressFilterFunction

  render() {
    //array and search term passed from stonks seacrh term retrieved from search form componenet
    const arrayPassedAsParameter = this.props.globalArray;
    const searchTermFromProps = this.props.searchTerm;

    return (
      <div className="SearchResults">
        {/* api data is passed through filter before rendering from the stonks page */}
        {arrayPassedAsParameter
          .filter(this.stockFilter(searchTermFromProps))
          .map((s, key) => (
            <li className="li" key={key}>
              <div className="buttons" onMouseOver={this.boxMouseOverHandler}>
                <b>{s.stock.symbol}</b>

                <div style={{ alignItems: "center", width: "80%" }}>
                  <p>{s.stock.name}</p>

                  <p>{s.stock.sector}</p>
                </div>

                <div className="price">
                  <p style={{ margin: "3px" }}>${s.rates.buy.toFixed(2)}</p>
                  <button
                    className="buybtn"
                    // buy button send the stock object to the button handler function
                    onClick={() => this.props.buyStock(key)}
                  >
                    BUY
                  </button>
                </div>
                <div className="price">
                  <p style={{ margin: "3px" }}>${s.rates.sell.toFixed(2)}</p>
                  <button
                    style={{ background: "none", color: "white" }}
                    className="sellbtn"
                    //This button does nothing from this page but is active from the portfolio page
                  >
                    SELL
                  </button>
                </div>
              </div>
            </li>
          ))}
      </div>
    ); // end of return statement
  } // end of render function
} // close the SearchResults component

export default SearchResults;
