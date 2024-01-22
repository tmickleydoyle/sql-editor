import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props<T extends { id: string }> { // Add generic constraint for 'id' property
  data?: T[];
}

function DataTable<T extends { id: string }>(props: Props<T>) { // Add generic constraint for 'id' property
  return (
    <>
      <div className="flex justify-end mb-4" {...props}>
        <Button variant="outline">Download Data</Button>
      </div>
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              {props.data && Object.keys(props.data[0] as object).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data?.map((row) => (
              <TableRow key={row.id}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default DataTable;
