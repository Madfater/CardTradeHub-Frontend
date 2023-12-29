import TopNav from "../Components/TopNav";
import styled from "styled-components";
import api from "../Components/API";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import TextDialog from "../Dialogs/TextDialog";
import useDialog from "../Hooks/useDialog";
import { useNavigate } from "react-router-dom";

interface CardItem {
  cardId: number;
  cardCategory: string;
  cardDescription: string;
  cardName: string;
  storeCardId: number;
  storeCardPrice: number;
  cartQuantity: number;
  storeCardStatus: string;
  storeName: string;
}

interface ApiResponse {
  items: { [storeId: string]: CardItem[] };
  totalPage: number;
}

export default function ShoppingCart() {

  const nav = useNavigate();

  const [cartData, setCartData] = useState<ApiResponse>();
  const { userId } = useAuth();
  const [textContent, setTextContent] = useState("");

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectAllItems, setSelectAllItems] = useState<Record<string, boolean>>({});

  const [rerender, setrerender] = useState<boolean>(false);

  const {
    isOpen: isTextDialogOpen,
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
  } = useDialog();

  const handleStoreCheckboxChange = (storeId: string) => {
    setSelectAllItems((prevCheckedStores) => {
      const updatedCheckedStores = { ...prevCheckedStores, [storeId]: !prevCheckedStores[storeId] };
      return updatedCheckedStores;
    });
    setCheckedItems((prevCheckedStores) => {
      const updatedCheckedStores: Record<string, boolean> = {};
      Object.keys(prevCheckedStores).forEach((storeCardID) => {
        var resultArray = storeCardID.split('-');
        if (resultArray[0] == storeId)
          updatedCheckedStores[storeCardID] = !selectAllItems[storeId];
        else
          updatedCheckedStores[storeCardID] = prevCheckedStores[storeCardID];
      });
      return updatedCheckedStores;
    });
  };

  const handleItemCheckboxChange = (storeCardID: string, storeId: string) => {

    setCheckedItems((prevCheckedStores) => {
      const updatedCheckedItems = { ...prevCheckedStores, [`${storeId}-${storeCardID}`]: !prevCheckedStores[`${storeId}-${storeCardID}`] };

      const updatedCheckedStores: Record<string, boolean> = {};

      Object.keys(selectAllItems).forEach((storeID) => {
        if (storeID === storeId && updatedCheckedItems[`${storeId}-${storeCardID}`] === false) {
          updatedCheckedStores[storeID] = false;
        }
        else {
          updatedCheckedStores[storeID] = selectAllItems[storeID];
        }
      });
      setSelectAllItems(updatedCheckedStores);

      return updatedCheckedItems;
    });
  };

  const calculateTotalForStore = (storeId: string, items: CardItem[]) => {
    let total = 0;

    items.map((item, index) => {
      if (checkedItems[`${storeId}-${item.storeCardId}`]) {
        total += item.storeCardPrice*item.cartQuantity;
      }
    });

    return total;
  };

  const calculateTotal = () => {
    let total = 0;

    cartData?.items && Object.entries(cartData.items).map(([storeId, items]) => {
      items.map((item, index) => {
        console.log(`${storeId}-${item.storeCardId}`)
        if (checkedItems[`${storeId}-${item.storeCardId}`]) {
          total += item.storeCardPrice*item.cartQuantity;
        }
      });
    });

    return total;
  };

  const getItemCount = () => {
    let itemCount = 0;

    cartData?.items && Object.entries(cartData.items).forEach(([storeId, items]) => {
      items.forEach((item, _) => {
        if (checkedItems[`${storeId}-${item.storeCardId}`]) {
          itemCount++;
        }
      });
    });

    return itemCount;
  };

  const getShippingCost = () => {
    return 60;
  };

  const placeOrder = async () => {
    try {

      const orderItems: { cardId: number; quantity: number }[] = [];

      cartData?.items && Object.entries(cartData.items).forEach(([storeId, items]) => {
        items.forEach((item, _) => {
          if (checkedItems[`${storeId}-${item.storeCardId}`]) {
            orderItems.push({ cardId: item.storeCardId, quantity: item.cartQuantity })
          }
        });
      });

      if (orderItems.length <= 0)
        return "fail";

      const body = {
        "userId": userId,
        "address": "",
        "items": orderItems
      }
      const response = await api.post(`order`, body);
      const result = response?.data;
      return result;
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const deleteCart = async () => {
    try {

      let result = true;
      cartData?.items && Object.entries(cartData.items).forEach(([storeId, items]) => {
        items.forEach(async (item, _) => {
          if (checkedItems[`${storeId}-${item.storeCardId}`]) {
            const response = await api.delete(`cart?userId=${userId}&cardId=${item.storeCardId}`);
            if (response?.data !== "removed")
              result = false;
          }
        });
      });

      return result;
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  const deleteStore = async (items: CardItem[]) => {
    try {

      let result = true;

      items.forEach(async (item, _) => {
        const response = await api.delete(`cart?userId=${userId}&cardId=${item.storeCardId}`);
        if (response?.data !== "removed")
          result = false;
      });

      return result;
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  const deleteItem = async (item: CardItem) => {
    try {

      let result = true;
      const response = await api.delete(`cart?userId=${userId}&cardId=${item.storeCardId}`);
      if (response?.data !== "removed")
        result = false;

      return result;
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  const handlePlaceOrder = async () => {

    const result1 = await placeOrder();
    const result2 = await deleteCart();
    if (typeof result1 === "number" && result2 === true) {
      setTextContent("下單成功");
      openTextDialog();

    }
    else {
      setTextContent("下單失敗");
      openTextDialog();
    }
  }

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get(`cart?userId=${userId}`);
        const data = response?.data;
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [rerender]);

  useEffect(() => {

    cartData?.items && Object.entries(cartData.items).map(([storeID, items]) => {
      items.map((item, index) => {
        setSelectAllItems((prevCheckedStores) => {
          const updatedCheckedStores = { ...prevCheckedStores, [`${storeID}`]: false };
          return updatedCheckedStores;
        });
        setCheckedItems((prevCheckedStores) => {
          const updatedCheckedStores = { ...prevCheckedStores, [`${storeID}-${item.storeCardId}`]: false };
          return updatedCheckedStores;
        });
      });
    })
  }, [cartData]);


  return (
    <>
      <TextDialog
        open={isTextDialogOpen}
        onClose={closeTextDialog}
        onConfirm={() => nav('/')}
        Text={textContent}
      />

      <TopNav />

      <FrameWrapper>
        <Container>
          {cartData?.items &&
            Object.entries(cartData.items).map(([storeID, items]) => (
              <Cart key={storeID}>
                <CartLi>
                  <CartPackageHeader>
                    <CartCheckBox type="checkbox" checked={selectAllItems[storeID.toString()]} onChange={() => handleStoreCheckboxChange(storeID.toString())} />
                    <CartSpan onClick={() => nav(`/storepage/${storeID}`)}>
                      {items[0].storeName}
                    </CartSpan>
                    <CartPackageHeaderAction>
                      <MarginRightBTN onClick={() => { deleteStore(items); setrerender(!rerender); }}>刪除店家</MarginRightBTN>
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
                      <CartItemFirst key={index} >
                        <CartItemSectionFirst >
                          <CartCheckBox type="checkbox" checked={checkedItems[`${storeID}-${item.storeCardId}`]} onChange={() => handleItemCheckboxChange(item.storeCardId.toString(), storeID.toString())} />
                          <img src={`src/CardImgs/${item.cardId}.jpg`} width="60px" onClick={() => nav(`/cardpage/${item.storeCardId}`)} style={{ marginLeft: "10px" }} />
                          <CartItemInfoSpan>
                            <div>{item.cardCategory}</div>
                            <div>{item.cardName}</div>
                          </CartItemInfoSpan>
                          <CartItemInfoSpan>
                            <div>{item.storeCardStatus}</div>
                          </CartItemInfoSpan>
                        </CartItemSectionFirst>
                        <CartItemSection>${item.storeCardPrice}</CartItemSection>
                        <CartItemSection>#{item.cartQuantity}</CartItemSection>
                        <CartItemSection>${item.storeCardPrice}</CartItemSection>
                        <MarginRightBTN onClick={() => { deleteItem(item); setrerender(!rerender); }}>刪除商品</MarginRightBTN>
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
                      <CartPackageP>總計: ${calculateTotalForStore(storeID, items)}</CartPackageP>
                    </CartPackageTotal>
                  </CartPackageFooter>
                </CartLi>
              </Cart>
            ))}
          {cartData?.items && Object.keys(cartData.items).length > 0 ? <CartLi>
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
              <CheckBTN onClick={() => { handlePlaceOrder(); }}>前往結帳</CheckBTN>
            </CartPaymentFooter>
          </CartLi> : <h3 style={{ textAlign: "center" }}>NOT FOUND</h3>}
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
  margin-left:10px;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  font-size: 100%;
  color: #000;
  cursor:pointer;
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

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const ModalBody = styled.p`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseModalBTN = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #3e51fe;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
`;
