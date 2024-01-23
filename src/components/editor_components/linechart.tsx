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
  tabledata?: TableDataEntry[];
}

type TableDataEntry = {
  [key: string]: any;
};

const transformDataForChart = (tableData: Props["tabledata"], xColumn: string, yColumn: string, seriesColumn: string) => {
  if (xColumn === null || yColumn === null) return [] as { id: string; data: { x: string; y: number }[] }[];
  const chartData = (tableData ?? []).reduce((acc, entry) => {
    const existingEntry = acc.find((item: { id: string }) => item && item.id === entry[seriesColumn]);

    const newDataPoint = { x: entry[xColumn], y: entry[yColumn] };

    if (seriesColumn === '' || seriesColumn === 'None') {
      const overallSeries = acc.find((series: { id: string; data: { x: string; y: number }[] }) => series.id === "Overall");

      if (overallSeries) {
        const existingDataPoint = overallSeries.data.find((data: { x: string; y: number }) => data.x === entry[xColumn]);

        if (existingDataPoint) {
          existingDataPoint.y += entry[yColumn];
        } else {
          overallSeries.data.push(newDataPoint);
        }
      } else {
        acc.push({
          id: "Overall",
          data: [newDataPoint],
        });
      }
    } else if (existingEntry) {
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
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [seriesColumn, setSeriesColumn] = useState('None');
  const [chartData, setChartData] = useState<{ id: string; data: { x: string; y: number }[] }[]>([]);

  useEffect(() => {
    const data = transformDataForChart(props.tabledata, xColumn, yColumn, seriesColumn);
    setChartData(data as { id: string; data: { x: string; y: number }[] }[]);
  }, [props.tabledata, xColumn, yColumn, seriesColumn]);

  const getStringColumnOptions = () => {
    const columns = props.tabledata ? Object.keys(props.tabledata[0] || {}) : [];
    const numericColumns = columns.filter((column) => {
      return props.tabledata?.some((row) => isNaN(row[column]));
    });

    return numericColumns.map((column) => (
      <SelectItem key={uuid()} value={column}>{column}</SelectItem>
    ));
  };

  const getNumberColumnOptions = () => {
    const columns = props.tabledata ? Object.keys(props.tabledata[0] || {}) : [];
    const numericColumns = columns.filter((column) => {
      return props.tabledata?.some((row) => !isNaN(row[column]));
    });

    return numericColumns.map((column) => (
      <SelectItem key={uuid()} value={column}>{column}</SelectItem>
    ));
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline">Download Chart</Button>
      </div>
      
        <div className="grid grid-cols-[85%_15%]">
          <div className="aspect-[10/4]">
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                  type: 'linear',
                  min: 0,
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
          <div>
              <Label htmlFor="framework">x-axis</Label>
              <Select onValueChange={(value) => setXColumn(value)}>
                <SelectTrigger id="x-axis">
                  <SelectValue placeholder={null}/>
                </SelectTrigger>
                <SelectContent position="popper">
                  {getStringColumnOptions()}
                </SelectContent>
              </Select>
              <Label htmlFor="framework">y-axis</Label>
              <Select onValueChange={(value) => setYColumn(value)}>
                <SelectTrigger id="y-axis">
                  <SelectValue placeholder={null} />
                </SelectTrigger>
                <SelectContent position="popper">
                  {getNumberColumnOptions()}
                </SelectContent>
              </Select>
              <Label htmlFor="framework">series</Label>
              <Select onValueChange={(value) => setSeriesColumn(value)}>
                <SelectTrigger id="series-axis">
                  <SelectValue placeholder={null} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem key={uuid()} value={'None'}>{'None'}</SelectItem>
                  {getStringColumnOptions()}
                </SelectContent>
              </Select>
            </div>
        </div>
    </>
  );
}

export default LineChart;
