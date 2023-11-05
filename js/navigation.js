// -------------------------------------------------------------------------------------------------------------------------- //

// Home page injection

// -------------------------------------------------------------------------------------------------------------------------- //
const homePage = () => {
  const homeInfo = `
    <div id="home" class="tab-pane active">
      <div id="cardsCon" class="container-fluid mt-2";"></div>
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

        <h1 class="aboutInfo">Hello there! <br /> Welcome to Cryptic Coins.</h1>
        <br />
        <br />

        <div id="accordion">
          <div class="card container-fluid bg-dark text-white">
            <div class="card-header">
              <img src="../img/coinSpin.gif" alt="Overlay GIF" id="overlayGif" style="height: 30px;" />
              <a class="btn text-white" data-bs-toggle="collapse" href="#collapseOne">
                Home Page
              </a>             
              <img src="../img/coinSpin.gif" alt="Overlay GIF" id="overlayGif" style="height: 30px;" />
            </div>  
            <div id="collapseOne" class="collapse show" data-bs-parent="#accordion">
              <div class="card-body aboutInfoToggle">
                Welcome to the Cryptic Coins hub. On the homepage, you'll find a curated list of the top 100 trending cryptocurrencies.
                <br/>
                <br/>
                If you're looking for a specific coin, simply use the search bar located at the top right of the page.  
                <br/>
                <br/>
                For real-time information, click the 'More Info' button to see the current value of your selected cryptocurrency in USD, EUR, and ILS. To minimize API calls, this data is saved for 2 minutes.
                <br/>
                <br/>
                You can also follow the value movements of your favorite coins by adding them to the Live Reports page using the toggle button on each coin card.
                <br/> 
                <br/>
                Stay informed and make informed investment decisions.
                <br/>
                <br/>
                <img class="aboutInfoImg" src="/img/aboutHomePage.PNG"/>
                <br/>
              </div>
            </div>
          </div>

          
          <div class="card container-fluid bg-dark text-white">
            <div class="card-header">
              <img src="../img/coinSpin.gif" alt="Overlay GIF" id="overlayGif" style="height: 30px; filter: grayscale(100%) contrast(120%);" />
              <a class="collapsed btn text-white" data-bs-toggle="collapse" href="#collapseTwo">
                Live Reports
              </a>
              <img src="../img/coinSpin.gif" alt="Overlay GIF" id="overlayGif" style="height: 30px; filter: grayscale(100%) contrast(120%);" />
            </div>
            <div id="collapseTwo" class="collapse" data-bs-parent="#accordion">
              <div class="card-body aboutInfoToggle">
                On the Live Reports page, you can conveniently track the coins you've selected by using the toggle button.
                <br/>
                This allows you to monitor the movements in their share values.
                <br/>
                <br/>
                You also have the option to toggle the graph lines for each coin, making it easy to show or hide their share value trends.
                <br/>
                The graph will update in real-time to reflect your preferences.
                <br/>
                <br/>
                For a closer look at a specific time period, simply click and drag your mouse over the graph to zoom in.
                This feature provides you with a more detailed view of the data you're interested in.
                <br/>
                <br/>
                <img class="aboutInfoImg" src="/img/aboutLiveReports.PNG"/>
              </div>
            </div>
          </div>


          <div class="card container-fluid bg-dark text-white">
            <div class="card-header">
              <img src="../img/coinSpin.gif" alt="Overlay GIF" id="overlayGif" style="height: 30px; filter: hue-rotate(1765deg) contrast(120%);" />
              <a class="collapsed btn text-white" data-bs-toggle="collapse" href="#collapseThree" id="collapseThreeLink">
                Tracking coins
              </a>
              <img src="../img/coinSpin.gif" alt="Overlay GIF" id="overlayGif" style="height: 30px; filter: hue-rotate(1765deg) contrast(120%);" />
            </div>
            <div id="collapseThree" class="collapse" data-bs-parent="#accordion">
              <div class="card-body aboutInfoToggle">
                Please note that you can add and track up to 5 coins in the Live Reports section.
                <br/>
                If you attempt to add more than 5 coins, you will be prompted to either replace one of the previously added coins with the new selection or keep your current list of coins as is.
                <br/>
                This limitation ensures that you have a manageable and focused tracking experience.
                <br/>
                <br/>
                <img class="aboutInfoImg" src="/img/aboutModal.PNG"/>
              </div>
            </div>
          </div>
        </div>


      <br/>
      <br/>
      <h3>
        This project leverages APIs to retrieve data for cryptocurrency coins through the CoinGecko API.
        <br/>
        It provides essential information such as coin names and their current currency values.
      </h3>
      <br/>
      <h3>
        The project was crafted using a blend of technologies:
        <br/>
        <b>Javascript - Jquery - Bootstrap - CSS - HTML</b>
      </h3>
      <br/>
      The coin GIF featured on the website was created by thelukewest. link to his <a href="https://thelukewest.wordpress.com/2016/11/07/pixel-art-animated-coin/" target="_blank">page</a>.  
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

  // Scroll to the clicked info section
  $(document).ready(function () {
    $('.card-header a[data-bs-toggle="collapse"]').click(function (e) {
      e.preventDefault();
      var targetId = $(this).attr("href");
      $("html, body").animate({ scrollTop: 250 }, 1000);
    });
  });
};
