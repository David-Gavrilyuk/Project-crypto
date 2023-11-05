let chart = null;
let dataPoints = {};
let dataSeriesVisibility = JSON.parse(localStorage.getItem("dataSeriesVisibility")) || {};
let interval = null; // Initialize the interval variable to null.

const liveReportCoinsPrice = async () => {
  const currentTime = new Date().toLocaleTimeString();
  const pricesAndTimes = await Promise.all(
    liveReportCoins.map(async ({ id }) => {
      try {
        const response = await $.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        const price = response.market_data.current_price.usd;
        return { coinId: id, price, time: currentTime };
      } catch (error) {
        console.error(`Error fetching data for coin with ID ${id}: ${error}`);
        return null;
      }
    })
  );

  return pricesAndTimes.filter((data) => data !== null);
};

const coinGraph = () => {
  const color = ["Red", "Green", "Blue", "Orange", "Purple"];
  const dataSeries = [];

  var options = {
    zoomEnabled: true,
    height: 640,
    backgroundColor: "whitesmoke",
    title: {
      text: liveReportCoins.length ? "Share Value of Coins" : "No coins added to the live reports",
    },
    axisX: {
      title: "",
    },
    axisY: {
      title: "Coin Value",
      prefix: "$",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 22,
      fontColor: "dimGrey",
      itemclick: toggleDataSeries,
    },
  };

  chart = new CanvasJS.Chart("chartContainer", options);
  chart.render();

  function updateChart(pricesAndTimes) {
    pricesAndTimes.forEach(({ coinId, time, price }) => {
      if (!dataPoints[coinId]) {
        dataPoints[coinId] = [];
      }

      const timeAsDate = new Date(`01/01/2023 ${time}`);
      dataPoints[coinId].push({ x: timeAsDate, y: price });
    });

    // Clear and rebuild the data series
    chart.options.data = liveReportCoins.map(({ name }, index) => {
      const coinId = liveReportCoins[index].id;
      const dataPointsArray = dataPoints[coinId] || [];

      return {
        type: "line",
        showInLegend: true,
        name,
        markerType: "square",
        xValueFormatString: "hh:mm:ss TT",
        color: color[index],
        yValueFormatString: "$####.00",
        dataPoints: dataPointsArray,
        visible: dataSeriesVisibility[index] !== undefined ? dataSeriesVisibility[index] : true,
      };
    });

    chart.render();
  }

  function toggleDataSeries(e) {
    const dataSeriesIndex = chart.options.data.indexOf(e.dataSeries);

    if (typeof dataSeriesVisibility[dataSeriesIndex] === "undefined") {
      dataSeriesVisibility[dataSeriesIndex] = true;
    } else {
      dataSeriesVisibility[dataSeriesIndex] = !dataSeriesVisibility[dataSeriesIndex];
    }

    e.dataSeries.visible = dataSeriesVisibility[dataSeriesIndex];
    chart.render();

    // Save dataSeriesVisibility to localStorage
    localStorage.setItem("dataSeriesVisibility", JSON.stringify(dataSeriesVisibility));
  }

  // Call updateChart with empty data initially
  updateChart([]);

  // Clear the existing interval if it exists
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(async () => {
    const pricesAndTimes = await liveReportCoinsPrice();
    updateChart(pricesAndTimes);
  }, 2000);
};

// Call the coinGraph function to initialize the chart
coinGraph();
