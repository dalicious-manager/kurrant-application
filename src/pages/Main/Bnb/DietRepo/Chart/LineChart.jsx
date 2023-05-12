import {useEffect, useRef} from 'react';

import {Circle, G, Line, Rect, Svg, Text as SvgText} from 'react-native-svg';
import styled from 'styled-components';
import {decideTopValueAndDividend} from './ChartLogic';
import ChartBasic from './ChartBasic';
import {Text} from 'react-native';

import Typography from '~components/Typography';

const LineChartConfigSample = {
  // 단위
  unit: 'kcal',
  showUnit: true,
  one: 35,
  two: 30,
  three: 25,
  four: 30,
  five: 15,
  six: 10,
  //   one: 0,
  //   two: 0,

  stackedBarWidth: 10,

  // x축 , y축 설정
  axisStrokeColor: '#000000',
  axisStrokeWidth: 2,

  // x축 tick 설정
  tickStrokeColor: '#000000',
  tickStrokeWidth: 2,

  // x축 값 설정

  xAxisLabelColor: '#343337',
  xAxisLabelFontSize: 10,
  // y축 값 설정

  yAxisLabelColor: '#BDBAC1',
  yAxisLabelFontSize: 10,

  // 보조선 설정
  backgroundStrokeColor: '#F5F5F5',
  backgroundStrokeWidth: 2,

  // 점 설정
  dotColor: '#343337',
  dotRadius: 4,

  // 그래프 선 설정
  chartLineColor: '#343337',
  chartLineWidth: 1,
};

const LineChart = ({
  dataBasic = [
    {x: '10일', y: 20},
    {x: '20일', y: 120},
    {x: '30일', y: 320},
    {x: '40일', y: 220},
    {x: '50일', y: 210},
  ],

  width = 300,
  height = 200,
  graphConfig = LineChartConfigSample,
  title,
}) => {
  //// 1. 필요한 데이터

  const {one, two, three, four, five} = graphConfig;

  // (0,0)점

  const zeroX = one;
  const zeroY = height - two;

  // (x,0)

  const xAxisX = width - three;
  const xAxisY = height - two;

  // (0,y)

  const yAxisX = one;
  const yAxisY = four;

  //// 2. 길이 계산

  const yMaxValueAmongData = Math.max(...dataBasic.map(v => v.y));

  const M = decideTopValueAndDividend(yMaxValueAmongData)[0];

  const rate = decideTopValueAndDividend(yMaxValueAmongData)[1];

  // x값 계산

  const xTickWidth =
    dataBasic.length > 1
      ? (width - one - three - 2 * five) / (dataBasic.length - 1)
      : null;

  const xTicks = dataBasic.map((v, i) => one + five + i * xTickWidth);

  //// 3. 좌표 계산하기

  // 점 좌표
  const dotsCoordinateArr = dataBasic.map((v, i) => {
    return {
      x: one + five + i * xTickWidth,
      y: zeroY - ((height - two - four) * v.y) / M,
    };
  });

  // 그래프 그리기

  let chartCoordinateArr = [];

  for (let i = 0; i < dataBasic.length - 1; i++) {
    chartCoordinateArr.push({
      x1: dotsCoordinateArr[i].x,
      y1: dotsCoordinateArr[i].y,
      x2: dotsCoordinateArr[i + 1].x,
      y2: dotsCoordinateArr[i + 1].y,
    });
  }

  //// 4. 컴포넌트 그리기

  const Dot = ({x, y}) => {
    return (
      <G key={`${x}${y}Dot`}>
        <Circle
          key={`${x}, ${y}`}
          cx={x}
          cy={y}
          fill={graphConfig.dotColor}
          r={graphConfig.dotRadius}
        />
      </G>
    );
  };

  const ChartLine = ({x1, y1, x2, y2, i}) => {
    return (
      <G key={`${i}ChartLine`}>
        <Line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={graphConfig.chartLineColor}
          strokeWidth={graphConfig.chartLineWidth}
        />
      </G>
    );
  };

  return (
    <Container>
      <ChartWrap width={width} height={height}>
        <Title>영양소 정보</Title>
        <Svg height="100%" width="100%">
          <ChartBasic
            dataBasic={dataBasic}
            width={width}
            height={height}
            graphConfig={graphConfig}
          />

          {/* 점 */}
          {dotsCoordinateArr.map((v, i) => {
            return <Dot key={i} x={v.x} y={v.y} />;
          })}

          {/* 선 */}

          {chartCoordinateArr.map((v, i) => {
            return (
              <ChartLine
                key={i}
                x1={v.x1}
                y1={v.y1}
                x2={v.x2}
                y2={v.y2}
                i={i}
              />
            );
          })}
        </Svg>
      </ChartWrap>
    </Container>
  );
};

export default LineChart;

const Container = styled.View``;

const ChartWrap = styled.View`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
