import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Typography from '~components/Typography';

import {
  ArrowRightBoxIcon2,
  MembershipDiscountBadge,
} from '../../../../../components/Icon';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MembershipIntroPageName} from '../../../../Membership/MembershipIntro';

const MembershipDiscountBox = ({isFoodDetail}) => {
  const themeApp = useTheme();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const realToTalDiscountRate =
    100 -
    (100 - isFoodDetail.membershipDiscountRate) *
      0.01 *
      ((100 - isFoodDetail.makersDiscountRate) * 0.01) *
      ((100 - isFoodDetail.periodDiscountRate) * 0.01) *
      100;
  const navigation = useNavigation();

  return (
    <Container
      onPress={() => {
        navigation.navigate(MembershipIntroPageName, {
          isFounders: isUserInfo?.leftFoundersNumber > 0,
        });
      }}>
      <MembershipDiscountContainer>
        <View>
          <MembershipDiscountTitle>
            <MembershipDiscountBadge style={{marginRight: 4}} />
            <Typography text="CaptionR" textColor={themeApp.colors.grey[2]}>
              멤버십 혜택가
            </Typography>
          </MembershipDiscountTitle>
          <MembershipDiscountTitle>
            <Typography
              style={{marginRight: 3}}
              text="Title04SB"
              textColor={themeApp.colors.red[500]}>
              {Math.round(realToTalDiscountRate * 100) / 100}%
            </Typography>
            <Typography
              style={{marginRight: 6}}
              text="Title04SB"
              textColor={themeApp.colors.grey[2]}>
              {withCommas(isFoodDetail?.totalDiscountRate)}원
            </Typography>
            <Price>{withCommas(isFoodDetail?.price)}원</Price>
          </MembershipDiscountTitle>
        </View>
        <ArrowRightBoxIcon2
          style={{width: 16, height: 16}}
          size={16}
          color={themeApp.colors.grey[2]}
        />
      </MembershipDiscountContainer>
    </Container>
  );
};
export default MembershipDiscountBox;

const Container = styled.Pressable`
  width: 100%;
  padding: 10px 16px 9px 16px;
  margin-top: 12px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 14px;
`;

const MembershipDiscountTitle = styled.View`
  flex-direction: row;
`;
export const Price = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[5]};
  text-decoration: line-through;
  text-decoration-color: ${props => props.theme.colors.grey[5]};
`;

const MembershipDiscountContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
