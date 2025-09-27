"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

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


