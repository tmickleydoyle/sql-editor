"use client";

import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ResponsiveLine } from "@nivo/line"
import Link from "next/link"
import React, { useState } from "react";

const dataCatalog = [
  {
    schema: "Users",
    tables: ["UsersTable1", "UsersTable2", "UsersTable3", "UsersTable4"],
  },
  {
    schema: "Orders",
    tables: ["OrdersTable1", "OrdersTable2", "OrdersTable3"],
  },
  {
    schema: "Products",
    tables: ["ProductsTable1", "ProductsTable2"],
  },
];

function DataCatalog() {
  const [openSchema, setOpenSchema] = useState<string | null>(null);

  const handleSchemaClick = (schema: string) => {
    setOpenSchema((openSchema: string | null) => (openSchema === schema ? null : schema));
  };

  return (
    <nav className="space-y-2 text-sm">
      {dataCatalog.map((schema) => (
        <div key={schema.schema} className="space-y-1">
          <a
            className="block font-semibold cursor-pointer font-mono text-gray-900 dark:text-gray-50"
            onClick={() => handleSchemaClick(schema.schema)}
          >
            {schema.schema}
          </a>
          {openSchema === schema.schema && (
            <div className="ml-4">
              {schema.tables.map((table) => (
                <div key={table}>
                  <Link href="#">
                    <div className="block font-mono text-gray-900 dark:text-gray-50">{table}</div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

function SqlEditor() {

    const [code, setCode] = useState(`
    SELECT * FROM users`
    );

    const handleCodeChange = (e) => {
      console.log(e.target.textContent)
      setCode(e.target.textContent);
    };

  return (
    <div className="grid h-screen grid-cols-[85%_15%]">
      <div className="grid grid-rows-[50%_50%] gap-4 p-4">
        <Card className="flex flex-col">
          <CardHeader>
            <Input className="mb-2" placeholder="Enter Query Title" />
            <Input className="mb-2" placeholder="Describe what the query is doing" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="border rounded-lg p-2 bg-[#f6f8fa] dark:bg-gray-800" contentEditable={true} onChange={handleCodeChange}>
              <pre className="text-sm font-mono text-gray-900 dark:text-gray-50 code-container">
                  <code>{code}</code>
              </pre>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <Button>Submit</Button>
                <Button variant="outline">Cancel</Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Ask AI</Button>
                <Button variant="outline">Share</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="table">
          <TabsList className="gap-4">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <Card className="flex flex-col">
              <CardContent>
                <br />
                <div className="flex justify-end mb-4">
                  <Button variant="outline">Download Data</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Jane Doe</TableCell>
                      <TableCell>jane@example.com</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chart">
            <Card className="flex flex-col">
              <CardContent>
                <br />
                <div className="flex justify-end mb-4">
                  <Button variant="outline">Download Chart</Button>
                </div>
                <LineChart className="aspect-[10/2]" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="border-l p-4 ">
        <h2 className="font-semibold mb-4">Data Catalog</h2>
        <DataCatalog />
      </div>
    </div>
  )
}

interface Props {
  // define the props interface here
}

function LineChart(props: Props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}

export default SqlEditor;
