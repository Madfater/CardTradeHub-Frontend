import { useEffect, useState } from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import { Pagination, Stack } from "@mui/material/";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Components/API";

interface Comment {
  commentID: number;
  context: string;
  score: number;
  userID: number;
  userName: string;
}

interface CommentList {
  items: Comment[];
  totalPage: number;
}

interface CardData {
  actaulCardID: number;
  name: string;
  price: number;
  quantity: number;
  storeCardId: number;
}

interface StoreCards {
  items: CardData[];
  totalPage: number;
}

interface StoreData {
  description: string;
  storeID: number;
  storeName: string;
}

export default function Store() {
  const nav = useNavigate();
  const { storeID } = useParams();

  const [commentPage, setcommentPage] = useState<number>(1);
  const [comments, setComments] = useState<CommentList>();
  const commentPageLimit = 2;

  const [page, setPage] = useState<number>(1);
  const [storeCards, setStoreCards] = useState<StoreCards>();
  const PageLimit = 12;

  const [storeData, setStoreData] = useState<StoreData>();

  const getComment = async () => {
    try {
      const response = await api.get(
        `/comment?storeId=${storeID}&page=${commentPage}&pageLimit=${commentPageLimit}`
      );
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getStoreCards = async () => {
    try {
      const response = await api.get(
        `/card/store?storeId=${storeID}&page=${page}&pageLimit=${PageLimit}&orderWay=id&ascending=false`
      );
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getStoreInfo = async () => {
    try {
      const response = await api.get(`/store?id=${storeID}`);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCommentData = async () => {
      const data = await getComment();
      setComments(data || []);
    };

    fetchCommentData();
  }, [commentPage]);

  useEffect(() => {
    const fetchCardsData = async () => {
      const data = await getStoreCards();
      setStoreCards(data || []);
    };
    fetchCardsData();
  }, [page]);

  useEffect(() => {
    const fetchStoreData = async () => {
      const data = await getStoreInfo();
      setStoreData(data || []);
    };

    fetchStoreData();
  }, [commentPage]);

  console.log(storeCards)

  return (
    <>
      <TopNav />
      <ContainerWarp>
        <ContainerArticle>
          <ContainerHeader>
            <BackButton onClick={() => nav("/searchpage")}>店家列表</BackButton>
          </ContainerHeader>
          <StoreInfo>
            <Introduction>
              <ul>
                <InfoTitle>{storeData?.storeName}</InfoTitle>
                <InfoDescription>{storeData?.description}</InfoDescription>
              </ul>
            </Introduction>

            <Comment>
              <h2>商家評價</h2>
              <article style={{ width: "100%" }}>
                {comments === undefined ? (
                  <h3 style={{ textAlign: "center" }}>Not Found</h3>
                ) : (
                  <CommentGrid>
                    {comments.items.map((item, index) => (
                      <Commentblock key={index}>
                        <CommentContentWrap>
                          <CommentInfo>
                            <h3>用戶: {item.userName}</h3>
                          </CommentInfo>
                          <CommentInfo>
                            <h3>評價: {item.context}</h3>
                          </CommentInfo>
                          <CommentInfo>
                            <h3>分數: {item.score}</h3>
                          </CommentInfo>
                        </CommentContentWrap>
                      </Commentblock>
                    ))}
                  </CommentGrid>
                )}

                <Stack alignItems="center">
                  <Pagination
                    count={comments?.totalPage}
                    page={commentPage}
                    onChange={(value) =>
                      setcommentPage(typeof value === "number" ? value : 0)
                    }
                  />
                </Stack>
              </article>
            </Comment>
          </StoreInfo>

          <ContainerLineBar>店家商品列表</ContainerLineBar>

          <article style={{ width: "100%" }}>
            {typeof storeCards === "undefined" ? (
              <h3 style={{ textAlign: "center" }}>Not Found</h3>
            ) : (
              <ProductGrid>
                {storeCards.items.map((item, index) => (
                  <Productblock
                    key={index}
                    onClick={() => nav(`/cardpage/${item.storeCardId}`)}
                  >
                    <ProductContentWrap>
                      <ProductImg></ProductImg>
                      <ProductInfo>
                        <h4>遊戲王</h4>
                        <ProductText>
                          <h3>{item.name}</h3>
                          <h5>
                            {item.quantity}個存貨
                            <br />
                            價格
                            <ProductPrice>NT{item.price}</ProductPrice>
                          </h5>
                        </ProductText>
                      </ProductInfo>
                    </ProductContentWrap>
                  </Productblock>
                ))}
              </ProductGrid>
            )}

            <Stack alignItems="center">
              <Pagination
                count={storeCards?.totalPage}
                page={page}
                onChange={(event, value: number) =>
                  setPage(typeof value === "number" ? value : 0)
                }
              />
            </Stack>
          </article>
        </ContainerArticle>
      </ContainerWarp>
    </>
  );
}

const ContainerWarp = styled.main`
  padding: 25px 40px;
  flex: 1 1;
`;

const ContainerArticle = styled.article`
  margin-bottom: 25px;
  display: block;
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

const StoreInfo = styled.article`
  border: 1px solid #dfe3ea;
  margin-bottom: 20px;
  padding: 25px 30px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-flow: row;
`;

const Introduction = styled.aside`
  flex-basis: 360px;
  margin-right: 15px;
  padding-right: 15px;
`;

const InfoTitle = styled.li`
  margin-bottom: 5px;
  padding-right: 4rem;
  color: #1f100b;
  font-weight: 1000;
  font-size: 1rem;
`;

const InfoDescription = styled.li`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  word-break: break-all;
  -webkit-line-clamp: 3;
  margin-top: 5px;
`;

const Comment = styled.section`
  display: flex;
  flex: 1 1;
  flex-direction: column;
`;

const CommentGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 15px;
`;

const Commentblock = styled.li`
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
`;

const CommentContentWrap = styled.a`
  display: flex;
  flex-flow: row;
`;

const CommentInfo = styled.article`
  position: relative;
  flex: 1 1;
  color: #1f100b;
  font-size: 0.75rem;
  text-align: center;
`;

const ContainerLineBar = styled.article`
  position: relative;
  padding: 15px 25px;
  border-radius: 8px;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#303584),
    to(#2573a3)
  );
  background-image: -webkit-linear-gradient(left, #303584, #2573a3);
  background-image: -moz-linear-gradient(left, #303584, #2573a3);
  background-image: linear-gradient(90deg, #303584, #2573a3);
  color: #fff;
`;

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
`;

const Productblock = styled.li`
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
  cursor: pointer;
`;

const ProductContentWrap = styled.a`
  display: flex;
  flex-flow: row;
  text-decoration: none;
`;

const ProductImg = styled.aside`
  position: relative;
  display: flex;
  justify-content: center;
  margin-right: 15px;
  width: 130px;
  height: 180px;
  background: black;
`;

const ProductInfo = styled.article`
  position: relative;
  flex: 1 1;
  color: #1f100b;
  font-size: 0.75rem;
`;

const ProductText = styled.section`
  letter-spacing: 2px;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 0.85rem;
`;

const ProductPrice = styled.b`
  color: #3e51fe;
  font-weight: 700;
`;
