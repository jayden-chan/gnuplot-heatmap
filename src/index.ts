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
  outFile: string;
  data: number[];
  year: number;
  palette?: string[];
  colorbox?: boolean;
};

/**
 * @param {string} title The title of the heatmap
 * @param {string} outFile The title of the output png
 * @param {number[]} data The data to plot
 * @param {string[]} [palette] Alternate color palette to use
 * @param {boolean} [colorbox] Whether or not to include the colorbox
 *
 * @return {string} The gnuplot script to generate the heatmap
 */
export default function HeatMap({
  title,
  outFile,
  data,
  year,
  palette,
  colorbox,
}: HeatmapInputs): string {
  const xtics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const week =
        Number(moment(`${i}-01-${year}`, "M-DD-YYYY").format("w")) - 1;
      const month = moment(`${i}-01-${year}`, "M-DD-YYYY").format("MMMM");
      return `"${month}" ${week}`;
    })
    .join(", ");

  const ytics = Object.entries(DAYS_OF_WEEK)
    .map(([day, idx]) => `"${day}" ${idx}`)
    .join(", ");

  const paletteString =
    palette === undefined
      ? ""
      : `set palette maxcolors ${palette.length}
set palette defined (${palette.map((p, idx) => `${idx} '${p}'`).join(", ")})
`;

  let script = `set term png size 1770, 325
set output "${outFile}.png"
set title "${title}"
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
