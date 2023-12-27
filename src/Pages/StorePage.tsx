import React, { useState } from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ConfirmationDialog from "../Dialogs/ConfirmDialog";
import EditProductDialog from "../Dialogs/EditionDialog";
import useDialog from "../Hooks/useDialog";

export default function Store() {
  return (
    <>
      <TopNav />
      <ContainerWarp>
        <ContainerArticle>
          <ContainerHeader>
            <BackButton>店家列表</BackButton>
          </ContainerHeader>
          <StoreInfo>
            <Introduction>
              <ul>
                <InfoTitle>測試</InfoTitle>
                <InfoDescription>測試</InfoDescription>
              </ul>
            </Introduction>

            <Comment>
              <h2>商家評價</h2>
              <article style={{ width: "100%" }}>
                <CommentGrid>
                  <Commentblock>
                    <CommentContentWrap>
                      <CommentInfo>
                        <h3>測試</h3>
                      </CommentInfo>
                    </CommentContentWrap>
                  </Commentblock>

                  <Commentblock>
                    <CommentContentWrap>
                      <CommentInfo>
                        <h3>測試</h3>
                      </CommentInfo>
                    </CommentContentWrap>
                  </Commentblock>
                </CommentGrid>

                <Stack alignItems="center">
                  <Pagination />
                </Stack>
              </article>
            </Comment>
          </StoreInfo>

          <ContainerLineBar>店家商品列表</ContainerLineBar>

          <article style={{ width: "100%" }}>
              <ProductGrid>
                <Productblock>
                  <ProductContentWrap>
                    <ProductImg></ProductImg>
                    <ProductInfo>
                      <h3>測試</h3>
                    </ProductInfo>
                  </ProductContentWrap>
                </Productblock>
                <Productblock>
                  <ProductContentWrap>
                    <ProductImg></ProductImg>
                    <ProductInfo>
                      <h3>測試</h3>
                    </ProductInfo>
                  </ProductContentWrap>
                </Productblock>
                <Productblock>
                  <ProductContentWrap>
                    <ProductImg></ProductImg>
                    <ProductInfo>
                      <h3>測試</h3>
                    </ProductInfo>
                  </ProductContentWrap>
                </Productblock>
                <Productblock>
                  <ProductContentWrap>
                    <ProductImg></ProductImg>
                    <ProductInfo>
                      <h3>測試</h3>
                    </ProductInfo>
                  </ProductContentWrap>
                </Productblock>
              </ProductGrid>

              <Stack alignItems="center">
                <Pagination />
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
  text-decoration: none;
`;

const CommentInfo = styled.article`
  position: relative;
  flex: 1 1;
  color: #1f100b;
  font-size: 0.75rem;
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