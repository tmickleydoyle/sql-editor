import { v4 as uuidv4 } from 'uuid';

interface Data {
  [key: string]: any;
}

function generateMockData(): Data[] {
  const data: Data[] = [];

  for (let year = 2010; year <=2024; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthString = month < 10 ? `0${month}` : `${month}`;
      data.push({ id: uuidv4().toString(), device_type: 'Desktop'.toString(), month: `${year}-${monthString}-01`.toString(), count: getRandomCount() });
      data.push({ id: uuidv4().toString(), device_type: 'Tablet'.toString(), month: `${year}-${monthString}-01`.toString(), count: getRandomCount() });
      data.push({ id: uuidv4().toString(), device_type: 'Mobile'.toString(), month: `${year}-${monthString}-01`.toString(), count: getRandomCount() });
    }
  }

  return data;
}

function getRandomCount(): number {
  return Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100);
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