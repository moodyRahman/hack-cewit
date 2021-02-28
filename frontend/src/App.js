import React from 'react';
import "tabler-react/dist/Tabler.css";
import "./App.css";
import { 
  Card, 
  colors, 
  Grid, 
  Page, 
  ProgressCard, 
  Table 
} from 'tabler-react';
import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip
} from 'devextreme-react/chart';
// import C3Chart from "react-c3js";
import { dataSource } from './data.js';

export default class App extends React.Component {
  customizeTooltip(e) {
    return { text: Math.abs(e.valueText) };
  }

  customizeLabel(e) {
    return `${Math.abs(e.value)}%`;
  }

  render() {
    return (
      <Page.Main>
        <Page.Header>
          <Page.Title>Metasort: Business for the Modern Age Made Smarter</Page.Title>
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
                {/* <C3Chart
                  data={{
                    columns: [
                      // ['x1', 10, 30, 45, 50, 70, 100],
                      // ['x2', 30, 50, 75, 100, 120],
                      ['data1', 30, 200, 100, 400, 150, 250],
                      ['data2', 20, 180, 240, 100, 190]
                    ],
                    type: "line",
                    groups: [["data1", "data2"]],
                    colors: {
                      data1: colors["green"],
                      data2: colors["red"],
                    },
                    names: {
                      data1: "cleanliness",
                      data2: "taste"
                    }, 
                    title: "Keyword trends over time"
                  }}
                />
                <Table
                  cards={true}
                  striped={true}
                  responsive={true}
                  className="table-vcenter"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader>Keyword</Table.ColHeader>
                      <Table.ColHeader>Sentiment Magnitude</Table.ColHeader>
                      <Table.ColHeader>Date</Table.ColHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Col>Cleanliness</Table.Col>
                      <Table.Col>+0.79</Table.Col>
                      <Table.Col>May 6, 2018</Table.Col>
                    </Table.Row>
                    <Table.Row>
                      <Table.Col>Taste</Table.Col>
                      <Table.Col>-0.37</Table.Col>
                      <Table.Col>May 6, 2020</Table.Col>
                    </Table.Row>
                  </Table.Body>
                </Table> */}
                <Chart
                  title="Population Pyramid For Norway 2016"
                  dataSource={dataSource}
                  id="chart"
                  rotated={true}
                  barGroupWidth={18}
                >
                  <CommonSeriesSettings
                    type="stackedbar"
                    argumentField="age"
                  />
                  <Series
                    valueField="male"
                    name="Male"
                    color="#3F7FBF"
                  />
                  <Series
                    valueField="female"
                    name="Female"
                    color="#F87CCC"
                  />
                  <Tooltip
                    enabled={true}
                    customizeTooltip={this.customizeTooltip}
                  />
                  <ValueAxis>
                    <Label customizeText={this.customizeLabel} />
                  </ValueAxis>
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