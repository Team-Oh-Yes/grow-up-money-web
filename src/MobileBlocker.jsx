import styled from "styled-components";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const BlockedWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const BlockedBox = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 640px;
  width: 100%;
  text-align: center;
`;

const BlockedTitle = styled.h2`
  margin: 0 0 8px 0;
  color: #222;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 800;
`;

const BlockedDesc = styled.p`
  margin: 0;
  color: #444;
  font-size: 16px;
`;

function MobileBlocker() {
  return (
    <Container>
      <BlockedWrapper>
        <BlockedBox>
          <BlockedTitle>404 - 지원하지 않는 화면 크기</BlockedTitle>
          <BlockedDesc>
            현재 페이지는 가로 768px 이상에서만 이용할 수 있어요.
          </BlockedDesc>
        </BlockedBox>
      </BlockedWrapper>
    </Container>
  );
}
export default MobileBlocker