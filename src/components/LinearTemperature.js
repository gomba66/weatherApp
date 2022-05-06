import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// function valuetext(value) {
//   return `${value}°C`;
// }

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}
const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

// export default function LinearTemperature() {
//   return (
//     <Box sx={{ width: 200 }}>
//       <Slider
//         defaultValue={[0, 100]}
//         valueLabelFormat={valueLabelFormat}
//         disableSwap={true}
//         valueLabelDisplay="auto"
//         marks={marks}
//       />
//     </Box>
//   );
// }
