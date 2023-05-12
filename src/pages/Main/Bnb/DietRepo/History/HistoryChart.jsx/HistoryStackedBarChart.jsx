import styled, {useTheme} from 'styled-components';

import Typography from '~components/Typography';

import {useEffect, useRef, useState} from 'react';
import StackedBarChart from '../../Chart/StackedBarChart';

const HistoryStackedBarChart = ({
  width = '100%',
  height = undefined,

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
        <StackedBarChart
          dataStackedBar={{
            dataOrder: ['carbo', 'protein', 'fat'],
            colorSetting: {
              carbo: '#FF7601',
              protein: '#A8A6A7',
              fat: '#4B70b0',
            },

            data: [
              {x: '06월', carbo: 120, protein: 240, fat: 60},
              {x: '07월', carbo: 220, protein: 140, fat: 160},
              {x: '08월', carbo: 320, protein: 50, fat: 90},
              {x: '09월', carbo: 100, protein: 30, fat: 190},
              {x: '10월', carbo: 220, protein: 50, fat: 90},
              {x: '11월', carbo: 0, protein: 0, fat: 0},
              {x: '12월', carbo: 520, protein: 75, fat: 0},
            ],
          }}
          chartWidth={containerWidth}
          chartHeight={containerHeight * 0.8}
          chartConfig={{
            // 단위
            unit: 'g',
            showUnit: true,

            // 주요 길이 값들
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

            xAxisLabelColor: theme.colors.grey[2],
            xAxisLabelFontSize: 13,
            xAxisTextGapFromXAxis: 8,
            // y축 값 설정

            yAxisLabelColor: theme.colors.grey[5],
            yAxisLabelFontSize: 10,

            // 보조선 설정
            backgroundStrokeColor: '#F5F5F5',
            backgroundStrokeWidth: 2,

            // StackedBar 특유특성
            stackedBarWidth: 10,
          }}
        />
      )}
    </Container>
  );
};

export default HistoryStackedBarChart;

const Container = styled.View`
  width: ${({width}) => width};
  ${({height}) => {
    if (height) {
      return `height: ${height};`;
    }
  }};
  /* border: 1px solid blue; */
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
