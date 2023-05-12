import {useEffect, useRef} from 'react';

import {Circle, G, Line, Svg, Text as SvgText} from 'react-native-svg';
import styled from 'styled-components';
import {decideTopValueAndDividend} from './ChartLogic';
import {Text} from 'react-native';

const ChartBasic = ({
  dataBasic,

  width = 300,
  height = 200,
  chartConfig,
}) => {
  const {one, two, three, four, five, six, unit, showUnit} = chartConfig;

  //// 1. 길이 계산

  const xTickWidth =
    dataBasic.length > 1
      ? (width - one - three - 2 * five) / (dataBasic.length - 1)
      : null;

  const yMaxValueAmongData = Math.max(...dataBasic.map(v => v.y));

  const M = decideTopValueAndDividend(yMaxValueAmongData)[0];

  const rate = decideTopValueAndDividend(yMaxValueAmongData)[1];

  //// 2. 값 및 배열 계산

  // 배열 만들기 : [{n: 0, value: '0+0*M/rate', y},{n: 1, value: '0+1*M/rate'} ]

  let yAxisLableArr = [];

  for (let i = 0; i <= rate; i++) {
    // showUnit 이 true일때

    if (showUnit) {
      if (i === 0) {
        yAxisLableArr.push({
          i: i,

          value: unit,
          y: four + ((rate - i) * (height - four - two)) / rate,
        });
      } else {
        yAxisLableArr.push({
          i: i,

          value: 0 + (i * M) / rate,
          y: four + ((rate - i) * (height - four - two)) / rate,
        });
      }
    } else {
      yAxisLableArr.push({
        i: i,

        value: 0 + (i * M) / rate,
        y: four + ((rate - i) * (height - four - two)) / rate,
      });
    }
  }

  // y축 label배열 값

  //// 3. 필요한 점 좌표 만들기

  // (0,0)점

  const zeroX = one;
  const zeroY = height - two;

  // (x,0)

  const xAxisX = width - three;
  const xAxisY = height - two;

  // (0,y)

  const yAxisX = one;
  const yAxisY = four;

  // x축 Tick들의 x 좌표 구하기

  const xTicks = dataBasic.map((v, i) => one + five + i * xTickWidth);

  const xAxisLabels = dataBasic.map((v, i) => {
    return {x: one + five + i * xTickWidth, i: i, value: v.x};
  });

  // y축 tick 구하기

  const yTicks = yAxisLableArr.map(
    // (v, i) => four + (i * (height - four - two)) / rate,
    (v, i) => four + ((rate - i) * (height - four - two)) / rate,
  );

  // BackgroundStroke 구하기

  const backgroundStrokeArr = [...yTicks];

  //// 4. 컴포넌트 그리기

  // 점

  const Dot = ({x, y, r}) => {
    return (
      <G key="yo">
        <Circle key={`${x}, ${y}`} cx={x} cy={y} fill={'#000000'} r={r} />
      </G>
    );
  };

  // x축

  const XAxis = () => {
    return (
      <G key="xAxis">
        <Line
          x1={zeroX}
          y1={zeroY}
          x2={xAxisX}
          y2={xAxisY}
          stroke={chartConfig.axisStrokeColor}
          strokeWidth={chartConfig.axisStrokeWidth}
        />
      </G>
    );
  };

  // y축

  const YAxis = () => {
    return (
      <G key="YAxis">
        <Line
          x1={zeroX}
          y1={zeroY}
          x2={yAxisX}
          y2={yAxisY - six}
          stroke={chartConfig.axisStrokeColor}
          strokeWidth={chartConfig.axisStrokeWidth}
        />
      </G>
    );
  };

  // x축 tick

  const XTick = ({x, i}) => {
    return (
      <G key={`${i}XTick`}>
        <Line
          x1={x}
          y1={zeroY}
          x2={x}
          y2={zeroY + 3}
          stroke={chartConfig.tickStrokeColor}
          strokeWidth={chartConfig.tickStrokeWidth}
        />
      </G>
    );
  };

  // y축 tick

  const YTick = ({y, i}) => {
    return (
      <G key={`${i}YTick`}>
        <Line
          x1={zeroX}
          y1={y}
          x2={zeroX - 3}
          y2={y}
          stroke={chartConfig.tickStrokeColor}
          strokeWidth={chartConfig.tickStrokeWidth}
        />
      </G>
    );
  };

  // x축 label

  const XAxisLabel = ({
    x,
    i,
    value,
    xAxisTextColor = chartConfig.xAxisLabelColor,
    xAxisTextFontSize = chartConfig.xAxisLabelFontSize,
  }) => {
    return (
      <G key={`${i}XAxisValue`}>
        <SvgText
          x={x}
          y={zeroY + xAxisTextFontSize + 4}
          textAnchor="middle"
          fill={xAxisTextColor}
          fontSize={xAxisTextFontSize}>
          {value}
        </SvgText>
      </G>
    );
  };
  // y축 label

  const YAxisLabel = ({
    y,
    i,
    value,
    yAxisTextColor = chartConfig.yAxisLabelColor,
    yAxisTextFontSize = chartConfig.yAxisLabelFontSize,
  }) => {
    if (typeof value === 'string') {
      return (
        <G key={`${i}YAxisValue`}>
          <SvgText
            x={zeroX - 3}
            y={y + yAxisTextFontSize / 3} // 이거 좀 신기
            textAnchor="end"
            fill={yAxisTextColor}
            fontSize={yAxisTextFontSize}>
            {`(${value})`}
          </SvgText>
        </G>
      );
    } else {
      return (
        <G key={`${i}YAxisValue`}>
          <SvgText
            x={zeroX - 5}
            y={y + yAxisTextFontSize / 3} // 이거 좀 신기
            textAnchor="end"
            fill={yAxisTextColor}
            fontSize={yAxisTextFontSize}>
            {value}
          </SvgText>
        </G>
      );
    }
  };

  // y축 보조선

  const BackgroundStroke = ({
    y,
    backgroundStrokeColor = chartConfig.backgroundStrokeColor,
    backgroundStrokeWidth = chartConfig.backgroundStrokeWidth,
    i,
  }) => {
    return (
      <G key={`${i}BackgroundStroke`}>
        <Line
          x1={zeroX}
          y1={y}
          x2={zeroX + (width - one - three)}
          y2={y}
          stroke={backgroundStrokeColor}
          strokeWidth={backgroundStrokeWidth}
        />
      </G>
    );
  };

  // y축 끝 마무리 다듬기 추가

  // 주요 값 확인하기

  return (
    <G key={'chartBasic'}>
      {/* {yTicks.map((v, i) => (
        <YTick key={i} y={v} i={i} />
      ))} */}

      {yAxisLableArr.map(v => (
        <YAxisLabel key={v.i} y={v.y} value={v.value} i={v.i} />
      ))}

      {/* {xTicks.map((v, i) => (
        <XTick key={i} x={v} i={i} />
      ))} */}
      {xAxisLabels.map((v, i) => (
        <XAxisLabel key={v.i} x={v.x} value={v.value} i={v.i} />
      ))}

      {backgroundStrokeArr.map((v, i) => {
        return <BackgroundStroke key={i} i={i} y={v} />;
      })}

      {/* <XAxis /> */}
      {/* <YAxis /> */}
    </G>
  );
};

export default ChartBasic;
