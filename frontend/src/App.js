import React, { useEffect, useState } from "react";
import "tabler-react/dist/Tabler.css";
import "./App.css";
import { Card, colors, Grid, Page, ProgressCard, Table } from "tabler-react";
import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
} from "devextreme-react/chart";
// import C3Chart from "react-c3js";
import { dataSource } from "./data.js";

export default function App() {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("about to fetch")
    fetch("http://localhost:5000/metaapi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category:"mexican",
        location:"nyc"
      }),
    })
    .then(response=> response.json())
    .then(res => {
      console.log(res);
      setLoading(false);
      setData(res);
    });

    console.log("here")
    console.log(data);
  }, [] );

  function customizeTooltip(e) {
    return { text: Math.abs(e.valueText) };
  }

  function customizeLabel(e) {
    return `${Math.abs(e.value)}%`;
  }

  if (loading)
  {
    return (
      <>
      DEATH
      </>
    )
  }
  else {

    
    return (
      <Page.Main>
      <Page.Header>
        <Page.Title>
          Metasort: Business for the Modern Age Made Smarter
        </Page.Title>
      </Page.Header>
      <Page.Content>
        <Grid.Row>
          <Grid.Col>
            <ProgressCard
              header="Positive Reviews"
              content="620"
              progressColor="green"
              progressWidth={60}
              />
          </Grid.Col>
          <Grid.Col>
            <ProgressCard
              header="Neutral Reviews"
              content="310"
              progressColor="yellow"
              progressWidth={30}
              />
          </Grid.Col>
          <Grid.Col>
            <ProgressCard
              header="Negative Reviews"
              content="200"
              progressColor="red"
              progressWidth={20}
              />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <Card>
              <Card.Header>
                <Card.Title>Keyword Trends Over Time</Card.Title>
              </Card.Header>
              <Chart
                title="Population Pyramid For Norway 2016"
                dataSource={data}
                id="chart"
                rotated={true}
                barGroupWidth={18}
                >
                <CommonSeriesSettings type="stackedbar" argumentField="name" />
                <Series valueField="magnitude" name="Positive" color="#3F7FBF" />
                <Series valueField="magnitude" name="Negative" color="#F87CCC" />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
                <ValueAxis>
                  <Label customizeText={customizeLabel} />
                </ValueAxis>.negative
                <Legend
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                  margin={{ left: 50 }}
                  />
              </Chart>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </Page.Main>
  );
}
}
