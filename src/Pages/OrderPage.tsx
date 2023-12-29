import React, { useState, useEffect } from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import card from "../Images/SampleCard.png";
import { Pagination, Stack } from "@mui/material";
import api from "../Components/API";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CommentDialog, TextDialog } from "../Dialogs"
import useDialog from "../Hooks/useDialog";

interface OrderItem {
  actualCardID: number;
  orderQuantity: number;
  isComment: number;
  storeCardID: number;
  storeCardPrice: number;
  storeID: number;
}

interface OrderResponse {
  items: { [orderID: string]: OrderItem[] };
  totalPage: number;
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

  const nav = useNavigate()

  const { userId } = useAuth();

  const [orderData, setOrderData] = useState<OrderResponse>();
  const [actualCardInfos, setActualCardInfos] = useState<ActualCardInfo[]>([]);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [storeInfos, setStoreInfos] = useState<Record<string, StoreInfo>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [countPageValue, setCountPageValue] = useState<number>();
  const PageLimit = 4;


  const [text, setText] = useState<string>("");
  const {
    isOpen: isTextDialogOpen,
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
  } = useDialog();

  const [rerender, setRerender] = useState(false);
  const [orderItem, setOrderItem] = useState<OrderItem>();
  const [orderId, setOrderId] = useState<string>();

  const { isOpen: isCommentDialogOpen, openDialog: openCommentDialog, closeDialog: closeCommentDialog } = useDialog();

  const getOrderInfo = async () => {
    try {
      const response = await api.get(`/order?id=${userId}&pageLimit=${PageLimit}&page=${page}`);
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
    }
  };

  const getCardInfo = async (actualCardId: number) => {
    try {
      const response = await api.get(`/card?id=${actualCardId}`);
      const data: CardInfo = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching card info:", error);
    }
  };

  const addComment = async (score: number, context: string) => {
    try {
      const body={
        "storeId":orderItem?.storeID,
        "score" : score,
        "context" : context,
        "userId":userId
      }
      const response = await api.post(`/comment`,body);
      const data = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching card info:", error);
    }
  };

  const setIsCommentTrue = async () => {
    try {
      const body={
        "Id": orderId
      }
      const response = await api.put(`/order`,body);
      const data = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching card info:", error);
    }
  };

  const handleSaveComment = async (Comment: { score: number; context: string; }) => {

    const result = await addComment(Comment.score, Comment.context);
    if (await result === "added" && await setIsCommentTrue()=="updated") {
      setText("評論成功");
      openTextDialog();
      setRerender(!rerender);
    }
    else {
      setText("評論失敗")
      openTextDialog();
    }
    closeCommentDialog();

  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrderInfo();
      setOrderData(data);
    };
    fetchData();
  }, [page,rerender]);

  useEffect(() => {
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
      setCountPageValue(orderData.totalPage);
    }
    else {
      setCountPageValue(0);
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData && Object.keys(storeInfos).length > 0) {
      setIsDataLoaded(true);
    }
  }, [orderData, storeInfos]);

  return (
    <>
      <CommentDialog
        open={isCommentDialogOpen}
        onClose={closeCommentDialog}
        onSave={handleSaveComment}
      />

      <TextDialog
        open={isTextDialogOpen}
        onClose={closeTextDialog}
        onConfirm={closeTextDialog}
        Text={text}
      />

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
                      <CartItemFirst key={index} onClick={() => nav(`/cardpage/${item.storeCardID}`)}>
                        <CartItemSectionFirst>
                          <img src={card} width="60px" style={{ marginLeft: "10px" }} />
                          <CartItemInfoSpan>
                            <div>{actualCardInfos[index]?.name}</div>
                            <div>{actualCardInfos[index]?.catagory}</div>
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
                      {items[0].isComment === 0 ? <AddButton onClick={()=>{setOrderId(orderID);setOrderItem(items[0]);openCommentDialog();}}>留下你的評價吧</AddButton> : null}
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
            <Pagination page={page} count={countPageValue} onChange={(event, value: number) => setPage(value)} />
          </Stack>
        </Container>
      </FrameWrapper>
    </>
  );
}

const Button = styled.button`
  color: white;	
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;`

const AddButton = styled(Button)`
  background-color: #00ADEF;
`;

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
  cursor: pointer;
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
  cursor:pointer;
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
