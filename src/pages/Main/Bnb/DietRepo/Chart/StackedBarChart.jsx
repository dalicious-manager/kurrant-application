import {useEffect, useRef} from 'react';

import {Circle, G, Line, Rect, Svg, Text as SvgText} from 'react-native-svg';
import styled from 'styled-components';
import {decideTopValueAndDividend} from './ChartLogic';
import ChartBasic from './ChartBasic';
import {Text} from 'react-native';
import {StackedBarChartConfigSample} from './StackedBarChartConfigSample';

const shiftDataStackedBarChartToBasicData = dataStackedBar => {
  const {dataOrder} = dataStackedBar;

  return dataStackedBar.data.map(v => {
    let total = 0;

    dataOrder.forEach(v2 => {
      total = total + v[v2];
    });

    return {
      x: v.x,

      y: total,
    };
  });
};

const StackedBarChart = ({
  dataStackedBar,

  chartWidth,
  chartHeight,
  chartConfig = StackedBarChartConfigSample,
}) => {
  //// 1. 필요한 데이터

  const {one, two, three, four, five} = chartConfig;

  // (0,0)점

  const zeroX = one;
  const zeroY = chartHeight - two;

  // (x,0)

  const xAxisX = chartWidth - three;
  const xAxisY = chartHeight - two;

  // (0,y)

  const yAxisX = one;
  const yAxisY = four;

  // dataStackedBar

  const dataBasic = shiftDataStackedBarChartToBasicData(dataStackedBar);

  //// 2. 길이 계산

  const yMaxValueAmongData = Math.max(...dataBasic.map(v => v.y));

  const M = decideTopValueAndDividend(yMaxValueAmongData)[0];

  // x값 계산

  const xTickWidth =
    dataBasic.length > 1
      ? (chartWidth - one - three - 2 * five) / (dataBasic.length - 1)
      : null;

  // x, y값 계산

  const dataCoordinate = dataStackedBar.data.map((v, i) => {
    // x, y: [{ystart1, height1}, {ystart1+height1, height2, ystart1+height1+height2, height3},],

    let yValue = zeroY;

    const yOrder = dataStackedBar.dataOrder.map(v2 => {
      const yoDo = {
        y: [yValue, ((chartHeight - two - four) * v[v2]) / M],
        color: dataStackedBar.colorSetting[v2],
      };

      yValue = yValue - ((chartHeight - two - four) * v[v2]) / M;

      return yoDo;
    });

    // return yOrder;

    return {
      x: one + five + i * xTickWidth - chartConfig.stackedBarWidth / 2,
      yCoordinate: yOrder,
    };
  });

  //// 3. 필요한 점 만들기

  //// 4. 컴포넌트 그리기

  const StackedBar = ({x, y, height, fill = '#81c835', i, width = 10}) => {
    return (
      <G key={`${i}StackedBarValue`}>
        <Rect x={x} y={y} height={height} width={10} fill={fill} />
      </G>
    );
  };

  return (
    <Container width={chartWidth} height={chartHeight}>
      <Svg height="100%" width="100%">
        <ChartBasic
          dataBasic={dataBasic}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
        />
        {dataCoordinate &&
          dataCoordinate.map((v1, i1) =>
            v1.yCoordinate.map((v2, i2) => (
              <StackedBar
                key={`${i1}${i2}`}
                fill={v2.color}
                x={v1.x}
                y={v2.y[0]}
                height={-v2.y[1]}
                i={`${i1}${i2}`}
                width={chartConfig.stackedBarWidth}
              />
            )),
          )}
      </Svg>
    </Container>
  );
};

export default StackedBarChart;

const Container = styled.View`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;

  margin: auto;
`;
