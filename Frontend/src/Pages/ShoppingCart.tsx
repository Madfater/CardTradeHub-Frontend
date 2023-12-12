import React from "react";
import TopNav from "../Components/TopNav"
import styled from "styled-components";
import card from "../Images/SampleCard.png";
const FrameWrapper = styled.div`
  width:100%;
  height: 100%;
  background: #FAF7F7;
`;

const Container = styled.main`
  flex: 1 1;
  padding: 25px 40px;
  background: #FAF7F7;
`;

const Cart = styled.ul`
  font-size: .85rem;
  display: flex;
  flex-flow: column;
`;

const CartLi = styled.li`
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
`;

const CartItem = styled.article`
  padding-right: 40px;
  padding-left: 40px;
  overflow: auto;
  padding: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  flex-flow: row;
  border-radius: 8px;
  border: 1px solid #DFE3EA;  

`;

const CartItemSectionFirst = styled.section`
  flex: 1 1;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-flow: row;
  margin: 0;
  padding-right: 40px;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
`;
const CartItemSection = styled.section`
  flex-basis: 140px;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-flow: row;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
`;

const CartCheckBox = styled.input`
  margin-right: 15px;
  margin-bottom: 5px;
  opacity: .8;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: initial;
  appearance: auto;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
`;

const CartPackageHeader = styled.header`
  padding: 20px 40px; // Adjusted padding to match CartItemSectionFirst
  color: #747693; // This is the current color, change it to your desired color, for example, #000 for black
  display: flex;
  align-items: center;
  flex-flow: row;
  padding-left: 40px;
`;

const CartSpan = styled.span`
  display: inline-flex;
  align-items: center;
  margin: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
  color: #000;
`;

const CartPackageHeaderAction = styled.section`
  display: inline-flex;
  flex: 1 1;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
  color: #747693;
`;

const MarginRightBTN = styled.a`
  display: inline-flex;
  padding: 8px 15px;
  border-radius: 8px;
  color: #747693;
  cursor: pointer;
  margin-right: 20px;
  border: 1px solid #dfe3ea;
  align-items: center;
  justify-content: center;
  
`;

const CartItems = styled.ul`
  max-width: calc(100vw - 82px);
  overflow: auto;
  padding: 20px;
  border-top: 1px solid #dfe3ea;
  border-bottom: 1px solid #dfe3ea;
  font-weight: 500;
`;

const CartItemInfoSpan = styled.span`
  margin: 0;
  margin-left: 20px;
  margin-right: 10px; /* Adjust the margin-right as needed */
  display: flex;
  flex-flow: column;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
  color: #747693;
  `;

const CartItemInfo = styled.a`
  color: #3e51fe;
  text-decoration: none;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const CartItemInfoB = styled.b`
  font-size: .85rem;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  box-sizing: border-box;
`;

const CartItemFirst = styled.li`
  margin-top: 0;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  overflow: auto;
  padding: 20px;
  font-weight: 500;
  // flex-flow: row;
  align-items: center;
  display: flex;

`;

const CartPackageFooter = styled.footer`
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
`;

const CartPackageTotal = styled.section`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const ShippingIcon = styled.span`
  margin-right: 15px;
  margin-left: 1rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartPackageP = styled.p`
  display: flex;
  align-items: center;
  flex-flow: row;
  margin: 0;
`;

const CartPackageSpan = styled.span`
  margin-left: 1rem;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
`;

const CartPackageText = styled.span`
width: 99px;
height: 20px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: #1F100B;
font-family: Noto Sans TC;
font-size: 13.6px;
font-style: normal;
font-weight: 350;
line-height: 20.4px; /* 150% */
letter-spacing: 3px;
margin-right: 10px;
`;

const CartPackageText2 = styled.span`
  color: #747693;
  font-size: 1rem;
  align-items: center;
  flex-flow: row;
  display: flex;
  margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  // margin-left: 500px;
`;



const CartPackageSelect = styled.select`
  padding: 10px;
  outline: none;
  border: 1px solid #dfe3ea;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  margin-right: 90px;
`;

export default function ShoppingCart() {
    return (
        <>
          <FrameWrapper>
          <TopNav/>
            <Container>
              <Cart>

                <CartLi>
                  <CartItem>
                    <CartItemSectionFirst>
                      <CartCheckBox type="checkbox"/>商品資訊
                    </CartItemSectionFirst>
                    <CartItemSection>單價</CartItemSection>
                    <CartItemSection>數量</CartItemSection>
                    <CartItemSection>統計</CartItemSection>
                    <CartItemSection>操作</CartItemSection>
                  </CartItem>
                </CartLi>

                <CartLi>
                  <CartPackageHeader>
                    <CartSpan>
                    <CartCheckBox type="checkbox"/>玄玄卡鋪:遊戲王卡牌專門販售
                    </CartSpan>
                    <CartPackageHeaderAction>
                      <MarginRightBTN>申請議價</MarginRightBTN>
                      <MarginRightBTN>刪除店家</MarginRightBTN>
                    </CartPackageHeaderAction>
                  </CartPackageHeader> 

                  <CartItems>
                   <CartItemFirst>
                    <CartItemSectionFirst>
                      <CartCheckBox type="checkbox"/>
                      <img src ={card} width="60px" />
                      <CartItemInfoSpan>
                      <div>新時代的主角</div>
                      <div>SD35-JP001</div>
                      <div>索隆十郎(異圖卡)</div>
                      </CartItemInfoSpan>
                      <CartItemInfoSpan>
                      <div>卡況:正常</div>
                      </CartItemInfoSpan>
                    </CartItemSectionFirst>
                    <CartItemSection>$ 40</CartItemSection>
                    <CartItemSection># 2</CartItemSection>
                    <CartItemSection>$ 80</CartItemSection>
                    <MarginRightBTN>刪除商品</MarginRightBTN>
                   </CartItemFirst>
                  </CartItems>

                  <CartPackageFooter>
                    <CartPackageTotal>
                    <CartPackageP>
                      <CartPackageSpan>
                        <CartPackageText>寄送方式 :</CartPackageText> 
                      <CartPackageSelect>
                      <option value="standard">7-11</option>
                      <option value="express">全家</option>
                      <option value="pickup">萊爾富</option>
                      <option value="pickup">OK</option>
                      </CartPackageSelect>
                      <CartPackageText>寄送費用:  $60 (滿10,000免運費)</CartPackageText> 
                      
                      </CartPackageSpan>
                    </CartPackageP>
                    <CartPackageP>總計: $140</CartPackageP>
                    </CartPackageTotal>
                  </CartPackageFooter>

          
                </CartLi>

              </Cart>
            </Container>
          </FrameWrapper>
        </>
        
    );
}

