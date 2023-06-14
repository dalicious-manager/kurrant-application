import {useEffect, useRef} from 'react';

import {Circle, G, Line, Rect, Svg, Text as SvgText} from 'react-native-svg';
import styled from 'styled-components';
import {decideTopValueAndDividend} from './ChartLogic';
import ChartBasic from './ChartBasic';
import {Text} from 'react-native';

import Typography from '~components/Typography';
import {LineChartConfigSample} from './LineChartConfigSample';

/////** 사용시 주의사항***///// */
// 1. width, height에는 string값으로 넣어주세요(px, % 사용가능), chartWidth, chartHeight는 number로 넣어주세요
// chartWidth는 숫자적 계산과정이 들어가서 그렇습니다

// 2. 이 그래프는 값이 세자리수 이상일때 최고 정상적으로 작동합니다 (한 자리수 두 자리수는 y축 숫자표시값이 깔끔하지 않은 수가 나올 수 있음)

const LineChart = ({
  dataBasic = [],

  chartWidth = 300,
  chartHeight = 200,
  chartConfig = LineChartConfigSample,
}) => {
  //// 1. 필요한 데이터

  // useEffect(() => {
  //   console.log('데이터베이직 ');
  //   console.log(dataBasic);
  // }, [dataBasic]);

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

  //// 2. 길이 계산

  const yMaxValueAmongData = Math.max(...dataBasic.map(v => v.y));

  const M = decideTopValueAndDividend(yMaxValueAmongData)[0];

  const rate = decideTopValueAndDividend(yMaxValueAmongData)[1];

  // x값 계산

  const xTickWidth =
    dataBasic.length > 1
      ? (chartWidth - one - three - 2 * five) / (dataBasic.length - 1)
      : null;

  const xTicks = dataBasic.map((v, i) => one + five + i * xTickWidth);

  //// 3. 좌표 계산하기

  // 점 좌표
  const dotsCoordinateArr = dataBasic.map((v, i) => {
    if (Number.isNaN(zeroY - ((chartHeight - two - four) * v.y) / M)) {
      return {};
    } else {
      return {
        x: one + five + i * xTickWidth,
        y: zeroY - ((chartHeight - two - four) * v.y) / M,
      };
    }
  });

  // 그래프 그리기

  let chartCoordinateArr = [];

  for (let i = 0; i < dataBasic.length - 1; i++) {
    chartCoordinateArr.push({
      x1: dotsCoordinateArr[i]?.x,
      y1: dotsCoordinateArr[i]?.y,
      x2: dotsCoordinateArr[i + 1]?.x,
      y2: dotsCoordinateArr[i + 1]?.y,
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
          fill={chartConfig.dotColor}
          r={chartConfig.dotRadius}
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
          stroke={chartConfig.chartLineColor}
          strokeWidth={chartConfig.chartLineWidth}
        />
      </G>
    );
  };

  // chartCoordinateArr = [];

  useEffect(() => {
    console.log('dotsCoordinateArr');
    console.log(dotsCoordinateArr);
  }, [dotsCoordinateArr]);
  useEffect(() => {
    console.log('chartCoordinateArr');
    console.log(chartCoordinateArr);
  }, [chartCoordinateArr]);

  return (
    <Container width={chartWidth} height={chartHeight}>
      <Svg height="100%" width="100%">
        <ChartBasic
          dataBasic={dataBasic}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
        />

        {/* 점 */}
        {dotsCoordinateArr.length > 0 &&
          dotsCoordinateArr.map((v, i) => {
            return <Dot key={i} x={v.x} y={v.y} />;
          })}

        {/* 선 */}

        {chartCoordinateArr.length > 0 &&
          chartCoordinateArr.map((v, i) => {
            if (i === 0) {
              console.log('----------------------------');
            }

            console.log(`${i}번째 값`);
            console.log(v);

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
    </Container>
  );
};

export default LineChart;

const Container = styled.View`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;

  margin: auto;
`;
