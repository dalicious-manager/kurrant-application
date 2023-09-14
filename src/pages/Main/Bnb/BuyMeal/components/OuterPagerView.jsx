import React, {useEffect, useRef, useState, useMemo} from 'react';
import {View, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import BottomModal from '~components/BottomModal';
import Typography from '~components/Typography';

import RenderInnerPage from './RenderInnerPage';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';

const {width} = Dimensions.get('screen');

const Slide = styled.View`
  width: ${width}px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// ... your other styled components ...

const OuterPagerView = ({
  scrollViewRef,
  userinfo,
  dailyFood,
  selectedDate,
  nowPage,
  setSelectedDate,
  setNowPage,
  pager,
  weekly,
  setDailyfoodId,
  isAddMeal,
  nowDiningType,
  setNowDiningType,
  isDiningTypes,
  detailFetching,
  time,
  orderDailyFoodId,
  cartDailyFoodId,
  addCartPress,
  modalVisible,
  setModalVisible,
  modalVisible2,
  setModalVisible2,
  modalVisible3,
  setModalVisible3,
  closeModal,
  addToCart,
  selectFood,
  navigation,
}) => {
  let refsetTimeout;

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let index = Math.round(offsetX / width);

    if (refsetTimeout) clearTimeout(refsetTimeout);

    refsetTimeout = setTimeout(() => {
      if (nowPage === 0 && index === 0) {
        scrollViewRef.current.scrollTo({x: width, animated: false});
        return;
      }
      setNowDiningType(isDiningTypes[index - 1 <= 0 ? 0 : index - 1]);
      if (
        index === dailyFood[nowPage].dailyFoodDtos?.length + 1 ||
        (nowPage === 0 &&
          index === dailyFood[nowPage].dailyFoodDtos?.length + 1)
      ) {
        scrollViewRef.current.scrollTo({x: width, animated: false});
        const selectedDay = dailyFood[nowPage + 1]?.serviceDate;
        if (selectedDay) {
          const now = dailyFood.find(v => v.serviceDate === selectedDay);
          const nowsIndex = dailyFood.findIndex(
            v => v.serviceDate === selectedDay,
          );

          setSelectedDate(selectedDay);
          setNowPage(nowsIndex);

          const activeDate = dailyFood.map(v => v.serviceDate);

          const result = activeDate.findIndex(
            day => formattedWeekDate(selectedDay) === formattedWeekDate(day),
          );

          const dateIndex = weekly.map(v => v.map(s => formattedWeekDate(s)));
          const indexPage = dateIndex.findIndex(v =>
            v.includes(formattedWeekDate(new Date(activeDate[result]))),
          );
          pager.current?.setPage(indexPage);
        }
      } else if (index === 0 && nowPage - 1 >= 0) {
        const selectedDay = dailyFood[nowPage - 1]?.serviceDate;
        index = dailyFood[nowPage].dailyFoodDtos?.length - 1;
        scrollViewRef.current.scrollTo({
          x: width * (index + 1),
          animated: false,
        });

        if (selectedDay) {
          const now = dailyFood.find(v => v.serviceDate === selectedDay);
          const nowsIndex = dailyFood.findIndex(
            v => v.serviceDate === selectedDay,
          );

          setSelectedDate(selectedDay);
          setNowPage(nowsIndex);
        }
        const activeDate = dailyFood.map(v => v.serviceDate);

        const result = activeDate.findIndex(
          day => formattedWeekDate(selectedDay) === formattedWeekDate(day),
        );

        const dateIndex = weekly.map(v => v.map(s => formattedWeekDate(s)));
        const indexPage = dateIndex.findIndex(v =>
          v.includes(formattedWeekDate(new Date(activeDate[result]))),
        );
        pager.current?.setPage(indexPage);
      }
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current.scrollTo({
        x: width,
        animated: false,
      });
    }, 100);
  }, [scrollViewRef]);
  return (
    <Container>
      {dailyFood[nowPage]?.dailyFoodDtos?.length > 0 ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}>
          <Slide>
            <ActivityIndicator size={'large'} />
          </Slide>

          {/* Your original slides */}
          {dailyFood.map((v, i) => {
            if (selectedDate === v.serviceDate) {
              return v.dailyFoodDtos.map((d, idx) => {
                const setModal = type => {
                  if (type === 1) {
                    return setModalVisible;
                  }
                  if (type === 2) {
                    return setModalVisible2;
                  }
                  if (type === 3) {
                    return setModalVisible3;
                  }
                };
                const modal = type => {
                  if (type === 1) {
                    return modalVisible;
                  }
                  if (type === 2) {
                    return modalVisible2;
                  }
                  if (type === 3) {
                    return modalVisible3;
                  }
                };
                return (
                  <Slide key={d.diningType + idx + 1}>
                    <RenderInnerPage
                      item={d}
                      activePage={nowPage}
                      setDailyfoodId={setDailyfoodId}
                      isAddMeal={isAddMeal}
                      detailFetching={detailFetching}
                      userinfo={userinfo}
                      time={time}
                      orderDailyFoodId={orderDailyFoodId}
                      cartDailyFoodId={cartDailyFoodId}
                      addCartPress={addCartPress}
                      closeModal={closeModal}
                      addToCart={addToCart}
                      selectFood={selectFood}
                      navigation={navigation}
                    />
                    <BottomModal
                      modalVisible={modal(isDiningTypes[idx])}
                      setModalVisible={setModal(isDiningTypes[idx])}
                      title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`}
                      description={'그래도 추가하시겠어요?'}
                      buttonTitle1={'아니요'}
                      buttonType1="grey7"
                      buttonTitle2={'추가'}
                      buttonType2="yellow"
                      onPressEvent1={closeModal}
                      onPressEvent2={() => addToCart(selectFood.id)}
                    />
                  </Slide>
                );
              });
            }
            // return
          })}

          {/* Add an extra slide at the end to implement loop */}
          {nowPage < dailyFood.length - 1 && (
            <Slide>
              <ActivityIndicator size={'large'} />
            </Slide>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </Container>
  );
};

export default OuterPagerView;

const Container = styled.View`
  flex: 1;
`;
