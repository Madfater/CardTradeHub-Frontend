import React from "react";
import styled from "styled-components";

const FrameWrapper = styled.div`
  background-color: #faf7f7;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const MainWrapper = styled.div`
  max-height: 100vh; 
  max-width: 100vw; 
  overflow: hidden; 
`;

const Main = styled.div`
  background-position: 50% 50%;
  background-size: cover;
  height: auto;
`;

const Article = styled.div`
  height: auto;
  left: 30px;
  position: relative;
  width: auto;
`;

const OverlapGroup = styled.div`
  background-color:  #4981e9;
  background-position: 100% 100%;
  background-size: cover;
  height: 1080px;
  left: -359px;
  position: relative;
  top: -120px;
  width: 1920px ;
`;

const Section = styled.div`
  height: 197px;
  left: 359px;
  position: absolute;
  top: 442px;
  width: 773px;
`;

const Heading = styled.div`
  color: #ffffff;
  font-family: "Noto Sans TC-Medium", Helvetica;
  font-size: 36px;
  font-weight: 500;
  height: 52px;
  left: 0;
  letter-spacing: 3px;
  line-height: 54px;
  position: absolute;
  top: 85px;
  white-space: nowrap;
  width: 500px;
`;

const Div = styled.div`
  background-color: #3e51fe;
  border-radius: 5px;
  height: 4px;
  left: 0;
  position: absolute;
  top: 140px;
  width: 430px;
`;

const TextWrapper = styled.div`
  color: #ffffff;
  font-family: "Noto Sans TC-DemiLight", Helvetica;
  font-size: 16px;
  font-weight: 300;
  height: 24px;
  left: 0;
  letter-spacing: 3px;
  line-height: 24px;
  position: absolute;
  top: 172px;
  white-space: nowrap;
  width: 440px;
`;

const Aside = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  height: 500px;
  left: 1100px;
  position: absolute;
  top: 230px;
  width: 548px;
`;

const FormHeading = styled.div`
  height: 60px;
  left: 21px;
  position: absolute;
  top: 13px;
  width: 508px;
`;

const TextWrapper2 = styled.div`
  color: #1f100b;
  font-family: "Noto Sans TC-Medium", Helvetica;
  font-size: 40px;
  font-weight: 500;
  height: 58px;
  left: 168px;
  letter-spacing: 3px;
  line-height: 60px;
  position: absolute;
  text-align: center;
  top: 0;
  white-space: nowrap;
  width: 172px;
`;

const FormMain = styled.div`
  height: 168px;
  left: 21px;
  position: absolute;
  top: 102px;
  width: 508px;
`;

const MainSectionLabel = styled.p`
  color: transparent;
  font-family: "Noto Sans TC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  height: 17px;
  left: 0;
  letter-spacing: 3px;
  line-height: 18px;
  opacity: 0.6;
  position: absolute;
  top: -1px;
  white-space: nowrap;
  width: 90px;
`;

const Span = styled.span`
  color: #1f100b;
`;

const TextWrapper3 = styled.span`
  color: #ff0000;
`;

const MainSectionInput = styled.div`
  background-color: #ffffff;
  border: 1px solid;
  border-color: #dfe3ea;
  border-radius: 8px;
  height: 48px;
  left: 0;
  position: absolute;
  top: 26px;
  width: 508px;
`;

const P = styled.p`
  color: transparent;
  font-family: "Noto Sans TC-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  height: 17px;
  left: 0;
  letter-spacing: 3px;
  line-height: 18px;
  opacity: 0.6;
  position: absolute;
  top: 93px;
  white-space: nowrap;
  width: 90px;
`;

const MainSectionInput2 = styled.div`
  background-color: #ffffff;
  border: 1px solid;
  border-color: #dfe3ea;
  border-radius: 8px;
  height: 48px;
  left: 0;
  position: absolute;
  top: 120px;
  width: 508px;
`;

const Form = styled.div`
  height: 20px;
  left: 21px;
  position: absolute;
  top: 280px;
  width: 508px;
`;

