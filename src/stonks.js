import React, { Component } from "react";
import SearchForm from "./SearchForm.js";
import SearchResults from "./SearchResults.js";
import app from "./App";
import "./styles.css";
import { db } from "./firebase-config";
import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

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

    this.sellStock = this.sellStock.bind(this);
    this.buyStock = this.buyStock.bind(this);
    this.addPortfolio = this.addPortfolio.bind(this);
    this.empty2 = this.empty2.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  } // end constructor

  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)

  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  } // end onSearchFormChange

  async componentDidMount() {
    //console.log("USER");
    //console.log(currentUser);
    try {
      const API_URL = "https://my.api.mockaroo.com/stockData.json?key=59da3a10";
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);

      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();
      //console.log("response");
      //console.log(jsonResult.stockData);
      // update the state variables correctly.
      this.setState({ apiData: jsonResult });

      //console.log(this.state.apiData);
      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  buyStock(index) {
    //console.log("STOCK: " + symbol);
    let foundItem = this.state.apiData.filter(this.findItemByIndex(index));
    this.setState({ buying: foundItem });
    //this.setState({ buying: this.state.buying.concat(foundItem) });
    //console.log("found item HERE");
    //console.log(foundItem.stockData);
    //console.log(this.state.buying);
  }
  sellStock(index) {
    let foundItem = this.state.apiData.filter(this.findItemByIndex(index));
    //console.log("found item HERE");
    this.setState({ selling: this.state.selling.concat(foundItem) });
    //console.log(this.state.selling);
  }

  findItemByIndex(index) {
    //console.log("finding item HERE");
    //console.log(index);

    return function (sObject) {
      return sObject.stockID === index + 1;
    };
  }

  addPortfolio = async (e) => {
    e.preventDefault();
    // {this.state.buying.map((s, key) => (
    //   <li key={key}>
    //     {s.stock.symbol} {s.stock.name} ${s.rates.buy} {s.rates.sell}
    //   </li>
    let s = this.state.buying[0];
    // console.log("buying array");
    // console.log(s.stock.name);
    // console.log(s.rates.buy);
    // console.log("balnce ID??");
    // console.log(this.props.balanceID);
    // console.log(this.state.newBalance);
    let minused = Number(this.state.newBalance - s.rates.buy);
    //console.log(minused);
    // console.log("BELOW");
    // console.log(this.state.newBalance);
    await updateDoc(doc(db, "Stockies", this.props.balanceID), {
      balance: minused
    });

    try {
      await addDoc(collection(db, "Stockies"), {
        //stockID: s.stockID,
        symbol: s.stock.symbol,
        name: s.stock.name,
        sector: s.stock.sector,
        buy: s.rates.buy,
        sell: s.rates.sell,
        userID: this.state.currentUser.uid
      });
      this.setState({ buying: [] });
    } catch (Error) {
      //end of trycatch
    }
  };

  empty2() {
    this.setState({ selling: [] });
  }
  boxMouseOverHandler(e) {
    //console.log(e.target);
  }

  render() {
    return (
      <div>
        <h1>Stocks and Shares</h1>
        {/* TASK 2: Make a new Seach Component */}
        <div className="container">
          <div className="orders">
            <h2>BUYING:</h2>
            Total cost:{" "}
            {this.state.buying.reduce((total, item) => {
              return total + item.rates.buy;
            }, 0)}
            <br />
            {this.state.buying.length !== 0 && (
              <button className="empbtn" onClick={this.addPortfolio}>
                ADD TO PORTFOLIO
              </button>
            )}
            {/* TASK 3：Add a button to REMOVE the Portfolio */}
            <ol>
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
            Total cost:{" "}
            {this.state.selling.reduce((total, item) => {
              return total + item.rates.sell;
            }, 0)}
            <br />
            Sell from your portfolio
            <ol>
              {this.state.selling.map((s, key) => (
                <li key={key}>
                  {s.stock.symbol} {s.stock.name} ${s.rates.sell}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <hr />
        <SearchForm
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
        />
        <hr />
        <SearchResults
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

export default App;
