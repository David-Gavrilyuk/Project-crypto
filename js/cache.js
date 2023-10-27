caches.delete("cachedCoins"); // delete cache on page load

// -------------------------------------------------------------------------------------------------------------------------- //

// Check if cache exists before making a new API request via getMoreInfo

// -------------------------------------------------------------------------------------------------------------------------- //
const checkCache = () => {
  $(".moreInfo").click(async function () {
    let index = $(this).index(".moreInfo");
    const coinInfo = $(this).siblings(".coinInfo");

    let cacheName = "cachedCoins";
    let url = `https://api.coingecko.com/api/v3/coins/${coinsArray[index].id}`;
    console.log(url);

    caches.open(cacheName).then((cache) => {
      cache.match(url).then((response) => {
        if (response) {
          response.json().then((json) => {
            const currentPrice = json.currentPrice;
            coinInfo.html(currentPrice);
            coinInfo.toggle(1000);
            console.log("cached data injected!!!!");
          });
        } else {
          console.log("no cached data available");
          getMoreInfo(coinInfo, url, cacheName);
        }
      });
    });
  });
};
// -------------------------------------------------------------------------------------------------------------------------- //

// Create Cache

// -------------------------------------------------------------------------------------------------------------------------- //
const setCache = (url, coinInfo, cacheName, cardInfo) => {
  caches.open(cacheName).then((cache) => {
    const currentPrice = cardInfo;
    const json = JSON.stringify({ currentPrice });
    const res = new Response(json, {
      headers: { "Content-Type": "application/json" },
    });
    cache.put(url, res);
    console.log("Data cached successfully ");

    // Delete this cache after 2 minutes
    setTimeout(() => {
      coinInfo.hide(1000);
      coinInfo.html("");
      cache.delete(url);
      console.log("Data deleted");
    }, 120000);
  });
};
