import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';

import Label from '../../../../../components/Label';
import Typography from '../../../../../components/Typography';
import {spotText} from '../../../../Spots/components/data';
import {PAGE_NAME as GroupManageSpotDetailPageName} from '../../DetailPage';

const SpotListBox = ({item}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  console.log(item);
  return (
    <Wrap>
      <TitleBox>
        <Label
          label={item.groupType}
          type={
            item.groupType === '프라이빗스팟'
              ? 'blue'
              : item.groupType === '마이스팟'
              ? 'pink'
              : 'green'
          }
        />
        <Title text="Body05SB" textColor={themeApp.colors.grey[2]}>
          {item.groupName}
        </Title>
      </TitleBox>
      <DetailButton
        onPress={() => {
          navigation.navigate(GroupManageSpotDetailPageName, {
            groupId: item.groupId,
            groupType: item.groupType,
          });
        }}>
        <Typography text="Button10SB" textColor={themeApp.colors.grey[3]}>
          상세
        </Typography>
      </DetailButton>
    </Wrap>
  );
};

export default SpotListBox;

const Wrap = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
`;
const TitleBox = styled.View`
  flex-direction: column;
`;
const Title = styled(Typography)`
  margin-top: 4px;
`;
const DetailButton = styled.Pressable`
  padding: 6.5px 27px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 50px;
`;
