import React from "react";
import styled from "styled-components";
import bk from "../Images/LoginBackground.png"
import { Terser } from "vite";


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
    background: url(${bk}), lightgray 50% / cover no-repeat;
`;

const Article = styled.div`
    width: 1200px;
    height: 1000px;
    flex-shrink: 0;
`;

const Section = styled.div`
    display: inline-flex;
    padding: 86px 333.33px 0px 0px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 16px;
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
`;

const Heading1 = styled.div`
    width: 60px;
    height: 4px;
    border-radius: 5px;
    background: #3E51FE;
`;

const Text = styled.div`
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
`;

const FormHeading = styled.div`
    display: flex;
    width: 507.67px;
    height: 60px;
    padding: 1px 167.006px 1px 168.33px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const FormHeading1 = styled.div`
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
`;

const MainSection = styled.div`
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
`;

const MainSectionInput = styled.input`
    width: 507.67px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #DFE3EA;
    background: #FFF;
    position: absolute;
    top: 26px;
    width: 508px;
`;

export default function MemberLogin() {
    return (
      <FrameWrapper>
        <MainWrapper>
            <Article>
                <section>
                    <Heading>您最方便的卡牌交易平台</Heading>
                    <Heading1></Heading1>
                    <Text>超過數萬張的卡牌交易，即在 CARDTRADING！</Text>
                </section>
                <Aside>
                    <FormHeading>
                        <FormHeading1>會員登入</FormHeading1>
                        <MainSection>使用者帳號 *</MainSection>
                        <MainSectionInput></MainSectionInput>
                    </FormHeading>
                </Aside>
            </Article>
        </MainWrapper>
      </FrameWrapper>
    );
  };
  


