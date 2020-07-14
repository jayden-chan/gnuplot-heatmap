# gnuplot-heatmap
Generate year-long heatmaps using gnuplot

## Installation
```
npm install gnuplot-heatmap
```

## Examples
#### Using the (old) GitHub color palette:
```javascript
import HeatMap, { GITHUB_PALETTE } from "gnuplot-heatmap";

const data = [... your data ...];

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
```

![](https://i.imgur.com/7hpvjss.png)

#### Using an automatic color palette from gnuplot:
```javascript
import HeatMap, { GITHUB_PALETTE } from "gnuplot-heatmap";

const data = [... your data ...];

const gnuplotcode = HeatMap({
  // Required
  title: "Contributions",
  data,
  year: 2019,

  // Optional
  outFile: "heatmap",
  colorbox: true,
  width: 1500,
});
```

![](https://i.imgur.com/BPQSV6L.png)
