"use client";

import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import React, { useState } from "react";

import Playground from "./sqleditor_components/playground";
import DataCatalog from "./sqleditor_components/catalog";
import DataTable from "./sqleditor_components/table";
import HiddenFooter from "./sqleditor_components/hidden_footer";
import LineChart from "./sqleditor_components/linechart";

interface DataItem {
  [key: string]: any | any;
}

function SqlEditor() {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [code, setCode] = useState(`SELECT * FROM devices.device_usage;`);
  const [hitRowMax, setHitRowMax] = useState(false);
  function handleOnChange(value?: string) {
    setCode(value || '');
  }

  const fetchData = async () => {
    const maxRetries = 5;

    for (let retry = 0; retry <= maxRetries; retry++) {
      try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = response.body;
        if (!data) {
          return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulatedString = '';

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const decodedChunk = decoder.decode(value);
            accumulatedString += decodedChunk;
          }
        }

        if (done) {
          if (!accumulatedString.endsWith("}]")) {
            const lastIndex = accumulatedString.lastIndexOf("},{");
            if (lastIndex !== -1 && !accumulatedString.endsWith("}]")) {
              accumulatedString = accumulatedString.substring(0, lastIndex) + "}]";
            }
          }
          setData(JSON.parse(accumulatedString));
          reader.releaseLock();
        }
        break;
      } catch (error) {
        console.error(`Error fetching data (retry ${retry + 1}/${maxRetries + 1}):`, error);

        if (retry === maxRetries) {
          console.error('Exceeded maximum retries.');
        }
      }
    }

    if (data && data.length >= 10000) {
      setHitRowMax(true);
    }
  };

  const [isDivVisible, setIsDivVisible] = useState(true);

  const toggleVisibility = () => {
    setIsDivVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    setData(null);
    fetchData();
  };

  const handleCancel = () => {
    setData(null);
  }

  return (
    <>
    <div className="flex items-left justify-end space-x-2 pt-2 pr-2">
      <Label htmlFor="catalog-mode" className="pt-2">Data Catalog</Label>
      <Switch id="catalog-mode" onClick={toggleVisibility}/>
    </div>
    <div className={`grid ${!isDivVisible ? 'grid-cols-[75%_25%]' : 'grid-cols-[100%_0%]'}`}>
      <div className="grid-rows-[50%_50%] gap-4 p-4">
        <Card className="border-none shadow-none">
          <Card className="flex flex-col border-none shadow-none">
          <CardHeader>
            <Input className="mb-2" placeholder="Enter Query Title" />
            <Input className="mb-2" placeholder="Describe what the query is doing" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Playground code={code} onChange={handleOnChange}/>
            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={handleCancel} variant="destructive">Cancel</Button>
                {hitRowMax && (
                  <Badge variant="secondary">Only showing first 10,000 rows</Badge>
                )}
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Save</Button>
                <Button variant="outline">Ask AI</Button>
                <Button variant="outline">Share</Button>
              </div>
            </div>
          </CardContent>
          </Card>
        <Tabs defaultValue="table">
          <TabsContent value="table">
            <Card className="flex flex-col border-none shadow-none">
            <TabsList className="gap-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
              <CardContent>
                <br />
                <DataTable data={data?.slice(0, 10000) || undefined}/>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chart">
            <Card className="flex flex-col border-none shadow-none">
            <TabsList className="gap-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
              <CardContent>
                <br />
                {data && data.length < 10000 && (
                  <LineChart tabledata={data?.slice(0, 5000) || undefined}/>
                )}
                {data && data.length >= 10000 && (
                  <div className="flex flex-col gap-4">
                  <Badge variant="secondary">Too many rows for visualizations. Reduce the data to 5,000 rows or less.</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </Card>
      </div>
      {!isDivVisible && (
      <div className="resize flex flex-col border-none">
          <DataCatalog />
      </div>
      )}
    </div>
    <HiddenFooter />
    </>
  )
}

export default SqlEditor;
