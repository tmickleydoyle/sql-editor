"use client";

import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"

import React, { useState } from "react";

import Playground from "./editor_components/playground";
import DataCatalog from "./editor_components/catalog";
import DataTable from "./editor_components/table";
import HiddenFooter from "./editor_components/hidden_footer";
import LineChart from "./editor_components/linechart";

function SqlEditor() {

  const data = [
    { id: 1, device_type: 'Desktop', month: 'Jan', count: 43},
    { id: 2, device_type: 'Desktop', month: 'Feb', count: 137},
    { id: 3, device_type: 'Desktop', month: 'Mar', count: 61},
    { id: 4, device_type: 'Desktop', month: 'Apr', count: 145},
    { id: 5, device_type: 'Desktop', month: 'May', count: 26},
    { id: 6, device_type: 'Desktop', month: 'Jun', count: 154},
    { id: 7, device_type: 'Tablet', month: 'Jan', count: 16},
    { id: 8, device_type: 'Tablet', month: 'Feb', count: 34},
    { id: 9, device_type: 'Tablet', month: 'Mar', count: 28},
    { id: 10, device_type: 'Tablet', month: 'Apr', count: 87},
    { id: 11, device_type: 'Tablet', month: 'May', count: 66},
    { id: 12, device_type: 'Tablet', month: 'Jun', count: 104},
    { id: 13, device_type: 'Mobile', month: 'Jan', count: 60},
    { id: 14, device_type: 'Mobile', month: 'Feb', count: 48},
    { id: 15, device_type: 'Mobile', month: 'Mar', count: 177},
    { id: 16, device_type: 'Mobile', month: 'Apr', count: 78},
    { id: 17, device_type: 'Mobile', month: 'May', count: 96},
    { id: 18, device_type: 'Mobile', month: 'Jun', count: 204},
  ];
  
  const [isDivVisible, setIsDivVisible] = useState(true);

  const toggleVisibility = () => {
    setIsDivVisible((prev) => !prev);
  };

  return (
    <>
    <div className="flex items-left justify-end space-x-2 pt-2 pr-2">
      <Label htmlFor="catalog-mode" className="pt-2">Data Catalog</Label>
      <Switch id="catalog-mode" onClick={toggleVisibility}/>
    </div>
    <div className={`grid ${!isDivVisible ? 'grid-cols-[75%_25%]' : 'grid-cols-[100%_0%]'}`}>
      <div className="grid-rows-[50%_50%] gap-4 p-4">
        <Card className="border-none">
          <Card className="flex flex-col border-none">
          <CardHeader>
            <Input className="mb-2" placeholder="Enter Query Title" />
            <Input className="mb-2" placeholder="Describe what the query is doing" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Playground />
            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <Button>Submit</Button>
                <Button variant="outline">Cancel</Button>
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
            <Card className="flex flex-col border-none">
            <TabsList className="gap-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
              <CardContent>
                <br />
                <DataTable data={data}/>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chart">
            <Card className="flex flex-col border-none">
            <TabsList className="gap-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
              <CardContent>
                <br />
                <LineChart tabledata={data}/>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </Card>
      </div>
      {!isDivVisible && (
      <div className="resize flex flex-col border-none">
          <h2 className="font-semibold mb-4">Data Catalog</h2>
          <DataCatalog />
      </div>
      )}
    </div>
    <HiddenFooter />
    </>
  )
}

export default SqlEditor;
