import React from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";

const SortNav = styled.div`
  display: flex;
  height: 50px;
  padding: 0 40px;
  justify-content: right;
  align-items: center;
  flex-shrink: 0;
  border-top: 1px solid #dfe3ea;
  border-bottom: 1px solid #dfe3ea;
  background: #fff;
`;

const SortNavGroup = styled.div`
  width: 20%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SortNavText = styled.div`
  display: flex;
  width: auto;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`;

const SortNavCombobox = styled.div`
  display: inline-flex;
  height: 90%;
  width: 60%;
  padding: 0 5% 0 0;
  align-items: center;
  justify-content: right;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #dfe3ea;
  background: #fff;
`;

const ItemContainer = styled.main`
  padding: 10px 20px 20px;
  flex: 1 1;
`;

const ContainerMain = styled.article`
  overflow: hidden;
  margin-right: -10px;
  margin-left: -10px;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 25px;
`;

const FilterBoxWrap = styled.aside`
  margin-right: 10px;
  margin-left: 10px;
  width: 280px;
`;

const FilterBox = styled.ol`
  padding: 5px 0;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #dfe3ea;
`;

const FilterLi = styled.li`
  padding: 15px 20px;
  border-bottom: 1px solid #dfe3ea;
  font-size: 0.85rem;
  &:last-child {
    border-bottom: none;
  }
`;

const FilterTitle = styled.h2`
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 10px;
`;

const FilterButton = styled.a`
  width: 100%;
  border-color: #3e51fe;
  background-color: #f0f1ff;
  color: #0116d5;
  display: inline-flex;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #dfe3ea;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const FilterList = styled.ul`
  overflow: auto;
  max-height: 340px;
`;

const Filter = styled.li`
  display: flex;
  justify-content: flex-start;
  margin-top: 9px;
  width: 100%;
`;

const FilterLabel = styled.label`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  flex-flow: row;
`;

const FilterInput = styled.input`
  margin-right: 5px;
  min-width: 12px;
  width: 12px;
  height: 12px;
`;

const ProductGridWrap = styled.main`
  flex: 1 1;
  margin-right: 10px;
  margin-left: 10px;
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


export default function MainPage() {
  return (
    <>
      <TopNav />

      <SortNav>
        <SortNavGroup>
          <SortNavText>排序方式：</SortNavText>
          <SortNavCombobox>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
            >
              <g opacity="0.5" clip-path="url(#clip0_2_665)">
                <path
                  d="M4.83062 5.22571L7.85562 2.57871C7.9687 2.4839 8.11156 2.43193 8.25912 2.43193C8.40669 2.43193 8.54955 2.4839 8.66262 2.57871C8.71464 2.62188 8.75651 2.67598 8.78525 2.73716C8.81398 2.79835 8.82888 2.86512 8.82888 2.93271C8.82888 3.00031 8.81398 3.06708 8.78525 3.12826C8.75651 3.18945 8.71464 3.24355 8.66262 3.28671L5.23562 6.28671C5.12548 6.37828 4.98746 6.42964 4.84425 6.43237C4.70105 6.4351 4.56117 6.38902 4.44762 6.30171L0.995624 3.28471C0.943446 3.24165 0.901433 3.18758 0.872592 3.12638C0.843752 3.06518 0.828796 2.99837 0.828796 2.93071C0.828796 2.86306 0.843752 2.79624 0.872592 2.73504C0.901433 2.67384 0.943446 2.61978 0.995624 2.57671C1.1087 2.4819 1.25156 2.42993 1.39912 2.42993C1.54669 2.42993 1.68955 2.4819 1.80262 2.57671L4.83062 5.22571Z"
                  fill="#747693"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_665">
                  <rect
                    width="8"
                    height="8"
                    fill="white"
                    transform="translate(0.82962 0.430664)"
                  />
                </clipPath>
              </defs>
            </svg>
          </SortNavCombobox>
        </SortNavGroup>
      </SortNav>

      <ItemContainer>
        <ContainerMain>
          <FilterBoxWrap>
            <form>
              <FilterBox>
                <FilterLi>
                  <FilterTitle>進階搜尋</FilterTitle>
                  <FilterButton>搜尋賣家</FilterButton>
                </FilterLi>

                <FilterLi>
                  <FilterTitle>搜尋條件</FilterTitle>
                  <FilterList>
                    <Filter>
                      <FilterLabel>
                        <FilterInput type="checkbox" />
                        <span>測試</span>
                      </FilterLabel>
                    </Filter>
                  </FilterList>
                </FilterLi>
              </FilterBox>
            </form>
          </FilterBoxWrap>

          <ProductGridWrap>
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
            </article>
          </ProductGridWrap>
        </ContainerMain>
      </ItemContainer>
    </>
  );
}

