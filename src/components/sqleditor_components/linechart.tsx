import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useState, useEffect, useCallback } from "react";
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
import { nanoid } from 'nanoid';

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
    const existingEntry = acc.find((series: { id: string; data: { x: string; y: number }[] }) => series.id === entry[seriesColumn]);  

    const newDataPoint = { x: entry[xColumn], y: entry[yColumn] };

    if (seriesColumn === '' || seriesColumn === 'None') {
      const overallSeries = acc.find((series: { id: string; data: { x: string; y: number }[] }) => series.id === "Overall");

      if (overallSeries) {
        const existingDataPoint = overallSeries.data.find((data: { x: string; y: number }) => data.x === entry[xColumn]);

        if (existingDataPoint) {
          existingDataPoint.y += entry[yColumn];
        } else {
          overallSeries.data.push({ ...newDataPoint });
        }
      } else {
        acc.push({
          id: "Overall",
          data: [{ ...newDataPoint }],
        });
      }
    } else if (existingEntry) {
      const existingDataPoint = existingEntry.data.find((data: { x: string; y: number }) => data.x === entry[xColumn]);

      if (existingDataPoint) {
        existingDataPoint.y += entry[yColumn];
      } else {
        existingEntry.data.push({ ...newDataPoint });
      }
    } else {
      acc.push({
        id: entry[seriesColumn],
        data: [{ ...newDataPoint }],
      });
    }

    return acc;
  }, []);

  return chartData;
};


function LineChart(props: Props) {
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [seriesColumn, setSeriesColumn] = useState('None');
  const [chartData, setChartData] = useState<{ id: string; data: { x: string; y: number }[] }[]>([]);
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (xColumn) {
      queryParams.append('xColumn', xColumn);
    }
    if (yColumn) {
      queryParams.append('yColumn', yColumn);
    }
    if (seriesColumn) {
      queryParams.append('seriesColumn', seriesColumn);
    }
    const newUrl = `${pathname}?${queryParams.toString()}`;
    router.push(newUrl);
  }, [xColumn, yColumn, seriesColumn, pathname, router]);

  useEffect(() => {
    const x = searchParams.get('xColumn');
    const y = searchParams.get('yColumn');
    const series = searchParams.get('seriesColumn');
    if (x) {
      setXColumn(x);
    }
    if (y) {
      setYColumn(y);
    }
    if (series) {
      setSeriesColumn(series);
    }
  }, [searchParams]);

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
      <SelectItem key={nanoid()} value={column}>{column}</SelectItem>
    ));
  };

  const getNumberColumnOptions = () => {
    const columns = props.tabledata ? Object.keys(props.tabledata[0] || {}) : [];
    const numericColumns = columns.filter((column) => {
      return props.tabledata?.some((row) => !isNaN(row[column]));
    });

    return numericColumns.map((column) => (
      <SelectItem key={nanoid()} value={column}>{column}</SelectItem>
    ));
  };

  return (
    <>
        <div className="grid grid-cols-[85%_15%]">
          <div className="aspect-[16/9]">
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 150, bottom: 60, left: 50 }}
              xScale={{ type: 'point' }}
              yScale={{
                  type: 'linear',
                  min: 0,
                  max: 'auto',
                  stacked: false,
                  reverse: false
              }}
              yFormat={" >-,.2f"}
              curve="natural"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -40,
                  legendOffset: 36,
                  legendPosition: 'middle',
                  tickValues: chartData.length > 0 && chartData[0].data.length > 12 ? chartData[0].data.filter((_, index) => index % 4 === 0).map((data) => data.x) : undefined,
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendOffset: -40,
                  legendPosition: 'middle'
              }}
              enableGridX={false}
              pointSize={1}
              // enableSlices="x"
              tooltip={({ point }) => {
                  return (
                      <div
                          style={{
                              background: 'white',
                              padding: '9px 12px',
                              border: '1px solid #ccc',
                          }}
                      >
                          <div className="container">
                            <div style={{ display: 'inline-block', height: '15px', width: '15px', backgroundColor: point.serieColor}}></div>
                            <span className="bold"><b>{' '}{point.serieId}{' '}</b></span>
                            <span className="bold">{'('}{point.data.xFormatted}{')'}:{' '}</span>
                            <span className="bold">{point.data.yFormatted}</span>
                        </div>
                      </div>
                  )
              }}
              pointColor={{ theme: 'background' }}
              colors={{ scheme: 'category10' }}
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
            <div className="flex justify-end mb-4">
              <Button variant="outline" disabled>Download Chart</Button>
            </div>
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
                  <SelectItem key={nanoid()} value={'None'}>{'None'}</SelectItem>
                  {getStringColumnOptions()}
                </SelectContent>
              </Select>
            </div>
        </div>
    </>
  );
}

export default LineChart;
