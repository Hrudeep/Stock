import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchStockData, fetchStockValue } from './service';
import { formatStockData, formatLineData } from './utils';

const PlotlyCandlestickChart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candlestickData = await fetchStockData();
        const lineData = await fetchStockValue();

        const formattedCandleData = formatStockData(candlestickData);
        const formattedLineData = formatLineData(lineData);

        const dates = formattedCandleData.map(d => new Date(d.x));
        const open = formattedCandleData.map(d => d.y[0]);
        const high = formattedCandleData.map(d => d.y[1]);
        const low = formattedCandleData.map(d => d.y[2]);
        const close = formattedCandleData.map(d => d.y[3]);

        const lineDates = formattedLineData.map(d => new Date(d.x));
        const lineValues = formattedLineData.map(d => d.y);

        setData([
          {
            x: dates,
            open: open,
            high: high,
            low: low,
            close: close,
            type: 'candlestick',
            name: 'Candlestick Data',
            xaxis: 'x',
            yaxis: 'y',
          },
          {
            x: lineDates,
            y: lineValues,
            type: 'scatter',
            mode: 'lines',
            name: 'Line Data',
            xaxis: 'x',
            yaxis: 'y2',
          },
        ]);

        setLayout({
          title: 'Candlestick and Line Chart',
          xaxis: {
            title: 'Date',
            type: 'date',
            rangeslider: { visible: true }, // Enable range slider
            constraintrange: [dates[0], dates[dates.length - 1]], // Allow horizontal zoom
          },
          yaxis: {
            title: 'Candlestick Data',
            autorange: true, // Auto-range for vertical zoom
          },
          yaxis2: {
            title: 'Line Data',
            overlaying: 'y',
            side: 'right',
            autorange: true, // Auto-range for vertical zoom
          },
          dragmode: 'zoom', // Allow dragging to zoom
          hovermode: 'closest', // Display closest data point on hover
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Plot
        data={data}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default PlotlyCandlestickChart;