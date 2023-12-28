import { Icon } from "@mui/material";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Components/API";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import useDialog from "../Hooks/useDialog";
import TextDialog from "../Dialogs/TextDialog";

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

export default function CardIntro() {

  const nav = useNavigate();

  const { cardID } = useParams();
  const { userId } = useAuth();

  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [cardDetails, setCardDetails] = useState<CardDetails>();

  const [numberOption, setNumberOption] = useState<any>();
  const [textContent, setTextContent] = useState("");

  const {
    isOpen: isTextDialogOpen,
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
  } = useDialog();

  const getCardInfo = async () => {
    try {
      const response = await api.get(`/card?id=${cardID}`);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const addToShoppingcart = async () => {
    try {
      if (userId === null)
        return "fail"
      const body = {
        userId: userId,
        cardId: cardInfo?.storeCardId,
        quantity: cardInfo?.quantity,
      };
      const response = await api.post("/cart/add", body);
      const data = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToCart = () => {
    const transData = async () => {
      const data = await addToShoppingcart();
      if (data === "added") {
        setTextContent("加入成功")
        openTextDialog()
      }
      else {
        setTextContent("加入失敗")
        openTextDialog()
      }
    };

    transData();
  };

  useEffect(() => {
    const fetchCardData = async () => {
      const data = await getCardInfo();
      setCardInfo(data || []);
    };

    fetchCardData();
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

  return (
    <>
      <TextDialog
        open={isTextDialogOpen}
        onClose={closeTextDialog}
        onConfirm={closeTextDialog}
        Text={textContent}
      />
      <TopNav />
      <Container>
        <ContainerHeader>
          <BackButton onClick={() => nav("/")}>商品列表</BackButton>
        </ContainerHeader>
        <ContainerMain>
          <ToastBox>
            <span>
              <ToastIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 26.846">
                  <path
                    id="Icon_awesome-check"
                    data-name="Icon awesome-check"
                    d="M12.227,30.9.527,19.2a1.8,1.8,0,0,1,0-2.546L3.073,14.1a1.8,1.8,0,0,1,2.546,0L13.5,21.986,30.382,5.1a1.8,1.8,0,0,1,2.546,0L35.473,7.65a1.8,1.8,0,0,1,0,2.546l-20.7,20.7A1.8,1.8,0,0,1,12.227,30.9Z"
                    transform="translate(0 -4.577)"
                  ></path>
                </svg>
                "成功加入購物車"
              </ToastIcon>
            </span>
          </ToastBox>

          <ProductInfo>
            <ProductInfoContainer>
              <ProductInfoImage>
                <ImageStyle></ImageStyle>
              </ProductInfoImage>

              <ProductInfoContent>
                <ProductInfoHeaderTitle>
                  <h1>{cardDetails?.name}</h1>
                </ProductInfoHeaderTitle>

                <ProductInfoStore>
                  <ProductInfoItem>
                    <ProductInfoLi>
                      <ItemStore>
                        <a style={{ cursor: "pointer" }} onClick={() => nav(`/storepage/${cardInfo?.storeId}`)}>{cardInfo?.storeName}</a>
                        <StoreBades></StoreBades>
                        <h4>備貨日期：2天</h4>
                      </ItemStore>
                      <ItemInfo>
                        <h4>NT.{cardInfo?.price}</h4>
                      </ItemInfo>
                      <CreateCart>
                        <ItemNumber>
                          <select>{numberOption}</select>
                          <span>最多{cardInfo?.quantity}</span>
                        </ItemNumber>
                        <CreateBTN onClick={handleAddToCart}>
                          加入購物車
                        </CreateBTN>
                      </CreateCart>
                    </ProductInfoLi>
                  </ProductInfoItem>
                </ProductInfoStore>

                <ProductDetail>
                  <li>
                    單卡簡介：<br></br>
                    {cardDetails?.description}
                    <br></br>
                    <br></br>
                  </li>
                  <li>細節項目：</li>
                  <li>卡牌種類:{cardDetails?.catagory}</li>
                </ProductDetail>
              </ProductInfoContent>

            </ProductInfoContainer>

          </ProductInfo>
        </ContainerMain>
      </Container>
    </>
  );
}

const Container = styled.main`
  flex: 1 1;
  padding: 25px 40px;
  font-family: inherit;
  background-color: #faf7f7;
  color: #1f100b;
  letter-spacing: 3px;
`;

const ContainerMain = styled.article`
  overflow: hidden;
  margin: -10px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
`;

const ToastBox = styled.article`
  position: fixed;
  top: 40vh;
  left: calc(50vw - 150px);
  z-index: -1;
  margin: auto;
  width: 300px;
  height: 20vh;
  opacity: 0;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  display: flex;
  align-items: center;
  justify-content: center;

  &.span {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ToastIcon = styled.span`
  margin-bottom: 1rem;
  width: 32px;
  height: 32px;
`;

const ProductInfo = styled.article`
  margin-bottom: 1rem;
  flex: 1 1;
  margin: 0 10px;
`;

const ProductInfoHeader = styled.header`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

const ProductInfoHeaderTitle = styled.div`
  display: flex;
  flex-flow: column;

  h1 {
    font-weight: 500;
    font-size: 2rem;
    margin: 0;
    color: #1f100b;
    letter-spacing: 3px;
  }

  span {
    b {
      a {
        text-decoration: none;
        color: inherit;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const ProductInfoContainer = styled.section`
  display: flex;
  flex-flow: row;
`;

const ProductInfoImage = styled.aside`
  position: relative;
  display: -moz-box;
  display: flex;
  overflow: hidden;
  -moz-box-pack: center;
  justify-content: center;
  margin-right: 1rem;
  min-width: 320px;
  height: 470px;
  border-radius: 5px;
`;

const ImageStyle = styled.span`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: black;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 0px;
  position: absolute;
  inset: 0px;
`;

const ProductInfoContent = styled.main`
  width: 100%;
`;

const ProductInfoStore = styled.article`
  margin-bottom: 1rem;
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
`;

const ProductInfoItem = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font: inherit;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const ProductInfoLi = styled.li`
  margin-top: 0;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  justify-content: space-between;
  padding: 20px;
  font-size: 0.85rem;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  display: flex;
`;

const ItemStore = styled.section`
  flex: 1 1;
  margin-right: 10px;
  font-size: 0.85rem;
  h4 {
    margin: 0;
    color: #747693;
  }
`;

const StoreBades = styled.li`
  margin-top: 5px;
  color: #303584;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  flex-flow: row;
`;

const ItemInfo = styled.section`
  order: -1;
  margin-bottom: 20px;
  font-size: 1.5rem;
  flex: 1 1;
  margin-right: 10px;
  h3 {
    font-size: 1rem;
    display: flex;
    align-items: center;
    flex-flow: row;
    margin: 0;
  }
  h4 {
    font-size: 1.5rem;
    color: #32bf84;
    font-weight: 500;
    margin: 0;
  }
  span {
    font-size: 1.25rem;
    margin-right: 10px;
    color: #1f100b;
    margin: 0;
  }
  h5 {
    margin: 0;
  }
`;

const CreateCart = styled.section`
  margin-top: 15px;
  display: flex;
  flex-flow: row;
`;

const ItemNumber = styled.article`
  overflow: hidden;
  margin-right: 10px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  display: flex;
  flex-flow: row;
  select {
    padding: 1rem 1rem 1rem 2rem;
    outline: none;
    border: none;
    background-color: #fff;
    font-size: 1rem;
    cursor: pointer;
    overflow: visible !important;
  }
  span {
    margin-left: 5px;
    padding: 1rem;
    background-color: #faf7f7;
    color: #747693;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CreateBTN = styled.button`
  cursor: pointer;
  padding: 14px 30px;
  letter-spacing: 5px;
  font-size: 1.15rem;
  min-width: 140px;
  color: #fff !important;
  background-color: #3e51fe;
  border-radius: 8px;
`;

const ProductDetail = styled.ul`
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  li {
    margin-bottom: 5px;
  }
`;

const ContainerHeader = styled.article`
  margin-bottom: 25px;
`;

const BackButton = styled.a`
  padding: 8px 18px;
  min-width: 140px;
  color: #fff !important;
  background-color: #3e51fe;
  transition: background-color 0.3s;
  display: inline-flex;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #dfe3ea;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;