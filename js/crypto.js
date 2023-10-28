/*
TODO:
Implement live reports graph
*/

// All coins URL
const allCoinsURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";

// Spliced coins array
let coinCards = [];

// Searched coins array (undefined)
let searchCoins;

// Injected coins array (undefined)
let coinsArray;

const loadingGif = `<img id="loading" src="img/coin-shine1.gif">`;
// -------------------------------------------------------------------------------------------------------------------------- //

// Fetch coins from the API

// -------------------------------------------------------------------------------------------------------------------------- //
const addAllCoins = async () => {
  // Create an array with specified number of coins
  try {
    const allCoins = await $.get(allCoinsURL);
    coinCards = allCoins.slice(0, 100).map(({ id, symbol, name, image }) => ({ id, symbol, name, image, isChecked: false }));

    coinCards.forEach((coin) => {
      coin.isChecked = liveReportCoins.some((liveCoin) => liveCoin.id === coin.id);
    });
  } catch (error) {
    // display error message on page
    $("#parallaxHeader").append(`<h3>Failed To Fetch Data<br/> ERROR: ${error.status} - ${error.statusText}</h3>`);
  }
  homePage();
};
addAllCoins();
// -------------------------------------------------------------------------------------------------------------------------- //

// Coin search bar

// -------------------------------------------------------------------------------------------------------------------------- //
const searchCard = () => {
  const searchCoin = $("#searchCoin").val().toLowerCase();
  searchCoins = coinCards.filter(({ name }) => name.toLowerCase().includes(searchCoin));
  // Inject searched coins
  injectAllCoins();
};

$("#searchBtn").on("click", searchCard);
// -------------------------------------------------------------------------------------------------------------------------- //

// Inject all coins fetched from API / Search bar

// -------------------------------------------------------------------------------------------------------------------------- //
const injectAllCoins = () => {
  // Proceed with initial page load array / searched coins array
  if (searchCoins === undefined) {
    coinsArray = coinCards;
  } else {
    coinsArray = searchCoins;
  }
  // Inject coins to Home page
  const coinCard = coinsArray
    .map(({ id, symbol, name, image, isChecked }) => {
      return `
    <div class="cardBox">
      <div id="${symbol}" class="card col-* h-100">
        <div class="card-header bg-transparent border-0 d-inline-flex">
          <img class="cardImage" src="${image}"/>
          <b class="coinName">${name}</b>
          <div class="form-check form-switch ms-auto">
            <input id="coin-${id}" class="form-check-input checkbox" type="checkbox" ${isChecked ? "checked" : ""} />
          </div>
        </div>
        <b class="card-body">${symbol}</b>
        <div class="card-footer bg-transparent border-0">
          <button class="btn btn-primary moreInfo" type="button">More Info 📋</button><span class="loadingAnim"></span>
          <div class="coinInfo">
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
  coinCard.length ? $("#cardsCon").html(coinCard) : $("#cardsCon").html("<h2>No Coins Found</h2>");
  checkCache();
  $(".checkbox").each(function () {
    addToggleCoins(this);
  });
};
// -------------------------------------------------------------------------------------------------------------------------- //

// Get More Info from API

// -------------------------------------------------------------------------------------------------------------------------- //
const getMoreInfo = async (coinInfo, url, cacheName) => {
  let moreInfo = null;
  const hasContent = coinInfo.html().trim().length > 0;
  // Display loading gif if an fetching from API
  if (!hasContent) {
    const progressBar = $(`${loadingGif} <span>loading...</span>`);
    $(coinInfo).siblings(".loadingAnim").html(progressBar);

    try {
      console.log(url);
      moreInfo = await $.ajax({
        url: url,
        beforeSend: () => progressBar.show(),
        complete: () => progressBar.hide(1000),
      });
      console.log("more info");
      // Save fetched information and inject to card + toggle div
      const cardInfo =
        moreInfo.market_data.current_price.usd === undefined || moreInfo.market_data.current_price.usd === null
          ? `<img src="${moreInfo.image.thumb}"/><br/>` + "No currency data found"
          : `<div class="moreData">
               <div>USD $ : ${moreInfo.market_data.current_price.usd}</div>
               <div>EUR € : ${moreInfo.market_data.current_price.eur}</div>
               <div>ILS ₪ : ${moreInfo.market_data.current_price.ils}</div>
             </div>`;

      coinInfo.html(cardInfo);
      coinInfo.toggle(1000);
      setCache(url, coinInfo, cacheName, cardInfo);
    } catch (error) {
      console.log(error);
      coinInfo.html("Error in fetching additional coin info");
      coinInfo.toggle(1000);
    }
  } else {
    coinInfo.toggle(1000);
  }
};
// -------------------------------------------------------------------------------------------------------------------------- //
