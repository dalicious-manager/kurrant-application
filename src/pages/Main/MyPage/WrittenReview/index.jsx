import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import Card from './Card';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';

const Pages = () => {
  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Card />
      <Card />
      <Card />

      {/* {!!ReviewWaitList.length ? (
          <FlatList
            data={ReviewWaitList}
            scrollEnabled={true}
            renderItem={({item}) => {
              return (
                <View>
                  {item.orderItemDtoList.map((value2, index2) => {
                    return (
                      <Card
                        key={index2}
                        orderDate={item.orderDate}
                        menuName={value2.menuName}
                        option={value2.option}
                        imageUrl={value2.imageUrl}
                        diningType={value2.diningType}
                        restaurentName={value2.restaurentName}
                      />
                    );
                  })}
                </View>
              );
            }}
          />
        ) : (
          <NoOrder isArrayEmpty={!ReviewWaitList.length} />
        )} */}
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  background-color: #ffffff;
`;
