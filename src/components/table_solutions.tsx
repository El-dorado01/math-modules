"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { formatSubscript } from "@/lib/format";

interface TableSolution1_DataProps {
  no_of_balls: number;
  base_3: string;
  base_5: string;
  base_6: string;
  base_8: string;
}

const TableSolution1_Data: TableSolution1_DataProps[] = [
  {
    no_of_balls: 8,
    base_3: `two threes and two ones [${formatSubscript("22", "3")}]`,
    base_5: `one five and three ones [${formatSubscript("13", "5")}]`,
    base_6: `one six and two ones [${formatSubscript("12", "6")}]`,
    base_8: `one eight [${formatSubscript("10", "8")}]`,
  },
  {
    no_of_balls: 12,
    base_3: `three threes and one three [${formatSubscript("110", "3")}]`,
    base_5: `two fives and two ones [${formatSubscript("22", "5")}]`,
    base_6: `two sixes [${formatSubscript("20", "6")}]`,
    base_8: `one eight and four ones [${formatSubscript("14", "8")}]`,
  },
  {
    no_of_balls: 15,
    base_3: `one three of threes and two threes [${formatSubscript(
      "120",
      "3"
    )}]`,
    base_5: `three fives [${formatSubscript("30", "5")}]`,
    base_6: `two sixes and three ones [${formatSubscript("23", "6")}]`,
    base_8: `one eight and seven ones [${formatSubscript("17", "8")}]`,
  },
  {
    no_of_balls: 20,
    base_3: `two three of threes and two ones [${formatSubscript("202", "3")}]`,
    base_5: `four fives [${formatSubscript("40", "5")}]`,
    base_6: `three sixes and two ones [${formatSubscript("32", "6")}]`,
    base_8: `two eights and four ones [${formatSubscript("24", "8")}]`,
  },
];

export const TableSolution1 = () => {
  return (
    <Table className="max-w-auto">
      <TableBody>
        <TableRow>
          <TableCell>6</TableCell>
          <TableCell className="break-words max-w-xs">25</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>6</TableCell>
          <TableCell className="break-words max-w-xs">
            4 — Remainder — 1 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="sticky left-0 bg-sidebar-accent"></TableCell>
          <TableCell className="break-words max-w-xs">
            0 — Remainder — 4 
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};


export const TableSolution2 = () => {
  return (
    <Table className="max-w-auto">
      <TableBody>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell className="break-words max-w-xs">31</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell className="break-words max-w-xs">
            15 — Remainder — 1 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell className="break-words max-w-xs">
            7 — Remainder — 1 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell className="break-words max-w-xs">
            3 — Remainder — 1 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell className="break-words max-w-xs">
            1 — Remainder — 1 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="sticky left-0 bg-sidebar-accent"></TableCell>
          <TableCell className="break-words max-w-xs">
            0 — Remainder — 1 
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};


