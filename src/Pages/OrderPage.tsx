import React, { useState, useEffect } from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import card from "../Images/SampleCard.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import api from "../Components/API";
import { useAuth } from "../Contexts/AuthContext";

// ...

interface OrderItem {
  actualCardID: number;
  orderQuantity: number;
  storeCardID: number;
  storeCardPrice: number;
  storeID: number;
}

interface OrderResponse {
  items: Record<string, OrderItem[]>;
  totalPage: number;
}

interface ActualCardInfo {
  cardID: number;
  catagory: string;
  description: string;
  name: string;
}
interface CardInfo {
  actaulCardID: number;
  name: string;
  price: number;
  quantity: number;
  storeCardId: number;
  storeId: number;
  storeName: string;
}

interface CardDetails {
  cardID: number;
  catagory: string;
  description: string;
  name: string;
}

const getOrderInfo = async (orderId: number) => {
  try {
    const response = await api.get(`/order?id=${orderId}`);
    const data: OrderResponse = response?.data;

    return data;
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
};

export default function ShoppingCart() {
  const { userId } = useAuth();
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);
  const [actualCardInfos, setActualCardInfos] = useState<(ActualCardInfo | null)[]>([]);
  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [cardDetails, setCardDetails] = useState<CardDetails>();
  const [numberOption, setNumberOption] = useState<any>();

  const getCardDetails = async () => {
    try {
      const response = await api.get(
        `/actualCard?id=${cardInfo?.actaulCardID}`
      );
      const data = response?.data;;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Replace '14' with the actual order ID you want to fetch
    const orderId = 14;

    const fetchData = async () => {
      const data = await getOrderInfo(orderId);

      if (data) {
        setOrderData(data);

        // Fetch actual card information for each order item
        const actualCardPromises = data.items.flatMap(item =>
          item.map(orderItem => getActualCardInfo(orderItem.actualCardID))
        );

        const results = await Promise.allSettled(actualCardPromises);

        // Update actualCardInfos with the fulfilled promises
        setActualCardInfos(
          results
            .filter(result => result.status === "fulfilled")
            .map(result => (result as PromiseFulfilledResult<ActualCardInfo>).value)
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCardDetails = async () => {
      const data = await getCardDetails();
      setCardDetails(data || []);
    };

    if (cardInfo != undefined) {
      fetchCardDetails();
      const options = [];
      for (let i = 1; i <= cardInfo.quantity; i++) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      setNumberOption(options);
    }
  }, [cardInfo]);

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

  return (
    <>
      <TopNav />
      <FrameWrapper>
        <Container>
          <h2>我的訂單</h2>
          {orderData && (
            <Cart>
              {Object.entries(orderData.items).map(
                ([storeName, items]) => (
                  <CartLi key={storeName}>
                    <CartPackageHeader>
                      <CartSpan>{storeName}</CartSpan>
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
                            <img
                              src={card}
                              width="60px"
                              style={{ marginLeft: "10px" }}
                            />
                            <CartItemInfoSpan>
                              
                              <div>商品名稱: {cardDetails?.description}</div>
                              <div>類別: {actualCardInfos[index]?.catagory}</div>
                              <div>描述: {actualCardInfos[index]?.description}</div>
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
                            (total, item) =>
                              total + item.storeCardPrice * item.orderQuantity,
                            0
                          )}
                        </CartPackageP>
                      </CartPackageTotal>
                    </CartPackageFooter>
                  </CartLi>
                )
              )}
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
