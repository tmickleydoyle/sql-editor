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
            tableName: "desktop_devices",
            columns: [
            { columnName: "device_id", description: "Unique identifier for the desktop device" },
            { columnName: "brand", description: "Brand of the desktop device" },
            { columnName: "model", description: "Model of the desktop device" },
            ],
        },
        {
            tableName: "mobile_devices",
            columns: [
            { columnName: "device_id", description: "Unique identifier for the mobile device" },
            { columnName: "brand", description: "Brand of the mobile device" },
            { columnName: "model", description: "Model of the mobile device" },
            { columnName: "operating_system", description: "Operating system of the mobile device" },
            ],
        },
        {
            tableName: "tablet_devices",
            columns: [
            { columnName: "device_id", description: "Unique identifier for the tablet device" },
            { columnName: "brand", description: "Brand of the tablet device" },
            { columnName: "model", description: "Model of the tablet device" },
            { columnName: "screen_size", description: "Screen size of the tablet device" },
            ],
        },
        {
            tableName: "devices_usage",
            columns: [
            { columnName: "id", description: "Unique identifier for the device usage type and month" },
            { columnName: "device_type", description: "Type of the device" },
            { columnName: "month", description: "Month of the device usage" },
            { columnName: "count", description: "Count of the device usage" },
            ],
        },
        ],
    },
    {
        schema: "user_profiles",
        tables: [
        {
            tableName: "user_accounts",
            columns: [
            { columnName: "user_id", description: "Unique identifier for the user account" },
            { columnName: "username", description: "Username of the user" },
            { columnName: "email", description: "Email address of the user" },
            ],
        },
        {
            tableName: "user_details",
            columns: [
            { columnName: "user_id", description: "Unique identifier for the user details" },
            { columnName: "full_name", description: "Full name of the user" },
            { columnName: "birthdate", description: "Birthdate of the user" },
            { columnName: "gender", description: "Gender of the user" },
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

