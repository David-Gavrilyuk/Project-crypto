const allCoinsURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";
let coinCards = [];
let searchCoins, coinsArray;
const loadingGif = `<img id="loading" src="img/coinSpin.gif">`;

const addAllCoins = async () => {
  try {
    const allCoins = await $.get(allCoinsURL);
    coinCards = allCoins.map(({ id, symbol, name, image }) => ({ id, symbol, name, image, isChecked: liveReportCoins.some((liveCoin) => liveCoin.id === id) }));
  } catch (error) {
    $("#parallaxHeader").append(`<h3>Failed To Fetch Data<br/> ERROR: ${error.status} - ${error.statusText}</h3>`);
  }
  homePage();
};
addAllCoins();

const searchCard = () => {
  const searchCoin = $("#searchCoin").val().toLowerCase();
  searchCoins = coinCards.filter(({ name }) => name.toLowerCase().includes(searchCoin));
  injectAllCoins();
};
$("#searchBtn").on("click", searchCard);

const injectAllCoins = () => {
  coinsArray = searchCoins === undefined ? coinCards : searchCoins;
  const coinCard = coinsArray
    .map(
      ({ id, symbol, name, image, isChecked }) => `
    <div class="cardBox">
      <div class="cardContainer">
        <div id="${symbol}" class="card col-*">
          <div class="card-header bg-transparent border-0 d-inline-flex">
            <img class="cardImage" src="${image}"/>
            <div class="coinName">${name}</div>
            <div class="form-check form-switch ms-auto">
              <input id="coin-${id}" class="form-check-input checkbox" type="checkbox" ${isChecked ? "checked" : ""} />
            </div>
          </div>
          <div class="card-body cardSymbol">${symbol}</div>
          <div class="card-footer bg-transparent border-0">
            <button class="btn btn-primary moreInfo" type="button">More Info 📋</button><span class="loadingAnim"></span>
            <div class="coinInfo"></div>
          </div>
        </div>
      </div>  
    </div>`
    )
    .join("");
  $("#cardsCon").html(coinCard.length ? coinCard : "<h2>No Coins Found</h2>");
  checkCache();
  $(".checkbox").each(function () {
    addToggleCoins(this);
  });
};

const getMoreInfo = async (coinInfo, url, cacheName) => {
  if (!coinInfo.html().trim().length) {
    const progressBar = $(`${loadingGif} <span>loading...</span>`);
    $(coinInfo).siblings(".loadingAnim").html(progressBar);
    try {
      const moreInfo = await $.ajax({
        url,
        beforeSend: () => progressBar.show(),
        complete: () => progressBar.hide(1000),
      });
      const cardInfo =
        moreInfo.market_data.current_price.usd === undefined || moreInfo.market_data.current_price.usd === null
          ? `<img src="${moreInfo.image.thumb}"/><br/>No currency data found`
          : `<div class="moreData">
            <div>USD $ : ${moreInfo.market_data.current_price.usd}</div>
            <div>EUR € : ${moreInfo.market_data.current_price.eur}</div>
            <div>ILS ₪ : ${moreInfo.market_data.current_price.ils}</div>
          </div>`;
      coinInfo.html(cardInfo).toggle(1000);
      setCache(url, coinInfo, cacheName, cardInfo);
    } catch (error) {
      console.log(error);
      coinInfo.html("Error in fetching additional coin info").toggle(1000);
    }
  } else {
    coinInfo.toggle(1000);
  }
};
``;
