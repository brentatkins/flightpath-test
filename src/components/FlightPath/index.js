import React from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryBar
} from "victory";
import numbro from "numbro";
import * as R from "ramda";

class FlightPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom = domain => {
    this.setState({ selectedDomain: domain });
  };

  handleBrush = domain => {
    this.setState({ zoomDomain: { x: domain.x } });
  };

  buildData = field =>
    this.props.dates.map((date, i) => ({
      x: date,
      y: this.props[field][i]
    }));

  render() {
    const assetsData = this.props.assets && this.buildData("assets");
    const liabilitiesData =
      this.props.liabilities && this.buildData("liabilities");
    const liabilityCahflowsData =
      this.props.liabilityCashflows && this.buildData("liabilityCashflows");

    const diff = function(a, b) {
      return a - b;
    };
    const sortedCashflows = R.sort(diff, this.props.liabilityCashflows);

    const yAxis2Min = R.head(sortedCashflows);
    const yAxis2Max = R.head(R.takeLast(1, sortedCashflows));

    console.warn("y1", yAxis2Min);
    console.warn("y2", yAxis2Max);

    return (
      <div>
        <VictoryChart
          width={600}
          height={400}
          scale={{ x: "time" }}
          animate={{ duration: 500 }}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }
        >
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
            tickFormat={x => numbro(x).format({ average: true })}
          />
          {assetsData && (
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={assetsData}
            />
          )}
          {liabilitiesData && (
            <VictoryLine
              style={{
                data: { stroke: "blue" }
              }}
              data={liabilitiesData}
            />
          )}

          <VictoryAxis
            dependentAxis
            tickFormat={x => numbro(x).format({ average: true })}
            orientation="right"
            domain={[yAxis2Min, yAxis2Max]}
          />
          {liabilityCahflowsData && (
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={liabilityCahflowsData}
            />
          )}
        </VictoryChart>
        {(assetsData || liabilitiesData) && (
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600}
            height={90}
            scale={{ x: "time" }}
            animate={{ duration: 500 }}
            containerComponent={
              <VictoryBrushContainer
                responsive={false}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush}
              />
            }
          >
            <VictoryAxis
              tickValues={this.props.dates}
              tickFormat={x => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={assetsData || liabilitiesData}
            />
          </VictoryChart>
        )}
      </div>
    );
  }
}

export default FlightPath;
