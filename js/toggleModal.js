// Live Report coins array
let liveReportCoins = JSON.parse(localStorage.getItem("liveReportCoins")) || [];

// Add to Live Reports toggle function
const addToggleCoins = (toggle) => {
  $(toggle).change(() => {
    const index = $(toggle).index(".checkbox");
    const Checked = $(toggle).is(":checked");
    // Add or remove coin from liveReportsCoins array
    coinsArray[index].isChecked = Checked;
    if (Checked) {
      liveReportCoins.push(coinsArray[index]);
    } else {
      const liveReportIndex = liveReportCoins.findIndex(({ id }) => id === coinsArray[index].id);
      if (liveReportIndex !== -1) liveReportCoins.splice(liveReportIndex, 1);
    }

    liveReportCoins.length > 5
      ? showModal() // Save the updated liveReportCoins to localStorage
      : localStorage.setItem("liveReportCoins", JSON.stringify(liveReportCoins));
  });
};

// Show Modal when more than 5 coins added to Live Reports
const showModal = () => {
  const liveReportCoinsList = liveReportCoins
    .slice(0, 5)
    .map((coin) => `<li><img class="modalImage" src=${coin.image}/> ${coin.name}</li>`)
    .join("");
  const selectCoinOptions = liveReportCoins.map((coin, index) => `<option value="${index}">${coin.name}</option>`).join("");

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
                  <ul>${liveReportCoinsList}</ul>
                </div>
                <div id="addedCoin">
                  <b>New coin added:</b><br/> 
                  <ul><li><img class="modalImage" src=${liveReportCoins[5].image}/> ${liveReportCoins[5].name}</li></ul>
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

// Modal canceled function
const cancelChangeCoin = () => {
  const coinIndex = coinCards.findIndex((coin) => coin.id === liveReportCoins[5].id);
  if (coinIndex !== -1) {
    coinCards[coinIndex].isChecked = false;
    liveReportCoins.splice(5, 1);
  }

  // Save the updated liveReportCoins to localStorage
  localStorage.setItem("liveReportCoins", JSON.stringify(liveReportCoins));

  // re-inject coins to update the coin toggle state
  injectAllCoins();
};

// Modal coin changed function
const changeCoin = () => {
  const selectedCoinIndex = $("#selectCoin").val();

  if (selectedCoinIndex >= 0 && selectedCoinIndex < liveReportCoins.length) {
    const selected = liveReportCoins[selectedCoinIndex];
    const coinIndex = coinCards.findIndex((coin) => coin.id === selected.id);

    if (coinIndex !== -1) {
      coinCards[coinIndex].isChecked = false;
    }

    // Replace the selected coin with the new coin
    liveReportCoins[selectedCoinIndex] = liveReportCoins[5];

    // Remove the new coin from index 5
    liveReportCoins.splice(5, 1);

    // Save the updated liveReportCoins to localStorage
    localStorage.setItem("liveReportCoins", JSON.stringify(liveReportCoins));

    // re-inject coins to update the coin toggle state
    injectAllCoins();
  }
};
