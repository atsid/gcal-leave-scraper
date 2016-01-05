const React = require('react');
const config = require('../../clientConfig');

class HeatMapDayRenderer extends React.Component {
  componentDidMount() {
    this.props.data.eventCount = [];

    for (let idx = 1; idx < 31; idx++) {
      this.props.data.eventCount[idx] = idx;
    }
  }

  calculateFromPercentage() {
    const rgb = {};

    return rgb;
  }

  calculateFromValue(day) {
    const rgb = {};
    const eventsToday = this.props.data.eventCount[day.date()];
    const mediumT = this.props.mediumThreshold;
    const highT = this.props.highThreshold;

    if (eventsToday > mediumT) {
      rgb.r = this.interpolate(mediumT, highT, config.client.heatMap.medium.r, config.client.heatMap.high.r);
      rgb.g = this.interpolate(mediumT, highT, config.client.heatMap.medium.g, config.client.heatMap.high.g);
      rgb.b = this.interpolate(mediumT, highT, config.client.heatMap.medium.b, config.client.heatMap.high.b);
    } else {
      rgb.r = this.interpolate(0, mediumT, config.client.heatMap.start.r, config.client.heatMap.medium.r);
      rgb.g = this.interpolate(0, mediumT, config.client.heatMap.start.g, config.client.heatMap.medium.g);
      rgb.b = this.interpolate(0, mediumT, config.client.heatMap.start.b, config.client.heatMap.medium.b);
    }

    return rgb;
  }

  interpolate(stepStart, stepEnd, current, colorStart, colorEnd) {
    // Total steps
    const stepDelta = stepEnd - stepStart;
    // Current step
    const currentStep = current - stepStart;
    // Total color differential
    const colorDelta = colorEnd - colorStart;

    return Math.floor((currentStep / stepDelta) * colorDelta) + colorStart;
  }

  isDayInMonth() {
    return this.props.day.month() === this.props.month.month();
  }

  calculateRgbValues() {
    let rgbValues;

    if (!this.isDayInMonth()) {
      rgbValues = {r: 0, g: 0, b: 0};
    } else if (this.props.thresholdType === 'percent') {
      rgbValues = this.calculateFromPercentage();
    } else {
      rgbValues = this.calculateFromValue();
    }

    return rgbValues;
  }

  render() {
    console.log('here!!!!!!!!!!!!');
    const rgbValues = this.calculateRgbValues();
    const style = {
      backgroundColor: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
    };

    return (
      <div style={style}/>
    );
  }
}

HeatMapDayRenderer.propTypes = {
  month: React.PropTypes.object.isRequired,
  day: React.PropTypes.object.isRequired,
  data: React.PropTypes.object,
  thresholdType: React.PropTypes.oneOf(['percent', 'value']),
  mediumThreshold: React.PropTypes.number,
  highThreshold: React.PropTypes.number,
};

HeatMapDayRenderer.defaultProps = {
  thresholdType: config.client.heatMap.thresholdType,
  mediumThreshold: config.client.heatMap.mediumThreshold,
  highThreshold: config.client.heatMap.highThreshold,
};

module.exports = HeatMapDayRenderer;
