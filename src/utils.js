export const formatStockData = (stockData) => {
  return stockData.map(data => ({
    x: data.x.getTime(),
    y: data.y,
  }));
};

export const formatLineData = (lineData) => {
  return lineData.map(item => ({
    x: item.x.getTime(),
    y: item.y,
  }));
};