// Live Report coins array
let liveReportCoins = [];

//----------------------------------------------------------------------------------------------------------------------------

// Add to Live Reports toggle function

// -------------------------------------------------------------------------------------------------------------------------- //
const addToggleCoins = (toggle) => {
  $(toggle).change(() => {
    const index = $(toggle).index(".checkbox");
    const Checked = $(toggle).is(":checked");
    // Add or remove coin from liveReportsCoins array
    coinsArray[index].isChecked = Checked;
    if (Checked) liveReportCoins.push(coinsArray[index]);
    else {
      const liveReportIndex = liveReportCoins.findIndex(
        ({ id }) => id === coinsArray[index].id
      );
      if (liveReportIndex !== -1) liveReportCoins.splice(liveReportIndex, 1);
    }

    if (liveReportCoins.length > 5) showModal();
  });
};
// -------------------------------------------------------------------------------------------------------------------------- //

// Show Modal when more than 5 coins added to Live Reports

// -------------------------------------------------------------------------------------------------------------------------- //
const showModal = () => {
  const liveReportCoinsList = liveReportCoins
    .map((coin) => `<li>💰${coin.symbol}</li>`)
    .join("");
  const selectCoinOptions = liveReportCoins
    .map(
      (coin, index) =>
        `<option value="${index}">${index < 5 ? index + 1 : "Added"}: ${
          coin.symbol
        }</option>`
    )
    .join("");

  const reportsModal = `
      <div class="modal" id="reportsModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            
            <div class="modal-header">
              <h4 class="modal-title">Live Reports Coins</h4>
              <button onclick="cancelChangeCoin()" type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <b>Only 5 coins can be added to Live reports at a time,<br/>Please select the coins which you want to keep.</b><br/><br/>
              <div id="modalCoins">
                <div id="currentCoins">
                  <b>Current Live Report Coins:</b><br/>
                  <ol>${liveReportCoinsList}</ol>
                </div>
                <div id="addedCoin">
                  <b>New coin added:</b><br/> 
                  <ul><li>💰${liveReportCoins[5].symbol}</li></ul>
                </div>  
              </div>          
            </div>

            <div id="modalFooter" class="modal-footer d-flex justify-content-start">
              <div class="selectCoin">
                Select a coin to remove:<br/>
                <select id="selectCoin">${selectCoinOptions}</select>
              </div>  
              <div id="btn">   
                <button onclick="changeCoin()" type="button" class="btn btn-warning ms-auto" data-bs-dismiss="modal">Change coin</button>
                <button onclick="cancelChangeCoin()" type="button" class="btn btn-danger ms-auto" data-bs-dismiss="modal">Cancel</button>
              </div> 
            </div>

          </div>
        </div>
      </div>
    `;

  $("#modalContainer").html(reportsModal);
  $("#reportsModal").modal("show");
};
// -------------------------------------------------------------------------------------------------------------------------- //

// Modal canceled function

// -------------------------------------------------------------------------------------------------------------------------- //
const cancelChangeCoin = () => {
  const coinIndex = coinCards.findIndex(
    (coin) => coin.id === liveReportCoins[5].id
  );
  if (coinIndex !== -1) {
    coinCards[coinIndex].isChecked = false;
    liveReportCoins.splice(5, 1);
  }
  // re-inject coins to update the coin toggle state
  injectAllCoins();
};
// -------------------------------------------------------------------------------------------------------------------------- //

// Modal coin changed function

// -------------------------------------------------------------------------------------------------------------------------- //
const changeCoin = () => {
  const selected = liveReportCoins.splice($("#selectCoin").val(), 1)[0];
  const coinIndex = coinCards.findIndex((coin) => coin.id === selected.id);
  if (coinIndex !== -1) {
    coinCards[coinIndex].isChecked = false;
  }
  // re-inject coins to update the coin toggle state
  injectAllCoins();
};
