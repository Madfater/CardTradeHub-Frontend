import React, { useState, useEffect } from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import card from "../Images/SampleCard.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import api from "../Components/API";
import { useAuth } from "../Contexts/AuthContext";

interface OrderItem {
  actualCardID: number;
  orderQuantity: number;
  storeCardPrice: number;
  storeID: number;
}

interface OrderResponse {
  items: Record<string, OrderItem[]>;
}

interface ActualCardInfo {
  actualCardID: number;
  name: string;
  catagory: string;
  description: string;
}

interface CardInfo {
  actualCardID: number;
  name: string;
  price: number;
  quantity: number;
  storeCardId: number;
  storeId: number;
  storeName: string;
}

interface StoreInfo {
  storeID: number;
  storeName: string;
}

export default function ShoppingCart() {
  const { userId } = useAuth();
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);
  const [actualCardInfos, setActualCardInfos] = useState<ActualCardInfo[]>([]);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [storeInfos, setStoreInfos] = useState<Record<string, StoreInfo>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const getOrderInfo = async () => {
    try {
      const response = await api.get(`/order?id=${userId}`);
      const data: OrderResponse = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const getActualCardInfo = async (actualCardId: number) => {
    try {
      const response = await api.get(`/actualCard?id=${actualCardId}`);
      const data: ActualCardInfo = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching actual card data:", error);
      return null;
    }
  };

  const getCardInfo = async (actualCardId: number) => {
    try {
      const response = await api.get(`/card?id=${actualCardId}`);
      const data: CardInfo = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching card info:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrderInfo();
      setOrderData(data || null);
    };
    fetchData();
  }, []);


  useEffect(() => {
    console.log("orderData in useEffect:", orderData);
    if (orderData) {
      const fetchActualCardInfo = async () => {
        const actualCardInfoArray: ActualCardInfo[] = [];
        const storeInfos: Record<string, StoreInfo> = {};
      
        for (const orderID in orderData.items) {
          const storeItems = orderData.items[orderID];
      
          for (const item of storeItems) {
            const actualCardInfo = await getActualCardInfo(item.actualCardID);
            if (actualCardInfo) {
              actualCardInfoArray.push(actualCardInfo);
            }
            const cardInfo = await getCardInfo(item.actualCardID);
            if (cardInfo) {
              const storeId = item.storeID; 
              storeInfos[String(storeId)] = {
                storeID: storeId,
                storeName: cardInfo.storeName,
              };
      
              setCardInfo(cardInfo);
            }
          }
        }
      
        setActualCardInfos(actualCardInfoArray);
        setStoreInfos(storeInfos);
      };

      fetchActualCardInfo();
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData && Object.keys(storeInfos).length > 0) {
      setIsDataLoaded(true);
    }
  }, [orderData, storeInfos]);

  return (
    <>
      <TopNav />
      <FrameWrapper>
        <Container>
          <h2>我的訂單</h2>
          {isDataLoaded && orderData && Object.keys(storeInfos).length > 0 && ( 
            <Cart>
              {Object.entries(orderData.items).map(([orderID, items]) => (
                <CartLi key={orderID}>
                  <CartPackageHeader>
                    <CartSpan>
                      {storeInfos[orderData.items[orderID][0].storeID]?.storeName}
                    </CartSpan>
                  </CartPackageHeader>


                  <CartItems>
                    <CartItem>
                      <CartItemSectionFirst>商品資訊</CartItemSectionFirst>
                      <CartItemSection>單價</CartItemSection>
                      <CartItemSection>數量</CartItemSection>
                      <CartItemSection>統計</CartItemSection>
                    </CartItem>
                    {items.map((item, index) => (
                      <CartItemFirst key={index}>
                        <CartItemSectionFirst>
                          <img src={card} width="60px" style={{ marginLeft: "10px" }} />
                          <CartItemInfoSpan>
                              <div>{actualCardInfos[index]?.name}</div>
                              <div>{actualCardInfos[index]?.catagory}</div>
                              <div>{actualCardInfos[index]?.description}</div>
                          </CartItemInfoSpan>
                          <CartItemInfoSpan>
                            <div>卡況: 正常</div>
                          </CartItemInfoSpan>
                        </CartItemSectionFirst>
                        <CartItemSection>${item.storeCardPrice}</CartItemSection>
                        <CartItemSection># {item.orderQuantity}</CartItemSection>
                        <CartItemSection>${item.storeCardPrice * item.orderQuantity}</CartItemSection>
                      </CartItemFirst>
                    ))}
                  </CartItems>

                  <CartPackageFooter>
                    <CartPackageTotal>
                      <CartPackageP />
                      <CartPackageP>
                        總計: $
                        {items.reduce(
                          (total, item) => total + item.storeCardPrice * item.orderQuantity,
                          0
                        )}
                      </CartPackageP>
                    </CartPackageTotal>
                  </CartPackageFooter>
                </CartLi>
              ))}
            </Cart>
          )}

          <Stack alignItems="center">
            <Pagination />
          </Stack>
        </Container>
      </FrameWrapper>
    </>
  );
}

const FrameWrapper = styled.div`
  width: 100%;
  height: 100vh;
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