const Link = styled.div`
  color: #3e51fe;
  font-family: "Noto Sans TC-DemiLight", Helvetica;
  font-size: 13.6px;
  font-weight: 300;
  height: 20px;
  left: 428px;
  letter-spacing: 3px;
  line-height: 20.4px;
  position: absolute;
  top: 10px;
  white-space: nowrap;
  width: 83px;
`;

const FormButton = styled.div`
  background-color: #3e51fe;
  border: 1px solid;
  border-color: #dfe3ea;
  border-radius: 8px;
  height: 48px;
  left: 21px;
  position: absolute;
  top: 321px;
  width: 508px;
`;

const TextWrapper4 = styled.div`
  color: #ffffff;
  font-family: "Inter-Medium", Helvetica;
  font-size: 13.6px;
  font-weight: 500;
  height: 15px;
  left: 202px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 15px;
  white-space: nowrap;
  width: 105px;
`;

const Form2 = styled.div`
  height: 36px;
  left: 175px;
  position: absolute;
  top: 398px;
  width: 200px;
`;

const Div2 = styled.p`
  color: transparent;
  font-family: "Noto Sans TC-Light", Helvetica;
  font-size: 12px;
  font-weight: 300;
  height: 17px;
  left: 2px;
  letter-spacing: 1px;
  line-height: 18px;
  position: absolute;
  text-align: center;
  top: -1px;
  white-space: nowrap;
  width: 195px;
`;

const TextWrapper5 = styled.span`
  color: #47180b;
  text-decoration: underline;
`;

const Link2 = styled.p`
  color: transparent;
  font-family: "Noto Sans TC-Light", Helvetica;
  font-size: 12px;
  font-weight: 300;
  height: 17px;
  left: 48px;
  letter-spacing: 1px;
  line-height: 18px;
  position: absolute;
  text-align: center;
  top: 17px;
  white-space: nowrap;
  width: 104px;
`;

const FormFooter = styled.div`
  height: 18px;
  left: 175px;
  position: absolute;
  top: 454px;
  width: 200px;
`;

const Div3 = styled.p`
  color: transparent;
  font-family: "Noto Sans TC-Light", Helvetica;
  font-size: 12px;
  font-weight: 300;
  height: 17px;
  left: 7px;
  letter-spacing: 1px;
  line-height: 18px;
  position: absolute;
  text-align: center;
  top: -1px;
  white-space: nowrap;
  width: 186px;
`;

const TextWrapper6 = styled.span`
  color: #3e51fe;
`;

export default function MemberLogin() {
  return (
    <FrameWrapper>
      <MainWrapper>
        <Main>
          <Article>
            <OverlapGroup>
              <Section>
                <Heading>您最方便的卡牌交易平台</Heading>
                <Div />
                <TextWrapper>超過數萬張的卡牌交易，即在 CARDTRADING！</TextWrapper>
              </Section>
              <Aside>
                <FormHeading>
                  <TextWrapper2>會員登入</TextWrapper2>
                </FormHeading>
                <FormMain>
                  <MainSectionLabel>
                    <Span>使用者帳號</Span>
                    <TextWrapper3> *</TextWrapper3>
                  </MainSectionLabel>
                  <MainSectionInput />
                  <P>
                    <Span>使用者密碼</Span>
                    <TextWrapper3> *</TextWrapper3>
                  </P>
                  <MainSectionInput2 />
                </FormMain>
                <Form>
                  <Link>忘記密碼？</Link>
                </Form>
                <FormButton>
                  <TextWrapper4>帳號登入</TextWrapper4>
                </FormButton>
                <Form2>
                  <Div2>
                    <Span>繼續即表示您同意接受我們的</Span>
                    <TextWrapper5>隱私</TextWrapper5>
                  </Div2>
                  <Link2>
                    <TextWrapper5>政策</TextWrapper5>
                    <Span>和</Span>
                    <TextWrapper5>服務條款</TextWrapper5>
                    <Span>。</Span>
                  </Link2>
                </Form2>
                <FormFooter>
                  <Div3>
                    <Span>您還沒有帳號嗎？ </Span>
                    <TextWrapper6>即刻註冊吧！</TextWrapper6>
                  </Div3>
                </FormFooter>
              </Aside>
            </OverlapGroup>
          </Article>
        </Main>
      </MainWrapper>
    </FrameWrapper>
  );
};
