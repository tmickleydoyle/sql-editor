import { ResponsiveLine } from "@nivo/line"
import { Button } from "@/components/ui/button"

interface Props {
  tabledata?: { id: number; device_type: string; month: string; count: number }[];
}

const transformDataForChart = (tableData: Props["tabledata"]) => {
  const chartData = (tableData ?? []).reduce((acc, entry) => {
    const existingEntry = acc.find((item) => item && item.id === entry.device_type);

    const newDataPoint = { x: entry.month, y: entry.count };

    if (existingEntry) {
      existingEntry.data.push(newDataPoint);
    } else {
      acc.push({
        id: entry.device_type,
        data: [newDataPoint],
      });
    }

    return acc;
  }, [] as { id: string; data: { x: string; y: number }[] }[]);

  return chartData;
};


function LineChart(props: Props) {
  const data = transformDataForChart(props.tabledata);
  console.log(data)

  return (
    <>
    <div className="flex justify-end mb-4">
        <Button variant="outline">Download Chart</Button>
    </div>
    <div className="aspect-[10/3]">
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'month',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={3}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
    </>
  )
}

export default LineChart;