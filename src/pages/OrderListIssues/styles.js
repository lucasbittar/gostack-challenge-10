import styled from 'styled-components/native';

export const OrderDetailsCard = styled.View`
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

export const OrderIssuesHeader = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #fff;
  font-size: 18px;
  margin-top: 12px;
`;

export const OrderIssueDescription = styled.Text`
  font-size: 16px;
  color: #999;
`;

export const OrderIssueDate = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
  margin-bottom: 8px;
`;

export const OrderDetailsContainer = styled.View`
  margin-top: -110px;
`;

export const OrderIssuesList = styled.FlatList`
  padding: 24px;
  padding-bottom: 40px;
  height: 75%;
`;

