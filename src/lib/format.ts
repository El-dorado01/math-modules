export const formatSuperscript = (base: string, exponent: number): string => {
  const superscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
  return (
    base +
    exponent
      .toString()
      .split("")
      .map((digit) => superscripts[parseInt(digit)])
      .join("")
  );
};

export const formatSubscript = (text: string, subscript: string): string => {
  const subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
  const subText = subscript
    .split("")
    .map((digit) => subscripts[parseInt(digit)] || digit)
    .join("");
  return text + subText;
};
