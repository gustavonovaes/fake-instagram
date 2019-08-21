import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`

export const Post = styled.View`
  margin-top: 10px;
`

export const PostHeader = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`

export const Name = styled.Text`
  color: #262626;
  font-weight: bold;
`

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
`

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: "#999"
})`
  margin: 30px 0;
`;