import React, { useEffect } from 'react';
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

export default function App() {
  
  useEffect(() => {
    
  })

  function customizeTooltip(e) {
    return { text: Math.abs(e.valueText) };
  }

  function customizeLabel(e) {
    return `${Math.abs(e.value)}%`;
  }

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
                  customizeTooltip={customizeTooltip}
                />
                <ValueAxis>
                  <Label customizeText={customizeLabel} />
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