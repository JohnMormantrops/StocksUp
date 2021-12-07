import background from "./images/stocksgoup.png";
import money from "./images/money-money-money-make-it-rain.gif";

export default function ({ setPage }) {
  return (
    <div>
      {/* <img
        className="background"
        src={money}
        alt="stonks only go up"
        width="75%"
        height=""
      /> */}
      <h1></h1>
      <h1>
        stocks<text style={{ color: "forestgreen" }}>U</text>p
      </h1>
      <h3>
        Welcome to stocks<text style={{ color: "forestgreen" }}>U</text>p
        <br /> the perfect place to manage your stocks{" "}
      </h3>
      <div className="infopar">
        <p onClick={() => setPage("portfolio")} className="par">
          <b>portfolio</b>
          <br />
          keep track of your stocks
        </p>
        <p onClick={() => setPage("stonks")} className="par">
          <b>stonks</b>
          <br />
          buy stocks to add to your portfolio
        </p>
        <p onClick={() => setPage("User")} className="par">
          <b>user</b>
          <br />
          manage your balance
        </p>
      </div>
      <h1>STOCKS ONLY GO UP</h1>
    </div>
  );
}
