import { v4 as uuidv4 } from 'uuid';

interface Data {
  [key: string]: any;
}

function generateMockData(): Data[] {
  const data: Data[] = [];
  let desktopTotal = 0;
  let tabletTotal = 0;
  let mobileTotal = 0;

  for (let year = 1983; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthString = month < 10 ? `0${month}` : `${month}`;

      // Update cumulative count for each device type
      desktopTotal += getRandomCount() * 2;
      tabletTotal += getRandomCount() * 1;
      mobileTotal += getRandomCount() * 3;

      // Push data with cumulative count
      data.push({ id: uuidv4().toString(), device_type: 'Desktop'.toString(), month: `${year}-${monthString}-01`.toString(), count: desktopTotal });
      data.push({ id: uuidv4().toString(), device_type: 'Tablet'.toString(), month: `${year}-${monthString}-01`.toString(), count: tabletTotal });
      data.push({ id: uuidv4().toString(), device_type: 'Mobile'.toString(), month: `${year}-${monthString}-01`.toString(), count: mobileTotal });
    }
  }

  return data;
}

function getRandomCount(): number {
  return Math.floor(Math.random() * 100) + Math.floor(Math.random() * 10);
}

export async function GET(req: Request) {
  try {
    const data = generateMockData();
    const stream = createStreamFromData(data);
    return new Response(stream as any, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

function createStreamFromData(data: Data[]): ReadableStream {
  try {
    const serializedData = JSON.stringify(data);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(serializedData));
        controller.close();
      },
    });
    return stream;
  } catch (error) {
    console.error('Error creating stream:', error);
    throw error;
  }
}