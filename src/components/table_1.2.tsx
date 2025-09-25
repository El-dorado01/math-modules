"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Table2_DataProps {
  cell_origin: string;
  cell_0: string;
  cell_1: string;
  cell_2: string;
  cell_3: string;
  cell_4: string;
  cell_5: string;
  cell_6: string;
  cell_7: string;
  cell_8: string;
  cell_9: string;
}

const Table2_Data: Table2_DataProps[] = [
  {
    cell_origin: "0",
    cell_0: "0",
    cell_1: "1",
    cell_2: "10",
    cell_3: "11",
    cell_4: "100",
    cell_5: "101",
    cell_6: "110",
    cell_7: "111",
    cell_8: "1000",
    cell_9: "1001",
  },
  {
    cell_origin: "1",
    cell_0: "1010",
    cell_1: "1011",
    cell_2: "1100",
    cell_3: "1101",
    cell_4: "1110",
    cell_5: "1111",
    cell_6: "10000",
    cell_7: "10001",
    cell_8: "10010",
    cell_9: "10011",
  },
  {
    cell_origin: "2",
    cell_0: "10100",
    cell_1: "10101",
    cell_2: "10110",
    cell_3: "10111",
    cell_4: "11000",
    cell_5: "11001",
    cell_6: "11010",
    cell_7: "11011",
    cell_8: "11100",
    cell_9: "11101",
  },
  {
    cell_origin: "3",
    cell_0: "11110",
    cell_1: "11111",
    cell_2: "100000",
    cell_3: "100001",
    cell_4: "100010",
    cell_5: "100011",
    cell_6: "100100",
    cell_7: "100101",
    cell_8: "110000",
    cell_9: "100111",
  },
  {
    cell_origin: "4",
    cell_0: "101000",
    cell_1: "101001",
    cell_2: "101010",
    cell_3: "101011",
    cell_4: "101100",
    cell_5: "101101",
    cell_6: "101110",
    cell_7: "101111",
    cell_8: "110100",
    cell_9: "110001",
  },
  {
    cell_origin: "5",
    cell_0: "110010",
    cell_1: "110011",
    cell_2: "110100",
    cell_3: "110101",
    cell_4: "110110",
    cell_5: "110111",
    cell_6: "111000",
    cell_7: "111001",
    cell_8: "111010",
    cell_9: "111011",
  },
];

const Table2 = () => {
  return (
    <Table className="max-w-[600px] w-full">
      <TableCaption>Table 1.2</TableCaption>
      <TableHeader>
        <TableRow className="bg-sidebar-accent">
          <TableHead className="w-[150px] sticky left-0"></TableHead>
          <TableHead>0</TableHead>
          <TableHead>1</TableHead>
          <TableHead>2</TableHead>
          <TableHead>3</TableHead>
          <TableHead>4</TableHead>
          <TableHead>5</TableHead>
          <TableHead>6</TableHead>
          <TableHead>7</TableHead>
          <TableHead>8</TableHead>
          <TableHead>9</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Table2_Data.map((data) => (
          <TableRow key={data.cell_0}>
            <TableCell className="sticky left-0 bg-sidebar-accent">
              {data.cell_origin}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_0}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_1}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_2}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_3}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_4}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_5}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_6}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_7}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_8}
            </TableCell>
            <TableCell className="break-words max-w-xs">
              {data.cell_9}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table2;
