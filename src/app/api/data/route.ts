interface Data {
    id: number;
    device_type: string;
    month: string;
    count: number;
}

const data: Data[] = [
  // Desktop
  { id: 1, device_type: 'Desktop', month: '2023-01-01', count: 2145 },
  { id: 2, device_type: 'Desktop', month: '2023-02-01', count: 1375 },
  { id: 3, device_type: 'Desktop', month: '2023-03-01', count: 1889 },
  { id: 4, device_type: 'Desktop', month: '2023-04-01', count: 1943 },
  { id: 5, device_type: 'Desktop', month: '2023-05-01', count: 1009 },
  { id: 6, device_type: 'Desktop', month: '2023-06-01', count: 2234 },
  { id: 19, device_type: 'Desktop', month: '2023-07-01', count: 1342 },
  { id: 20, device_type: 'Desktop', month: '2023-08-01', count: 1678 },
  { id: 21, device_type: 'Desktop', month: '2023-09-01', count: 2156 },
  { id: 22, device_type: 'Desktop', month: '2023-10-01', count: 2012 },
  { id: 23, device_type: 'Desktop', month: '2023-11-01', count: 1298 },
  { id: 24, device_type: 'Desktop', month: '2023-12-01', count: 1543 },

  // Tablet
  { id: 7, device_type: 'Tablet', month: '2023-01-01', count: 1265 },
  { id: 8, device_type: 'Tablet', month: '2023-02-01', count: 1554 },
  { id: 9, device_type: 'Tablet', month: '2023-03-01', count: 2089 },
  { id: 10, device_type: 'Tablet', month: '2023-04-01', count: 1764 },
  { id: 11, device_type: 'Tablet', month: '2023-05-01', count: 1312 },
  { id: 12, device_type: 'Tablet', month: '2023-06-01', count: 2011 },
  { id: 25, device_type: 'Tablet', month: '2023-07-01', count: 2233 },
  { id: 26, device_type: 'Tablet', month: '2023-08-01', count: 1297 },
  { id: 27, device_type: 'Tablet', month: '2023-09-01', count: 2187 },
  { id: 28, device_type: 'Tablet', month: '2023-10-01', count: 1865 },
  { id: 29, device_type: 'Tablet', month: '2023-11-01', count: 1524 },
  { id: 30, device_type: 'Tablet', month: '2023-12-01', count: 1743 },

  // Mobile
  { id: 13, device_type: 'Mobile', month: '2023-01-01', count: 2034 },
  { id: 14, device_type: 'Mobile', month: '2023-02-01', count: 1445 },
  { id: 15, device_type: 'Mobile', month: '2023-03-01', count: 1776 },
  { id: 16, device_type: 'Mobile', month: '2023-04-01', count: 2210 },
  { id: 17, device_type: 'Mobile', month: '2023-05-01', count: 1256 },
  { id: 18, device_type: 'Mobile', month: '2023-06-01', count: 2323 },
  { id: 31, device_type: 'Mobile', month: '2023-07-01', count: 1412 },
  { id: 32, device_type: 'Mobile', month: '2023-08-01', count: 1987 },
  { id: 33, device_type: 'Mobile', month: '2023-09-01', count: 1756 },
  { id: 34, device_type: 'Mobile', month: '2023-10-01', count: 2098 },
  { id: 35, device_type: 'Mobile', month: '2023-11-01', count: 1234 },
  { id: 36, device_type: 'Mobile', month: '2023-12-01', count: 1421 },
];

export async function GET(req: Request) {
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    })
}