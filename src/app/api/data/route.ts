interface Data {
    id: number;
    device_type: string;
    month: string;
    count: number;
}

const data: Data[] = [];

// Generating data for each month from 2010 to 2023
for (let year = 2010; year <= 2023; year++) {
  for (let month = 1; month <= 12; month++) {
    const monthString = month < 10 ? `0${month}` : `${month}`;
    
    // Desktop
    data.push({ id: data.length + 1, device_type: 'Desktop', month: `${year}-${monthString}-01`, count: getRandomCount() });

    // Tablet
    data.push({ id: data.length + 1, device_type: 'Tablet', month: `${year}-${monthString}-01`, count: getRandomCount() });

    // Mobile
    data.push({ id: data.length + 1, device_type: 'Mobile', month: `${year}-${monthString}-01`, count: getRandomCount() });
  }
}

// Function to generate random count for demonstration purposes
function getRandomCount() {
  return Math.floor(Math.random() * 10000) + 1000; // Random count between 1000 and 11000
}

export async function GET(req: Request) {
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    })
}