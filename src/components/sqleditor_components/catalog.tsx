import { CardHeader, CardContent, Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useState, useEffect } from "react";

interface Schema {
  schema: string;
  tables: Table[];
}

interface Table {
  tableName: string;
  columns: Column[];
}

interface Column {
  columnName: string;
  description: string;
}

function DataCatalog() {
  const [dataCatalog, setDataCatalog] = useState<Schema[] | null>(null);
  const [openSchema, setOpenSchema] = useState<string | null>(null);
  const [openTable, setOpenTable] = useState<string | null>(null);

  const handleSchemaClick = (schema: string) => {
    setOpenSchema((prevOpenSchema) => (prevOpenSchema === schema ? null : schema));
  };

  const handleTableClick = (tableName: string) => {
    setOpenTable((prevOpenTable) => (prevOpenTable === tableName ? null : tableName));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/catalog');
        const result = await response.json();
        setDataCatalog(result);
      } catch (error) {
        console.error('Error fetching data catalog:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Card className="border-none shadow-none">
        <Card className="flex flex-col border-none shadow-none">
          <CardHeader>
            <h2 className="text-xl font-semibold">Data Catalog</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm">
              The data catalog contains all the tables and columns available in the database. You can
              use the data catalog to explore the database schema and find the data you need for your
              query.
            </p>
            <Accordion key="schemaAccordian" type="single" collapsible className="w-full">
              {dataCatalog && dataCatalog.map((schema: Schema) => (
                <AccordionItem key={schema.schema} value={schema.schema}>
                  <AccordionTrigger>
                    <a
                      className="block font-semibold cursor-pointer font-mono text-gray-900 dark:text-gray-50"
                      onClick={() => handleSchemaClick(schema.schema)}
                    >
                      {schema.schema}
                    </a>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-4">
                      <Accordion key="tableAccordian" type="single" collapsible className="w-full">
                      {schema.tables.map((table) => (
                        <div key={table.tableName}>
                            <AccordionItem key={table.tableName} value={table.tableName}>
                              <AccordionTrigger>
                                <div
                                  className="block font-mono text-gray-900 dark:text-gray-50 cursor-pointer"
                                  onClick={() => handleTableClick(table.tableName)}
                                >
                                  {table.tableName}
                                </div>
                              </AccordionTrigger>
                                <AccordionContent>
                                  <div className="ml-4">
                                    {table.columns.map((column) => (
                                      <div key={column.columnName} className="flex">
                                        <div className="font-mono text-gray-600 dark:text-gray-300">
                                          {column.columnName}:
                                        </div>
                                        <div className="ml-2 text-gray-900 dark:text-gray-50">
                                          {column.description}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                      ))}
                      </Accordion>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </Card>
    </>
  );
}

export default DataCatalog;