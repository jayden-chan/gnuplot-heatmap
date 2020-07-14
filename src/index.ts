import * as moment from "moment";
export const GITHUB_PALETTE = [
  "#eeeeee",
  "#c6e48b",
  "#7bc96f",
  "#239a3b",
  "#196127",
  "#000000",
];

export type HeatmapInputs = {
  title: string;
  data: number[];
  year: number;
  outFile?: string;
  palette?: string[];
  colorbox?: boolean;
  width?: number;
};

/**
 * @param {string} title The title of the heatmap
 * @param {number[]} data The data to plot
 * @param {number} year The year of the plot (needed for alignment)
 * @param {string} [outFile] The title of the output png
 * @param {string[]} [palette] Alternate color palette to use
 * @param {boolean} [colorbox] Whether or not to include the colorbox
 * @param {number} [width] Width of the final image in pixels
 *
 * @return {string} The gnuplot script to generate the heatmap
 */
export default function HeatMap({
  title,
  data,
  year,
  outFile,
  palette,
  colorbox,
  width,
}: HeatmapInputs): string {
  const xtics = MONTHS.map((month, i) => {
    return `"${month}" ${(i + 0.3) * (53 / 12)}`;
  }).join(", ");

  const ytics = Object.entries(DAYS_OF_WEEK)
    .map(([day, idx]) => `"${day}" ${idx}`)
    .join(", ");

  const paletteString =
    palette === undefined
      ? ""
      : `set palette maxcolors ${palette.length}
set palette defined (${palette.map((p, idx) => `${idx} "${p}"`).join(", ")})
set cbtics (${palette.map((_, i) => `"${i}" ${i}`).join(", ")})
set cbrange [-0.5:${palette.length - 0.5}]
`;

  const imgWidth = width ?? 1900;
  let script = `set term pngcairo size ${imgWidth}, ${imgWidth / ASPECT_RATIO}
set output "${outFile ?? "heatmap"}.png"
set title "${title}"
set size ratio -1
set yrange [-0.5:6.5]
set xrange [-0.5:52.5]
set xtics (${xtics})
set ytics (${ytics})
${paletteString}
unset key
${colorbox ? "" : "un"}set colorbox
plot "-" using 2:1:3 with image
`;

  const paddingBefore =
    DAYS_OF_WEEK[moment(`${year}-01-01`, "YYYY-MM-DD").format("ddd")];

  const dataPadded = Array(paddingBefore)
    .fill(0)
    .concat(data.concat(Array(371 - data.length - paddingBefore).fill(0)));

  dataPadded.forEach((count, day) => {
    script += `${day % 7} ${Math.floor(day / 7)} ${count}\n`;
  });

  return script;
}

const DAYS_OF_WEEK: { [key: string]: number } = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ASPECT_RATIO = 19 / 4;
