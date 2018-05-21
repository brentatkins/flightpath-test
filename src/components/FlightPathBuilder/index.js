import React from "react";
import FlightPath from "../FlightPath";
import { css } from "react-emotion";
import { Form, Checkbox } from "semantic-ui-react";

const flexContainer = css`
  display: flex;
`;
const flexFill = css`
  flex: 1;
`;
const width200 = css`
  width: 200px;
`;

export default class FlightPathBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggles: {
        assets: true,
        liabilities: true,
        liabilityCashflows: true
      }
    };
  }

  getHandleToggle = toggle => (e, { checked }) => {
    this.setState({ toggles: { ...this.state.toggles, [toggle]: checked } });
  };

  render() {
    return (
      <div className={flexContainer}>
        <div className={flexFill}>
          <FlightPath
            dates={this.props.dates}
            assets={this.state.toggles.assets && this.props.assets}
            liabilities={
              this.state.toggles.liabilities && this.props.liabilities
            }
            liabilityCashflows={
              this.state.toggles.liabilityCashflows &&
              this.props.liabilityCashflows
            }
          />
        </div>
        <div className={width200}>
          <Form>
            <Form.Field>
              <Checkbox
                toggle
                label="Assets"
                checked={this.state.toggles.assets}
                onChange={this.getHandleToggle("assets")}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                toggle
                label="Liabilities"
                checked={this.state.toggles.liabilities}
                onChange={this.getHandleToggle("liabilities")}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                toggle
                label="Liability cashflows"
                checked={this.state.toggles.liabilityCashflows}
                onChange={this.getHandleToggle("liabilityCashflows")}
              />
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}
