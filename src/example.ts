import HeatMap, { GITHUB_PALETTE } from "./index";

// Generate some random data
const data = Array.from({ length: 365 }, (test, idx) => {
  const num = Math.random();
  if (num < 0.05) {
    return 0;
  } else if (num < 0.55) {
    return 1;
  } else if (num < 0.75) {
    return 2;
  } else if (num < 0.88) {
    return 3;
  } else if (num < 0.95) {
    return 4;
  } else {
    return 5;
  }
});

const gnuplotcode = HeatMap({
  // Required
  title: "Contributions",
  data,
  year: 2019,

  // Optional
  outFile: "heatmap",
  palette: GITHUB_PALETTE,
  colorbox: true,
  width: 1500,
});

console.log(gnuplotcode);
