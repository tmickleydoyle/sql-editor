import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  data?: { id: number; device_type: string; month: string; count: number }[];
}

function DataTable(props: Props) {
  return (
    <>
      <div className="flex justify-end mb-4" {...props}>
        <Button variant="outline">Download Data</Button>
      </div>
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              {props.data && Object.keys(props.data[0]).map((key) => (
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