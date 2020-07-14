import HeatMap from "./index";

const title = "Hello there!";
const outFile = "heatmap";
const data = Array.from({ length: 365 }, () =>
  Math.floor(Math.random() * 5.9999)
);
const year = 2019;
const palette = [
  "#eeeeee",
  "#c6e48b",
  "#7bc96f",
  "#239a3b",
  "#196127",
  "#000000",
];

console.log(HeatMap({ title, outFile, data, year, palette, colorbox: true }));
