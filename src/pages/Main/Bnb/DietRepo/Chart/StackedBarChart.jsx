import {useEffect, useRef} from 'react';

import {Circle, G, Line, Rect, Svg, Text as SvgText} from 'react-native-svg';
import styled from 'styled-components';
import {decideTopValueAndDividend} from './ChartLogic';
import ChartBasic from './ChartBasic';
import {Text} from 'react-native';

const StackedBarChartConfigSample = {
  // 단위
  unit: 'kcal',
  showUnit: true,

  // 주요 길이 값들
  one: 35,
  two: 30,
  three: 25,
  four: 30,
  five: 15,
  six: 10,

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
};

const shiftDataStackedBarChartToBasicData = dataStackedBar => {
  return dataStackedBar.data.map(v => {
    return {
      x: v.x,
      y: v.protein + v.fat + v.vitamin,
    };
  });
};

const StackedBarChart = ({
  dataStackedBar = {
    colorSetting: {protein: '#FF7601', fat: '#A8A6A7', vitamin: '#4B70b0'},
    dataOrder: ['protein', 'fat', 'vitamin'],
    data: [
      {x: '06월', protein: 120, fat: 240, vitamin: 60},
      {x: '07월', protein: 220, fat: 140, vitamin: 160},
      {x: '08월', protein: 320, fat: 50, vitamin: 90},
      {x: '09월', protein: 100, fat: 30, vitamin: 190},
      {x: '10월', protein: 220, fat: 50, vitamin: 90},
      {x: '11월', protein: 0, fat: 0, vitamin: 0},
      {x: '12월', protein: 520, fat: 75, vitamin: 0},
    ],
  },

  width = 300,
  height = 200,
  graphConfig = StackedBarChartConfigSample,
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

  // dataStackedBar

  const dataBasic = shiftDataStackedBarChartToBasicData(dataStackedBar);

  //// 2. 길이 계산

  const yMaxValueAmongData = Math.max(...dataBasic.map(v => v.y));

  const M = decideTopValueAndDividend(yMaxValueAmongData)[0];

  // x값 계산

  const xTickWidth =
    dataBasic.length > 1
      ? (width - one - three - 2 * five) / (dataBasic.length - 1)
      : null;

  // x, y값 계산

  const dataCoordinate = dataStackedBar.data.map((v, i) => {
    // x, y: [{ystart1, height1}, {ystart1+height1, height2, ystart1+height1+height2, height3},],

    let yValue = zeroY;

    const yOrder = dataStackedBar.dataOrder.map(v2 => {
      const yoDo = {
        y: [yValue, ((height - two - four) * v[v2]) / M],
        color: dataStackedBar.colorSetting[v2],
      };

      yValue = yValue - ((height - two - four) * v[v2]) / M;

      console.log(yoDo.y);

      return yoDo;
    });

    // return yOrder;

    return {
      x: one + five + i * xTickWidth - graphConfig.stackedBarWidth / 2,
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
    <Container width={width} height={height}>
      {/* <Text>StackedBarChart</Text> */}
      <Svg height="100%" width="100%">
        <ChartBasic
          dataBasic={dataBasic}
          width={width}
          height={height}
          graphConfig={graphConfig}
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
                width={graphConfig.stackedBarWidth}
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
  border: 1px solid black;
`;
