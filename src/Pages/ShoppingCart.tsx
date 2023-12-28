import TopNav from "../Components/TopNav";
import styled from "styled-components";
import card from "../Images/SampleCard.png";
import api from "../Components/API";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";

export default function ShoppingCart() {
  const [checkedStores, setCheckedStores] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [cartData, setCartData] = useState<Record<string, Item[]> | null>(null);
  const [storeName, setStoreName] = useState<string>("玄玄店鋪");
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get(`cart?userId=${userId}`);
        const data = response?.data;
        if (data && typeof data.items === 'object') {
          const itemsData = data.items as Record<string, Item[]>;

          const renamedData = Object.fromEntries(
            await Promise.all(
              Object.entries(itemsData).map(async ([storeId, items]) => {
                const storeResponse = await api.get(`https://cardshop.sub.jeff3.win/api/store?id=${storeId}`);
                const storeData = storeResponse?.data;
                const updatedStoreName = storeData?.storeName || 'Unknown Store';
                setStoreName(updatedStoreName);

                return [
                  updatedStoreName,
                  items.map((item) => ({
                    cardCategory: item.cardCategory,
                    cardDescription: item.cardDescription,
                    cardName: item.cardName,
                    storeCardId: item.storeCardId,
                    storeCardPrice: item.storeCardPrice,
                    storeCardQuantity: item.storeCardQuantity,
                    storeCardStatus: item.storeCardStatus,
                  })),
                ];
              })
            )
          );
          setCartData(renamedData);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userId]);

  const handleStoreCheckboxChange = (storeName: string) => {
    setCheckedStores((prevCheckedStores) => ({
      ...prevCheckedStores,
      [storeName]: !prevCheckedStores[storeName],
    }));

    setCheckedItems((prevCheckedItems) => {
      const updatedItems: Record<string, boolean> = {};
      if (cartData && cartData[storeName]) {
        cartData[storeName].forEach((_, index) => {
          updatedItems[`${storeName}-${index}`] = !prevCheckedItems[`${storeName}-${index}`];
        });
      }
      return {
        ...prevCheckedItems,
        ...updatedItems,
      };
    });
  };

  const handleCheckboxChange = (key: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: !prevCheckedItems[key],
    }));
  };

  const calculateTotalForStore = (storeName: string, items: Item[]) => {
    let total = 0;

    items.forEach((item, index) => {
      if (checkedItems[`${storeName}-${index}`]) {
        total += item.storeCardPrice;
      }
    });

    return total;
  };

  const calculateTotal = () => {
    let total = 0;

    if (cartData) {
      Object.entries(cartData).forEach(([storeName, items]) => {
        items.forEach((item, index) => {
          if (checkedItems[`${storeName}-${index}`]) {
            total += item.storeCardPrice;
          }
        });
      });
    }

    return total;
  };

  const getPackageCount = () => {
    return cartData ? Object.keys(cartData).length : 0;
  };

  const getItemCount = () => {
    let itemCount = 0;

    if (cartData) {
      Object.values(cartData).forEach((items) => {
        itemCount += items.length;
      });
    }

    return itemCount;
  };

  const getShippingCost = () => {
    return 60;
  };

  return (
    <>
      <TopNav />
      <FrameWrapper>
        <Container>
          {cartData &&
            Object.entries(cartData).map(([storeName, items]) => (
              <Cart key={storeName}>
                <CartLi>
                  <CartPackageHeader>
                    <CartSpan>
                      <CartCheckBox
                        type="checkbox"
                        checked={checkedStores[storeName]}
                        onChange={() => handleStoreCheckboxChange(storeName)}
                      />
                      {storeName}
                    </CartSpan>
                    <CartPackageHeaderAction>
                      <MarginRightBTN>申請議價</MarginRightBTN>
                      <MarginRightBTN>刪除店家</MarginRightBTN>
                    </CartPackageHeaderAction>
                  </CartPackageHeader>
                  <CartItems>
                    <CartItem>
                      <CartItemSectionFirst>商品資訊</CartItemSectionFirst>
                      <CartItemSection>單價</CartItemSection>
                      <CartItemSection>數量</CartItemSection>
                      <CartItemSection>統計</CartItemSection>
                      <CartItemSection>操作</CartItemSection>
                    </CartItem>

                    {items.map((item, index) => (
                      <CartItemFirst key={`${storeName}-${index}`}>
                        <CartItemSectionFirst>
                          <CartCheckBox
                            type="checkbox"
                            checked={checkedItems[`${storeName}-${index}`]}
                            onChange={() => handleCheckboxChange(`${storeName}-${index}`)}
                          />
                          <img src={card} width="60px" style={{ marginLeft: "10px" }} alt="Card" />
                          <CartItemInfoSpan>
                            <div>{item.cardCategory}</div>
                            <div>{item.cardName}</div>
                            <div>{item.cardDescription}</div>
                          </CartItemInfoSpan>
                          <CartItemInfoSpan>
                            <div>卡況: {item.storeCardStatus}</div>
                          </CartItemInfoSpan>
                        </CartItemSectionFirst>
                        <CartItemSection>${item.storeCardPrice}</CartItemSection>
                        <CartItemSection># 1</CartItemSection>
                        <CartItemSection>${item.storeCardPrice}</CartItemSection>
                        <MarginRightBTN>刪除商品</MarginRightBTN>
                      </CartItemFirst>
                    ))}
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
                          <CartPackageText>寄送費用: $60 (滿10,000免運費)</CartPackageText>
                        </CartPackageSpan>
                      </CartPackageP>
                      <CartPackageP>總計: ${calculateTotalForStore(storeName, items)}</CartPackageP>
                    </CartPackageTotal>
                  </CartPackageFooter>
                </CartLi>
              </Cart>
            ))}
          <CartLi>
            <CartPaymentHeader>
              付款方式:
              <CartPaymentSelect>
                <MarginRightBTN>信用卡</MarginRightBTN>
                <MarginRightBTN>網路ATM</MarginRightBTN>
                <MarginRightBTN>超商代碼</MarginRightBTN>
                <MarginRightBTN>貨到付款</MarginRightBTN>
              </CartPaymentSelect>
            </CartPaymentHeader>
            <CartPaymentInfo>
              <CartPaymentInfoItem>
                <CartPaymentSelectLi>
                  <CartPackageP>包裹數 : </CartPackageP>
                  <CartPackageP>{getPackageCount()}</CartPackageP>
                </CartPaymentSelectLi>
                <CartPaymentSelectLi>
                  <CartPackageP>商品數 : </CartPackageP>
                  <CartPackageP>{getItemCount()}</CartPackageP>
                </CartPaymentSelectLi>
                <CartPaymentSelectLi>
                  <CartPackageP>商品總金額 : </CartPackageP>
                  <CartPackageP>${calculateTotal()}</CartPackageP>
                </CartPaymentSelectLi>
                <CartPaymentSelectLi>
                  <CartPackageP>運費總金額 : </CartPackageP>
                  <CartPackageP>${getShippingCost()}</CartPackageP>
                </CartPaymentSelectLi>
                <CartPaymentSelectLi>
                  <CartPackageP>交易總金額 : </CartPackageP>
                  <CartPackageP>${calculateTotal() + getShippingCost()}</CartPackageP>
                </CartPaymentSelectLi>
              </CartPaymentInfoItem>
            </CartPaymentInfo>
            <CartPaymentFooter>
              <CheckBTN>前往結帳</CheckBTN>
            </CartPaymentFooter>
          </CartLi>
        </Container>
      </FrameWrapper>
    </>
  );
}



const FrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #faf7f7;
`;

const Container = styled.main`
  flex: 1 1;
  padding: 25px 40px;
  background: #faf7f7;
  font-family: Noto Sans TC, sans-serif;
  letter-spacing: 3px;
  line-height: 1.5;
`;

const Cart = styled.ul`
  font-size: 0.85rem;
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
  opacity: 0.8;
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
  background: none;

  &:hover {
    color: #e6b800;
  }

  &:active {
    color: #e6b800;
  }
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

const CartItemFirst = styled.li`
  margin-top: 10px;
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

const CartPackageP = styled.p`
  display: flex;
  align-items: center;
  flex-flow: row;
  margin: 0;
  margin-right: 60px;
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
  color: #1f100b;
  font-family: Noto Sans TC;
  font-size: 13.6px;
  font-style: normal;
  font-weight: 350;
  line-height: 20.4px; /* 150% */
  letter-spacing: 3px;
  margin-right: 10px;
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

const CartPaymentHeader = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-flow: row;
`;

const CartPaymentSelect = styled.ul`
  flex: 1 1;
  display: flex;
  flex-flow: row;
`;

const CartPaymentSelectLi = styled.li`
  margin-left: 0;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
`;

const CartPaymentInfo = styled.article`
  display: flex;
  justify-content: flex-end;
  border-top: 1px dashed #dfe3ea;
  border-bottom: 1px dashed #dfe3ea;
  padding: 20px;
`;

const CartPaymentInfoItem = styled.ul`
  color: #747693;
  font-size: 1rem;
`;

const CheckBTN = styled.button`
  cursor: pointer;
  padding: 14px 30px;
  letter-spacing: 5px;
  font-size: 1.15rem;
  min-width: 140px;
  color: #fff !important;
  background-color: #3e51fe;
  display: inline-flex;
  border-radius: 8px;
  transition: background-color .3s;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfe3ea;
`;

const CartPaymentFooter = styled.footer`
  justify-content: flex-end;
  display: flex;
  align-items: center;
  flex-flow: row;
  padding: 20px;
`;

interface Item {
  cardCategory: string;
  cardDescription: string;
  cardName: string;
  storeCardId: number;
  storeCardPrice: number;
  storeCardQuantity: number;
  storeCardStatus: string;
}

