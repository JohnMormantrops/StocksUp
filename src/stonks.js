import React, { Component } from "react";
import SearchForm from "./SearchForm.js";
import SearchResults from "./SearchResults.js";
import "./styles.css";
import { db } from "./firebase-config";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.currentUser,
      size: "",
      apiData: [],
      errorMsg: null,
      isFetched: false,
      buying: [],
      selling: [],
      searchTerm: "",
      newBalance: props.balance
    };

    this.buyStock = this.buyStock.bind(this);
    this.addPortfolio = this.addPortfolio.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  } // end constructor

  // componentDidMount() is invoked immediately after a
  // component is mounted

  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  async componentDidMount() {
    try {
      const API_URL = "https://my.api.mockaroo.com/stockData.json?key=59da3a10";
      // Fetches the stock data at our mockarroo address
      const response = await fetch(API_URL);

      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();
      this.setState({ apiData: jsonResult });
      this.setState({ isFetched: true });
      // data from the api is succesfully fetched
    } catch (error) {
      // In the case of an error ...
      console.log("ERROR");
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  buyStock(index) {
    //retrieve object from api data using the index from the map function
    let foundItem = this.state.apiData.filter(this.findItemByIndex(index));
    //add the object to the buying array
    this.setState({ buying: foundItem });
  }

  findItemByIndex(index) {
    return function (sObject) {
      //match object using id use index + 1 as indexstarts at 0
      return sObject.stockID === index + 1;
    };
  }

  addPortfolio = async (e) => {
    e.preventDefault();

    //add the item from the buying array to the db
    //the item can then be seen in the portfolio

    let s = this.state.buying[0];
    // console.log(s)
    // console.log(this.state.newBalance)
    // console.log(s.rates.buy)
    let minused = Number(this.state.newBalance - s.rates.buy);
    this.setState({ Balance: minused });
    this.setState({ newBalance: minused });
    //update balance to be old balance - price of stock
    await updateDoc(doc(db, "Stockies", this.props.balanceID), {
      balance: minused
    });

    //add item to db
    try {
      await addDoc(collection(db, "Stockies"), {
        symbol: s.stock.symbol,
        name: s.stock.name,
        sector: s.stock.sector,
        buy: s.rates.buy,
        sell: s.rates.sell,
        userID: this.state.currentUser.uid
      });
      //reset buying array
      this.setState({ buying: [] });
    } catch (Error) {
      //end of trycatch
    }
  };

  render() {
    if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>Stocks and Shares</h1>
          <div className="container">
            <div className="orders">
              <h2>BUYING:</h2>
              Total cost: {/* show the cost of the buying array */}
              {this.state.buying.reduce((total, item) => {
                return total + item.rates.buy;
              }, 0)}
              <br />
              {/* show the button if theres something in the array
              add to portfolio using the button */}
              {this.state.buying.length !== 0 && (
                <button className="empbtn" onClick={this.addPortfolio}>
                  ADD TO PORTFOLIO
                </button>
              )}
              <ol>
                {/* display the object in the array */}
                {this.state.buying.map((s, key) => (
                  <li key={key}>
                    {s.stock.symbol} {s.stock.name} ${s.rates.buy}
                  </li>
                ))}
              </ol>
            </div>
            <pre> </pre>
            <div className="orders">
              <h2>SELLING:</h2>
              Sell from your portfolio
            </div>
            <hr />
          </div>
          {/* message while data loads */}
          <h1>We are loading your API request........</h1>
          <p>Your data will be here very soon....</p>
        </div>
      ); // end of return
    } else if (this.state.isFetched) {
      return (
        <div>
          <h1>Stocks and Shares</h1>

          <div className="container">
            <div className="orders">
              {/* show buy container for items to confirm buying */}
              <h2>BUYING:</h2>
              Total cost: {/* show the cost of the buying array */}
              {this.state.buying.reduce((total, item) => {
                return total + item.rates.buy;
              }, 0)}
              <br />
              {/* show the button if theres something in the array
              add to portfolio using the button */}
              {this.state.buying.length !== 0 && (
                <button className="empbtn" onClick={this.addPortfolio}>
                  ADD TO PORTFOLIO
                </button>
              )}
              <ol>
                {/* display the object in the array */}
                {this.state.buying.map((s, key) => (
                  <li key={key}>
                    {s.stock.symbol} {s.stock.name} ${s.rates.buy}
                  </li>
                ))}
              </ol>
            </div>
            <pre> </pre>
            <div className="orders">
              <h2>SELLING:</h2>
              <br />
              Sell from your portfolio
            </div>
          </div>
          <hr />
          <SearchForm
            //send search term and on change as props to the search form component
            searchTerm={this.state.searchTerm}
            onChange={this.onSearchFormChange}
          />
          <hr />
          <SearchResults
            //send search term and api data as props to the search form component
            //before rendering api items are passsed through the search filter
            sellStock={this.sellStock}
            buyStock={this.buyStock}
            searchTerm={this.state.searchTerm}
            globalArray={this.state.apiData}
          />
          <hr />
        </div>
      ); // end of return statement
    } // end of render function
  } // end of class
}
export default App;
