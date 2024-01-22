import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { uuid } from "uuidv4";

interface Props {
  className?: string;
  tabledata?: { id: number; device_type: string; month: string; count: number }[];
}

const transformDataForChart = (tableData: Props["tabledata"], xColumn: string, yColumn: string, seriesColumn: string) => {
  const chartData = (tableData ?? []).reduce((acc, entry) => {
    const existingEntry = acc.find((item) => item && item.id === entry[seriesColumn]);

    const newDataPoint = { x: entry[xColumn], y: entry[yColumn] };

    if (existingEntry) {
      existingEntry.data.push(newDataPoint);
    } else {
      acc.push({
        id: entry[seriesColumn],
        data: [newDataPoint],
      });
    }

    return acc;
  }, [] as { id: string; data: { x: string; y: number }[] }[]);

  return chartData;
};

function LineChart(props: Props) {
  const [xColumn, setXColumn] = useState("month");
  const [yColumn, setYColumn] = useState("count");
  const [seriesColumn, setSeriesColumn] = useState("device_type");
  const [chartData, setChartData] = useState<{ id: string; data: { x: string; y: number }[] }[]>([]);

  useEffect(() => {
    const data = transformDataForChart(props.tabledata, xColumn, yColumn, seriesColumn);
    setChartData(data);
  }, [props.tabledata, xColumn, yColumn, seriesColumn]);

  const getColumnOptions = () => {
    const columns = props.tabledata ? Object.keys(props.tabledata[0] || {}) : [];
    return columns.map((column) => (
      <SelectItem key={uuid()} value={column}>{column}</SelectItem>
    ))
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline">Download Chart</Button>
      </div>
      
        <Label htmlFor="framework">x-axis</Label>
        <Select onValueChange={(value) => setXColumn(value)}>
          <SelectTrigger id="x-axis">
            <SelectValue placeholder={null}/>
          </SelectTrigger>
          <SelectContent position="popper">
            {getColumnOptions()}
          </SelectContent>
        </Select>
        <Label htmlFor="framework">y-axis</Label>
        <Select onValueChange={(value) => setYColumn(value)}>
          <SelectTrigger id="y-axis">
            <SelectValue placeholder={null} />
          </SelectTrigger>
          <SelectContent position="popper">
            {getColumnOptions()}
          </SelectContent>
        </Select>
        <Label htmlFor="framework">series</Label>
        <Select onValueChange={(value) => setSeriesColumn(value)}>
          <SelectTrigger id="series-axis">
            <SelectValue placeholder={null} />
          </SelectTrigger>
          <SelectContent position="popper">
            {getColumnOptions()}
          </SelectContent>
        </Select>
        <div className="aspect-[10/2]">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
                legend: xColumn.toString(),
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: yColumn.toString(),
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
  );
}

export default LineChart;
