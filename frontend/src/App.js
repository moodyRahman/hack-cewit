import React, { useEffect, useState } from "react";
import "tabler-react/dist/Tabler.css";
import "./App.css";
import {
  Card,
  colors,
  Grid,
  Page,
  ProgressCard,
  Table,
  Form,
  Button,
} from "tabler-react";
import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
} from "devextreme-react/chart";
import ClockLoader from "react-spinners/ClockLoader";
// import C3Chart from "react-c3js";
import { dataSource } from "./data.js";

export default function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    console.log("about to fetch");
    fetch("https://hackathon-nlp-306115.uc.r.appspot.com/metaapi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        location: location,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        setData(res);
      });

    console.log("here");
    console.log(data);
  }, [submitted, data, category, location]);

  function customizeTooltip(e) {
    return { text: Math.abs(e.valueText) };
  }

  function customizeLabel(e) {
    return `${Math.abs(e.value)}%`;
  }

  const LoaderStyles = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center'
  };

  if (loading)
  {
    return (
      <div style={LoaderStyles}>
        <ClockLoader size={150} />
      </div>
    )
  } 
  
  else if (!submitted){
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
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <Form.Input
                name="location"
                label="Location"
                placeholder="Enter location"
                onChange = { (e) => {
                  setCategory(e.target.value)
                }}
              />
              <Form.Input
                name="category"
                label="Category"
                placeholder="Enter category"
                onChange = { (e) => {
                  setCategory(e.target.value)
                }}
              />
              <Button type="submit" value="Submit">SUBMIT</Button>
            </Form>
          </Grid.Row>
        </Page.Content>
      </Page.Main>
    );
  }


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
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                setLoading(true);
              }}
            >
              <Form.Input
                name="location"
                label="Location"
                placeholder="Enter location"
                onChange = { (e) => {
                  setCategory(e.target.value)
                }}
              />
              <Form.Input
                name="category"
                label="Category"
                placeholder="Enter category"
                onChange = { (e) => {
                  setCategory(e.target.value)
                }}
              />
              <Button type="submit" value="Submit">SUBMIT</Button>
            </Form>
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
                  <CommonSeriesSettings
                    type="stackedbar"
                    argumentField="name"
                  />
                  <Series
                    valueField="magnitude"
                    name="Positive"
                    color="#3F7FBF"
                  />
                  <Series
                    valueField="magnitude"
                    name="Negative"
                    color="#F87CCC"
                  />
                  <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
                  <ValueAxis>
                    <Label customizeText={customizeLabel} />
                  </ValueAxis>
                  .negative
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
