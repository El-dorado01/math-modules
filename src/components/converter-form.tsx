// components/ConverterForm.tsx
import { useState } from "react";
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

interface ConverterFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  fromBase: string;
  setFromBase: (value: string) => void;
  toBase: string;
  setToBase: (value: string) => void;
  convertNumber: () => void;
  clearAll: () => void;
  results: { base: string; value: string }[];
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
}: ConverterFormProps) => {
  const bases = [
    { value: "2", label: "Binary (2)" },
    { value: "8", label: "Octal (8)" },
    { value: "10", label: "Decimal (10)" },
    { value: "16", label: "Hexadecimal (16)" },
    { value: "3", label: "Ternary (3)" },
    { value: "7", label: "Septenary (7)" },
    { value: "12", label: "Duodecimal (12)" },
    { value: "36", label: "Base 36" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Number to Convert
          </label>
          <Input
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value.replace(/[^0-9A-Za-z]/g, ""))
            }
            placeholder="Enter number (e.g., 1010, FF, 123)"
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">From Base</label>
            <Select value={fromBase} onValueChange={setFromBase}>
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
            <Select value={toBase} onValueChange={setToBase}>
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
          <Button onClick={convertNumber} className="flex-1">
            Convert
          </Button>
          <Button onClick={clearAll} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      {/* Results */}
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
