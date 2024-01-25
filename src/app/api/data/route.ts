import { v4 as uuidv4 } from 'uuid';

interface Data {
  [key: string]: any;
}

function generateMockData(): Data[] {
  const data: Data[] = [];
  let total = 0;

  for (let year = 1983; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthString = month < 10 ? `0${month}` : `${month}`;

      // Update cumulative count for each device type
      total += getRandomCount();

      // Push data with cumulative count
      data.push({ id: uuidv4().toString(), operating_system: 'Windows'.toString(), device_type: 'Desktop'.toString(), month: `${year}-${monthString}-01`.toString(), count: total * 0.1 });
      data.push({ id: uuidv4().toString(), operating_system: 'MacOS'.toString(), device_type: 'Desktop'.toString(), month: `${year}-${monthString}-01`.toString(), count: total * 0.2 });
      data.push({ id: uuidv4().toString(), operating_system: 'Windows'.toString(), device_type: 'Tablet'.toString(), month: `${year}-${monthString}-01`.toString(), count: total * 0.3 });
      data.push({ id: uuidv4().toString(), operating_system: 'MacOS'.toString(), device_type: 'Tablet'.toString(), month: `${year}-${monthString}-01`.toString(), count: total * 0.4 });
      data.push({ id: uuidv4().toString(), operating_system: 'Windows'.toString(), device_type: 'Mobile'.toString(), month: `${year}-${monthString}-01`.toString(), count: total * 0.5 });
      data.push({ id: uuidv4().toString(), operating_system: 'MacOS'.toString(), device_type: 'Mobile'.toString(), month: `${year}-${monthString}-01`.toString(), count: total * 0.6 });
    }
  }

  return data;
}

function getRandomCount(): number {
  return Math.floor(Math.random() * 100) + Math.floor(Math.random() * 10);
}

export async function GET(req: Request) {
  try {
    const stream = createStreamWithDelay();
    return new Response(stream as any, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

function createStreamWithDelay(): ReadableStream {
  try {
    const encoder = new TextEncoder();
    const data = generateMockData();
    const serializedData = JSON.stringify(data);
    const dataChunk = encoder.encode(serializedData);
    const emptyObject = encoder.encode("{}");

    const stream = new ReadableStream({
       // Immediately enqueue an empty object to signal start of stream
      async pull(controller) {
        controller.enqueue(emptyObject);
        controller.close();
      },
      async start(controller) {
        controller.enqueue(dataChunk);
        controller.close();
      },
    });

    return stream;
  } catch (error) {
    console.error('Error creating stream:', error);
    throw error;
  }
}
