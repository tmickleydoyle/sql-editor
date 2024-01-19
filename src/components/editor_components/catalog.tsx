import Link from "next/link";
import React, { useState } from "react";

function DataCatalog() {
  const dataCatalog = [
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


  const [openSchema, setOpenSchema] = useState<string | null>(null);
  const [openTable, setOpenTable] = useState<string | null>(null);

  const handleSchemaClick = (schema: string) => {
    setOpenSchema((openSchema: string | null) => (openSchema === schema ? null : schema));
  };

  const handleTableClick = (tableName: string) => {
    setOpenTable((openTable: string | null) => (openTable === tableName ? null : tableName));
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
                <div key={table.tableName}>
                  <div
                    className="block font-mono text-gray-900 dark:text-gray-50 cursor-pointer"
                    onClick={() => handleTableClick(table.tableName)}
                  >
                    {table.tableName}
                  </div>
                  {openTable === table.tableName && (
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default DataCatalog;
