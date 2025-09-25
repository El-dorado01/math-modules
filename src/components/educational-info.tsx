// components/EducationalInfo.tsx
export const EducationalInfo = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Common Bases:</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong>Binary (2):</strong> Uses digits 0, 1 - Used in computers
          </li>
          <li>
            <strong>Octal (8):</strong> Uses digits 0-7 - Used in Unix
            permissions
          </li>
          <li>
            <strong>Decimal (10):</strong> Uses digits 0-9 - Standard counting
          </li>
          <li>
            <strong>Hexadecimal (16):</strong> Uses 0-9, A-F - Used in
            programming
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Examples:</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>42 (decimal) = 101010 (binary)</li>
          <li>255 (decimal) = FF (hexadecimal)</li>
          <li>1000 (decimal) = 1750 (octal)</li>
          <li>ABC (hex) = 2748 (decimal)</li>
        </ul>
      </div>
    </div>
  );
};
