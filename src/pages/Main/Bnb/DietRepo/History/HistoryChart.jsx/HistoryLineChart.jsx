import styled from 'styled-components';

import Typography from '~components/Typography';
import LineChart from '../../Chart/LineChart';
import {useEffect, useRef, useState} from 'react';

const HistoryLineChart = ({
  width = '100%',
  height = undefined,

  title,
}) => {
  // height가 없을 경우 height는 자동적으로 width의 258/327을 곱하기

  const viewRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (!height) {
      setContainerHeight((containerWidth * 258) / 327);
    }
  }, [height, containerWidth, setContainerHeight]);

  const onLayout = () => {
    viewRef.current.measure((x, y, w, h) => {
      setContainerWidth(w);
      if (height) setContainerHeight(h);
    });
  };

  useEffect(() => {
    console.log('containerWidth');
    console.log(containerWidth);
    console.log(containerHeight);
  }, [containerWidth, containerHeight]);

  return (
    <Container
      width={width}
      height={height ? height : undefined}
      ref={viewRef}
      onLayout={onLayout}>
      <Title>{title}</Title>
      {containerHeight > 0 && containerWidth && (
        <LineChart
          dataBasic={[
            {x: '10일', y: 820},
            {x: '11일', y: 120},
            {x: '12일', y: 1220},
            {x: '13일', y: 220},
            {x: '14일', y: 1410},
            {x: '15일', y: 610},
            {x: '오늘', y: 2100},
          ]}
          chartWidth={containerWidth}
          chartHeight={containerHeight * 0.8}
          chartConfig={{
            // 단위
            unit: 'kcal',
            showUnit: true,
            one: 36,
            two: 30,
            three: 25,
            four: 30,
            five: 15,
            six: 10,

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
          }}
        />
      )}
    </Container>
  );
};

export default HistoryLineChart;

const Container = styled.View`
  width: ${({width}) => width};
  ${({height}) => {
    if (height) {
      return `height: ${height};`;
    }
  }};
  border: 1px solid blue;
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
