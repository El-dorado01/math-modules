import { useCallback } from "react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Base } from "@/hooks/useBaseConverter";

interface Result {
  base: string;
  value: string;
}

interface ConverterFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  fromBase: Base;
  setFromBase: (value: Base) => void;
  toBase: Base;
  setToBase: (value: Base) => void;
  convertNumber: () => void;
  clearAll: () => void;
  results: Result[];
  isConverting: boolean;
  isValidNumber: (num: string, base: number) => boolean;
}

export const ConverterForm = ({
  inputValue,
  setInputValue,
  fromBase,
  setFromBase,
  toBase,
  setToBase,
  convertNumber,
  clearAll,
  results,
  isConverting,
  isValidNumber,
}: ConverterFormProps) => {
  const bases = [
    { value: Base.Binary, label: "Binary (2)" },
    { value: Base.Octal, label: "Octal (8)" },
    { value: Base.Decimal, label: "Decimal (10)" },
    { value: Base.Hexadecimal, label: "Hexadecimal (16)" },
    { value: Base.Ternary, label: "Ternary (3)" },
    { value: Base.Septenary, label: "Septenary (7)" },
    { value: Base.Duodecimal, label: "Duodecimal (12)" },
    { value: Base.Base36, label: "Base 36" },
  ];

  const debouncedSetInputValue = useCallback(
    debounce((value: string) => {
      setInputValue(value.replace(/[^0-9A-Za-z]/g, ""));
    }, 300),
    [setInputValue]
  );

  const isInputValid = isValidNumber(inputValue, parseInt(fromBase));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Number to Convert
          </label>
          <Input
            value={inputValue}
            onChange={(e) => debouncedSetInputValue(e.target.value)}
            placeholder="Enter number (e.g., 1010, FF, 123)"
            className={`text-lg ${
              !isInputValid && inputValue ? "border-red-500" : ""
            }`}
            disabled={isConverting}
          />
          {!isInputValid && inputValue && (
            <p className="text-red-500 text-sm mt-1">
              Invalid input for base {fromBase}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">From Base</label>
            <Select
              value={fromBase}
              onValueChange={setFromBase}
              disabled={isConverting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bases.map((base) => (
                  <SelectItem key={base.value} value={base.value}>
                    {base.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">To Base</label>
            <Select
              value={toBase}
              onValueChange={setToBase}
              disabled={isConverting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bases.map((base) => (
                  <SelectItem key={base.value} value={base.value}>
                    {base.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={convertNumber}
            className="flex-1"
            disabled={isConverting}
          >
            {isConverting ? "Converting..." : "Convert"}
          </Button>
          <Button onClick={clearAll} variant="outline" disabled={isConverting}>
            Clear
          </Button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Conversions:</h3>
          <div className="grid grid-cols-2 gap-2">
            {results.map((result) => (
              <div
                key={result.base}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <Badge variant="outline">Base {result.base}</Badge>
                <span className="font-mono font-semibold">{result.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
