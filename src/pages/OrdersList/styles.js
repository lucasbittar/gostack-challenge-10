import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 30px;
`;

export const ProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 120px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const ProfileInfo = styled.View`
  flex-direction: column;
`;

export const ProfileWelcome = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const ProfileName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-left: auto;
`;

export const OrdersFlatList = styled.FlatList`
  padding: 30px;
  padding-top: 10px;
  margin-top: 10px;
  height: 77%;
`;

export const OrdersHeader = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`;

export const OrdersHeaderTitle = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const OrdersFilter = styled.View`
  flex-direction: row;
`;

export const OrdersFilterButton = styled.TouchableOpacity`
  margin-left: 20px;
  border-bottom-color: ${props => (props.active ? '#7d40e7' : 'transparent')};
  border-bottom-width: 1px;
  border-style: solid;
`;

export const OrdersFilterButtonText = styled.Text`
  color: ${props => (props.active ? '#7d40e7' : '#999')};
  font-size: 12px;
  font-weight: bold;
`;

export const OrderTile = styled.View`
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const OrderHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OrderHeaderTitle = styled.Text`
  color: #7d40e7;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
`;

export const OrderFooter = styled.View`
  flex-direction: row;
  background-color: #f8f9fd;
`;

export const OrderFooterInfo = styled.View`
  padding: 20px;
  width: 33.3%;
`;

export const OrderFooterSmall = styled.Text`
  color: #999;
  font-size: 8px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const OrderFooterLarge = styled.Text`
  color: #444;
  font-size: 12px;
  font-weight: bold;
`;

export const OrderFooterAction = styled.View`
  padding: 20px;
  width: 33.3%;
  align-items: center;
  justify-content: flex-end;
`;

export const OrderDetailsButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const OrderDetailsButtonText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;
