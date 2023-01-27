import React, { useEffect, useRef, useState,useCallback } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  View,
  Text
} from 'react-native';
import styled from 'styled-components/native';

import Count from '../Count';
import FastImage from "react-native-fast-image";
import Label from '../Label';
import CheckedIcon from '../../assets/icons/BottomSheet/Checked.svg';
import Typography from '../Typography';
import withCommas from '../../utils/withCommas';


const BottomSheet = props => {
  const { modalVisible, setModalVisible ,title={}, description='', data={},selected ,setSelected,setName, setValue = ()=>{}, height=500 ,btn='버튼이름' , onPressEvent=()=>{console.log('버튼누름')}, spotId , date, diningType} = props;
  //멀티 셀렉터시 이용
  // const [selected, setSelected] = useState(new Map());
  
  const onSelect = useCallback(
    (id,text) => {
      //멀티 셀렉터시 이용
      // const newSelected = new Map(selected);
      // newSelected.set(id, !selected.get(id));
      setValue(text,id)
      if(setSelected)setSelected(id);
      if(setName) setName(text)
      setModalVisible(false)
    },
    [setModalVisible, setName, setSelected, setValue],
  );

  const [count, setCount] = useState(0);
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const upY = useRef(new Animated.Value(0)).current;
  const list = useRef();
  const [up, setUP] = useState(0);
  const [y, setY] = useState(0);
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });
  const pressOutUp = e => {
    const { pageY } = e.nativeEvent;
    // console.log('test : ' + pageY);
    if (pageY > y + 30) {
      if (up < 500) {
        closeModal();
      } else {
        downSheet.start();
        list.current.scrollToOffset({ animated: false, y: 0 });
      }
    } else if (pageY < y - 30) {
      upSheet.start();
    } else {
      downSheet.start();
      list.current.scrollToOffset({ animated: false, y: 0 });
    }
  };
  const pressInUp = e => {
    const { pageY } = e.nativeEvent;
    // console.log('test2 : ' + pageY);
    setY(pageY);
  };
  const upSheet = Animated.timing(upY, {
    toValue: 700,
    duration: 300,
    useNativeDriver: false,
  });
  const downSheet = Animated.timing(upY, {
    toValue: height,
    duration: 300,
    useNativeDriver: false,
  });
  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible, resetBottomSheet]);
  useEffect(() => {
    const id = upY.addListener(state => {
      setUP(state.value);
    });
    return () => {
      upY.removeListener(id);
    };
  }, [up, upY]);
  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const increasePress = () => {
    setCount(prev => Number(prev) + 1);
  };
  const decreasePress = () => {
      setCount(prev => (prev <= 1 ? 1 : prev - 1));
    };

  return (
    <Modal visible={modalVisible} animationType={'slide'} transparent>
      <Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Background />
        </TouchableWithoutFeedback>
        <AnimatedView
          height={height}
          style={{
            transform: [{ translateY: translateY }],
            height: up,
            width: Dimensions.get('screen').width,
          }}>
          <DragButton
            onPressIn={pressInUp}
            onPressOut={pressOutUp}>
            <DragButtonView/>
          </DragButton>
          <BottomSheetTitleView>
            <BottomSheetTitle>
              {title}
            </BottomSheetTitle>
            <Pressable onPress={onPressEvent}>
              <BottomSheetButton>
                {btn}
              </BottomSheetButton>
            </Pressable>
            {description !== '' && <BottomSheetDecs>
              {description}
            </BottomSheetDecs>}
          </BottomSheetTitleView>
          <FlatList
            data={data}
            ref={list}
            scrollEnabled={up > 500}
            renderItem={({ item }) => (
             
              <ScrollView>
                <Wrap>
                  <MealImageWrap>
                    <FastImage source={{uri:`${item.image}`,priority:FastImage.priority.high}}
                      style={{
                          width:114,
                          height:114,
                          borderRadius:7
                      }}
                      />
                  </MealImageWrap>
                    <ContentsText>
                        <Name>[{item.makersName}]</Name>
                        <Name>{item.foodName}</Name>
                        <Price>{withCommas(item.price)}원</Price>
                        {item.spicy !== 'NULL' && <Label label={`${item.spicy}`}/>}
                        <Text>dfdfd</Text>
                        <Text>dfdfd</Text>
                        <Text>dfdfd</Text>
                        <Text>dfdfd</Text>
                        <Text>dfdfd</Text>
                    </ContentsText>
                    <CountWrap>
                      <Count soldOut 
                      count={count}
                      increasePress={increasePress}
                      decreasePress={decreasePress}
                      //onPressEvent={onPressEvent}
                      />
                    </CountWrap>
                </Wrap>
              </ScrollView>
              // <ContentItemContainer onPress={()=>onSelect(item.id, item.text)}>
              //   {selected === item.id ?<ContentItemBox><ContentItemText>
              //     {item.text}
              //   </ContentItemText><CheckedIcon /></ContentItemBox>:<ContentItemText>
              //     {item.text}
              //   </ContentItemText>}
              // </ContentItemContainer>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </AnimatedView>
      </Overlay>
    </Modal>
  );
};

const Overlay =styled.View`
  position: relative;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Background = styled.View`
  flex: 1;
`;

const AnimatedView = styled(Animated.View)`
  min-height: ${({height})=> `${height}px`};
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 20px;
`;

const DragButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: -33px;
`;

const DragButtonView = styled.View`
  background-color: white;
  width: 40px;
  height: 5px;
  border-radius: 10px;
`;

const BottomSheetTitleView = styled.View`
  width: 100%;
  padding:0px 24px;
  flex-direction:row;
  justify-content:space-between;
`;

const BottomSheetTitle = styled(Typography).attrs({text : 'Title03SB'})`
  margin-bottom: 6px;
`;

const BottomSheetDecs = styled(Typography).attrs({text : 'Body06R'})`
color:${({theme}) => theme.colors.grey[4]};
`;

const ContentItemContainer = styled.TouchableOpacity`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
`

const ContentItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ContentItemText = styled(Typography).attrs({text: 'Body05R'})``

const BottomSheetButton = styled(Typography).attrs({text:'CaptionSB'})`
color:${({theme}) => theme.colors.blue[500]};
`;

export default BottomSheet;

const Name = styled(Typography).attrs({text:'Body06SB'})`
    color:${({theme}) => theme.colors.grey[2]};
`;

const Price = styled(Typography).attrs({text:'Body06R'})`
    color:${({theme}) => theme.colors.grey[4]};
    margin-bottom:6px;
`;

const OriginPrice = styled(Typography).attrs({text:'Button10R'})`
 color:${({theme}) => theme.colors.grey[5]};
text-decoration:line-through;
text-decoration-color:${({theme}) => theme.colors.grey[5]};

`;

const MealImageWrap = styled.View`

`;

const Wrap = styled.View`
flex-direction:row;
padding:16px 24px;
justify-content:space-between;
width:100%;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
`;


const ContentsText = styled.View`
width:63%;
`;

const CountWrap = styled.View`
position: absolute;
bottom:16px;
right:24px;
`;