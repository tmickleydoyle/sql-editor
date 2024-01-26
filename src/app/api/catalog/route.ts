interface Column {
  columnName: string;
  description: string;
}

interface Table {
  tableName: string;
  columns: Column[];
}

interface Schema {
  schema: string;
  tables: Table[];
}

const dataCatalog: Schema[] = [
    {
        schema: "devices",
        tables: [
        {
            tableName: "devices_usage",
            columns: [
            { columnName: "id", description: "Unique identifier for the device usage type and month" },
            { columnName: "device_type", description: "Type of the device" },
            { columnName: "operating_system", description: "Operating system of the device" },
            { columnName: "month", description: "Month of the device usage" },
            { columnName: "usage", description: "Count of the device usage" },
            ],
        },
        ],
    },
];

export async function GET(req: Request) {
  return new Response(JSON.stringify(dataCatalog), {
    headers: { 'Content-Type': 'application/json' },
  })
}

