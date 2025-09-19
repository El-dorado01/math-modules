// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "math-field": React.DetailedHTMLProps<
//         React.HTMLAttributes<MathfieldElement>,
//         MathfieldElement
//       >;
//     }
//   }
// }

// import "https://esm.run/mathlive";
// import { useState } from "react";

// export default function App({ children }) {
//   const [value, setValue] = useState<string>("");

//   return (
//     <div>
//       <math-field
//         onInput={(evt: React.ChangeEvent<HTMLElement>) =>
//           setValue(evt.target.value)
//         }
//       >
//         {children}
//       </math-field>
//       <p>Value: {value}</p>
//     </div>
//   );
// }

