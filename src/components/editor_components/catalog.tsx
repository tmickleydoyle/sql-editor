import Link from "next/link"

import React, { useState } from "react";

function DataCatalog() {
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

export default DataCatalog;