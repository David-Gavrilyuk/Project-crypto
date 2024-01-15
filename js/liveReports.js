let chart = null;
let dataPoints = {};
let dataSeriesVisibility = JSON.parse(localStorage.getItem("dataSeriesVisibility")) || {};
let interval = null;

const liveReportCoinsPrice = async () => {
  const currentTime = new Date().toLocaleTimeString();
  const pricesAndTimes = await Promise.all(
    liveReportCoins.map(async ({ id }) => {
      try {
        const {
          market_data: {
            current_price: { usd: price },
          },
        } = await $.get(`https://api.coingecko.com/api/v3/coins/${id}`);
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

  const toggleDataSeries = (e) => {
    const dataSeriesIndex = chart.options.data.indexOf(e.dataSeries);
    dataSeriesVisibility[dataSeriesIndex] = dataSeriesVisibility[dataSeriesIndex] === undefined ? true : !dataSeriesVisibility[dataSeriesIndex];
    e.dataSeries.visible = dataSeriesVisibility[dataSeriesIndex];
    chart.render();
    localStorage.setItem("dataSeriesVisibility", JSON.stringify(dataSeriesVisibility));
  };

  let options = {
    zoomEnabled: true,
    height: 640,
    backgroundColor: "whitesmoke",
    title: { text: liveReportCoins.length ? "Share Value of Coins" : "No coins added to the live reports" },
    axisX: { title: "" },
    axisY: { title: "Coin Value", prefix: "$" },
    toolTip: { shared: true },
    legend: { cursor: "pointer", verticalAlign: "top", fontSize: 22, fontColor: "dimGrey", itemclick: toggleDataSeries },
  };

  const updateChart = (pricesAndTimes) => {
    pricesAndTimes.forEach(({ coinId, time, price }) => {
      dataPoints[coinId] = dataPoints[coinId] || [];
      const timeAsDate = new Date(`01/01/2023 ${time}`);
      dataPoints[coinId].push({ x: timeAsDate, y: price });
    });

    chart.options.data = liveReportCoins.map(({ id, name }, index) => ({
      type: "line",
      showInLegend: true,
      name,
      markerType: "square",
      xValueFormatString: "hh:mm:ss TT",
      color: color[index],
      yValueFormatString: "$####.00",
      dataPoints: dataPoints[id] || [],
      visible: dataSeriesVisibility[index] !== undefined ? dataSeriesVisibility[index] : true,
    }));

    chart.render();
  };

  chart = new CanvasJS.Chart("chartContainer", options);
  chart.render();

  if (interval) clearInterval(interval);
  interval = setInterval(async () => updateChart(await liveReportCoinsPrice()), 2000);
};
