import React from "react";
import styled from "styled-components";
import bk from "../Images/LoginBackground.png"

const FrameWrapper = styled.div`
  display: flex;
  width: 1920px;
  height: 1080px;
  justify-content: center;
  align-items: center;
  background: #FAF7F7;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 1920px;
  height: 1080px;
  padding: 40px 360px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; 
	background: url(${bk}), lightgray -0.15px 0px / 100.016% 100% no-repeat;
`;

const Article = styled.div`
  width: 1200px;
  height: 1000px;
  flex-shrink: 0;
`;

const OverlapGroup = styled.div`
  background-position: 100% 100%;
  background-size: cover;
  height: 1080px;
  left: -359px;
  position: relative;
  top: -120px;
  width: 1920px ;
`;

const Section = styled.div`
  display: inline-flex;
  padding: 86px 333.33px 0px 0px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
  height: 197px;
  left: 359px;
  position: absolute;
  top: 442px;
  width: 773px;
`;

const Heading = styled.div`
  display: flex;
  width: 429.387px;
  height: 52px;
  flex-direction: column;
  justify-content: center;
  color: #FFF;
  font-family: Noto Sans TC;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 54px; /* 150% */
  letter-spacing: 3px;  
  left: 0;
  position: absolute;
  top: 85px;
`;

const Div = styled.div`
  width: 60px;
  height: 4px;
  border-radius: 5px;
  background: #3E51FE;
  left: 0;
  position: absolute;
  top: 140px;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 440px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  color: #FFF;
  font-family: Noto Sans TC;
  font-size: 16px;
  font-style: normal;
  font-weight: 350;
  line-height: 24px; /* 150% */
  letter-spacing: 3px;
  left: 0;
  letter-spacing: 3px;
  line-height: 24px;
  position: absolute;
  top: 172px;
`;

const Aside = styled.div`
  width: 548px;
  height: 622px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #FFF;
  left: 1100px;
  position: absolute;
  top: 230px;
  left: 1100px;
  position: absolute;
  top: 230px;
`;

const FormHeading = styled.div`
  display: flex;
  width: 507.67px;
  height: 60px;
  padding: 1px 167.006px 1px 168.33px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  left: 21px;
  position: absolute;
  top: 13px;
`;

const TextWrapper2 = styled.div`
  display: flex;
  width: 172.334px;
  height: 58px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #1F100B;
  text-align: center;
  font-family: Noto Sans TC;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px; /* 150% */
  letter-spacing: 3px;
  left: 168px;
  position: absolute;
  top: 0;

`;

const FormMain = styled.div`
  width: 507.67px;
  height: 168px;
  flex-shrink: 0;

  left: 21px;
  position: absolute;
  top: 102px;
 
`;

const MainSectionLabel = styled.p`
  display: flex;
  width: 89.868px;
  height: 17px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #1F100B;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: 3px;
  opacity: 0.6;
  // color: transparent;
  // font-family: "Noto Sans TC-Medium", Helvetica;
  // font-size: 12px;
  // font-weight: 500;
  // height: 17px;
  // left: 0;
  // letter-spacing: 3px;
  // line-height: 18px;
  // opacity: 0.6;
  // position: absolute;
  // top: -1px;
  // white-space: nowrap;
  // width: 90px;
`;

const Span = styled.span`
  color: #1f100b;
`;


const MainSectionInput = styled.div`
  width: 507.67px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #DFE3EA;
  background: #FFF;
  position: absolute;
  top: 26px;
  width: 508px;
  // background-color: #ffffff;
  // border: 1px solid;
  // border-color: #dfe3ea;
  // border-radius: 8px;
  // height: 48px;
  // left: 0;
  // position: absolute;
  // top: 26px;
  // width: 508px;
`;

const P = styled.p`
  display: flex;
  width: 89.868px;
  height: 17px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #1F100B;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: 3px;
  opacity: 0.6;
  color: #F00;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 3px;

  // color: transparent;
  // font-family: "Noto Sans TC-Medium", Helvetica;
  // font-size: 12px;
  // font-weight: 500;
  // height: 17px;
  // left: 0;
  // letter-spacing: 3px;
  // line-height: 18px;
  // opacity: 0.6;
  position: absolute;
  top: 93px;
  // white-space: nowrap;
  // width: 90px;
`;

const MainSectionInput2 = styled.div`
  width: 507.67px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #DFE3EA;
  background: #FFF;

  left: 0;
  position: absolute;
  top: 120px;

`;

const Form = styled.div`
  display: flex;
  width: 507.67px;
  padding: 10.81px 0px 0px 428px;
  justify-content: flex-end;
  align-items: center;
  left: 21px;
  position: absolute;
  top: 280px;
`;

const Link = styled.div`
  display: flex;
  width: 83.298px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #3E51FE;
  font-family: Noto Sans TC;
  font-size: 13.6px;
  font-style: normal;
  font-weight: 350;
  line-height: 20.4px; /* 150% */
  letter-spacing: 3px;

  left: 428px;
  position: absolute;
  top: 10px;

`;

const FormButton = styled.div`
  display: flex;
  width: 507.67px;
  height: 48px;
  // padding: 15.72px 0px 17.28px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #DFE3EA;
  background: #3E51FE;

  height: 48px;
  left: 21px;
  position: absolute;
  top: 321px;
 
`;

const TextWrapper4 = styled.div`
display: flex;
width: 105px;
height: 15px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: #FFF;
text-align: center;
font-family: Inter;
font-size: 13.6px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const Form2 = styled.div`
  display: flex;
  width: 200px;
  height: 36px;
  padding: 0px 2.138px 1px 2.48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  left: 175px;
  position: absolute;
  top: 398px;

`;

const Div2 = styled.p`
  width: 195.382px;
  height: 17px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #1F100B;
  text-align: center;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 350;
  line-height: 18px; /* 150% */
  letter-spacing: 1px;

  left: 2px;
  position: absolute;
  text-align: center;
  top: -1px;
  white-space: nowrap;
`;

const TextWrapper5 = styled.span`
  color: #47180B;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 350;
  line-height: 18px;
  letter-spacing: 1px;
  text-decoration-line: underline;
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
  display: flex;
  width: 200px;
  height: 18px;
  padding: 0px 6.796px 1px 7.14px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  left: 175px;
  position: absolute;
  top: 454px;

`;

const Div3 = styled.p`
width: 186.064px;
height: 17px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: #1F100B;
text-align: center;
font-family: Noto Sans TC;
font-size: 12px;
font-style: normal;
font-weight: 350;
line-height: 18px; /* 150% */
letter-spacing: 1px;
`;

const TextWrapper6 = styled.span`
  color: #3E51FE;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 350;
  line-height: 18px;
  letter-spacing: 1px;
`;

export default function MemberLogin() {
  return (
    <FrameWrapper>
      <MainWrapper>
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
                    使用者帳號*
                  </MainSectionLabel>
                  <MainSectionInput />
                  <P>
                    <Span>使用者密碼*</Span>
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
      </MainWrapper>
    </FrameWrapper>
  );
};
