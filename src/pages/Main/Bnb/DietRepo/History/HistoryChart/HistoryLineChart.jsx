import styled, {useTheme} from 'styled-components';

import Typography from '~components/Typography';
import LineChart from '../../Chart/LineChart';
import {useEffect, useRef, useState} from 'react';

const HistoryLineChart = ({
  width = '100%',
  height = undefined,
  data = [],
  title,
}) => {
  // height가 없을 경우 height는 자동적으로 width의 258/327을 곱하기

  const theme = useTheme();

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

  return (
    <Container
      width={width}
      height={height ? height : undefined}
      ref={viewRef}
      onLayout={onLayout}>
      <Title>{title}</Title>
      {containerHeight > 0 && containerWidth && (
        <LineChart
          dataBasic={data}
          chartWidth={containerWidth}
          chartHeight={containerHeight * 0.8}
          chartConfig={{
            // 단위
            unit: 'kcal',
            showUnit: true,
            one: 36,
            two: 30,
            three: 16,
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

            xAxisLabelColor: theme.colors.grey[2],
            xAxisLabelFontSize: 13,
            xAxisTextGapFromXAxis: 8,
            // y축 값 설정

            yAxisLabelColor: theme.colors.grey[5],
            yAxisLabelFontSize: 10,

            // 보조선 설정
            backgroundStrokeColor: theme.colors.grey[8],
            backgroundStrokeWidth: 2,

            // LineChart 특이설정
            // 점 설정
            dotColor: '#FFAEAE',
            dotRadius: 4,

            // 그래프 선 설정
            chartLineColor: '#FFAEAE',
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
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
