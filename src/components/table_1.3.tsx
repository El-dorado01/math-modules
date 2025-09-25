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

interface Table3_DataProps {
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

const Table3_Data: Table3_DataProps[] = [
  {
    cell_origin: "0",
    cell_0: "0",
    cell_1: "1",
    cell_2: "2",
    cell_3: "10",
    cell_4: "11",
    cell_5: "12",
    cell_6: "20",
    cell_7: "21",
    cell_8: "22",
    cell_9: "100",
  },
  {
    cell_origin: "1",
    cell_0: "101",
    cell_1: "102",
    cell_2: "110",
    cell_3: "111",
    cell_4: "112",
    cell_5: "120",
    cell_6: "121",
    cell_7: "122",
    cell_8: "200",
    cell_9: "201",
  },
  {
    cell_origin: "2",
    cell_0: "202",
    cell_1: "210",
    cell_2: "211",
    cell_3: "212",
    cell_4: "220",
    cell_5: "221",
    cell_6: "222",
    cell_7: "1000",
    cell_8: "1001",
    cell_9: "1002",
  },
  {
    cell_origin: "3",
    cell_0: "1010",
    cell_1: "1011",
    cell_2: "1012",
    cell_3: "1020",
    cell_4: "1021",
    cell_5: "1022",
    cell_6: "1100",
    cell_7: "1101",
    cell_8: "1102",
    cell_9: "1110",
  },
  {
    cell_origin: "4",
    cell_0: "1111",
    cell_1: "1112",
    cell_2: "1120",
    cell_3: "1121",
    cell_4: "1122",
    cell_5: "1200",
    cell_6: "1201",
    cell_7: "1202",
    cell_8: "1210",
    cell_9: "1211",
  },
  {
    cell_origin: "5",
    cell_0: "1212",
    cell_1: "1220",
    cell_2: "1221",
    cell_3: "1222",
    cell_4: "2000",
    cell_5: "2001",
    cell_6: "2002",
    cell_7: "2010",
    cell_8: "2011",
    cell_9: "2012",
  },
  {
    cell_origin: "6",
    cell_0: "2020",
    cell_1: "2021",
    cell_2: "2022",
    cell_3: "2100",
    cell_4: "2101",
    cell_5: "2102",
    cell_6: "2110",
    cell_7: "2111",
    cell_8: "2112",
    cell_9: "2120",
  },
];

const Table3 = () => {
  return (
    <Table className="max-w-[600px] w-full">
      <TableCaption>Table 1.3</TableCaption>
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
        {Table3_Data.map((data) => (
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

export default Table3;
