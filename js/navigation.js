// -------------------------------------------------------------------------------------------------------------------------- //

// Home page injection

// -------------------------------------------------------------------------------------------------------------------------- //
const homePage = () => {
  const homeInfo = `
    <div id="home" class="tab-pane active">
      <div id="cardsCon" class="container-fluid d-flex  flex-wrap mt-2";"></div>
    </div>
    `;

  // Check if the #home element exists in the .tab-content element
  const homeElement = $(".tab-content").find("#home");

  if (homeElement.length === 0) {
    // If the #home element doesn't exist, append the homeInfo
    $(".tab-content").append(homeInfo);
    injectAllCoins();
    $("#liveReports").remove();
    $("#about").remove();
  }
};
// -------------------------------------------------------------------------------------------------------------------------- //

// Live Reports page injection

// -------------------------------------------------------------------------------------------------------------------------- //
const liveReportsPage = () => {
  const liveReportsInfo = `
  <div id="liveReports" class="tab-pane active" style="width: 100%;>
    <div id="liveReportCards">
      <div id="chartContainer"></div>
    </div>
  </div>

`;

  // Check if the #liveReports element exists in the .tab-content element
  const liveReportsElement = $(".tab-content").find("#liveReports");

  if (liveReportsElement.length === 0) {
    // If the #liveReports element doesn't exist, append the liveReportsInfo
    $(".tab-content").append(liveReportsInfo);
    $("#home").remove();
    $("#about").remove();
    coinGraph(); // TO BE IMPLEMENTED //
  }
};
// -------------------------------------------------------------------------------------------------------------------------- //

// About page injection
// -------------------------------------------------------------------------------------------------------------------------- //
const aboutPage = () => {
  const aboutInfo = `
    <div id="about" class="container-fluid tab-pane active">
      <br />
      <div class="aboutInfo">
        <h1 class="aboutInfo">Project-Crypto-API</h1>
        <div>
          Name: David Gavrilyuk<br />
          Tel: 0547375551<br />
          Email: davidns1173@gamil.com
        </div>
        <br />
        <img id="aboutIMG" src="img/David.jpg" />
        <br /><br />
        <h3 class="aboutInfo">Hello there!</h3>
        <div>
          This project uses API's to pull data for crypto currency coins via the CoinGecko API,<br />
          coin name, information, and current currency values.<br /><br />
          The project was built using:<br />
          <b>Jquery - Bootstrap - CSS - HTML</b>
        </div>
      </div>
      <br />
    </div>
    `;
  // Check if the #about element exists in the .tab-content element
  const aboutElement = $(".tab-content").find("#about");

  if (aboutElement.length === 0) {
    // If the #about element doesn't exist, append the aboutInfo
    $(".tab-content").append(aboutInfo);
    $("#home").remove();
    $("#liveReports").remove();
  }
};
