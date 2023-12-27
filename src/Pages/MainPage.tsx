import React, { useEffect, useState } from "react";
import TopNav from "../Components/TopNav";
import styled from "styled-components";
import { Pagination, Stack, Autocomplete, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Components/API";

interface RouteParams {
  page?: string;
  pageLimit?: string;
  keyword?: string;
  orderWay?: string;
  ascending?: string;
  [key: string]: string | undefined;
}

interface CardData {
  actaulCardID: number;
  name: string;
  price: number;
  quantity: number;
  storeCardId: number;
  storeId: number;
  storeName: string;
}

interface SearchResultProps {
  items: Array<CardData>;
  totalPage: number;
}

interface OrderWayOption {
  label: string;
  orderWay: string;
  ascending: boolean;
}

const orderWays = [
  { label: "依卡號", orderWay: "id", ascending: true },
  { label: "依價格高到低", orderWay: "price", ascending: false },
  { label: "依價格低到高", orderWay: "price", ascending: true },
  { label: "依數量高到低", orderWay: "quantity", ascending: false },
  { label: "依數量低到高", orderWay: "quantity", ascending: true },
];

export default function MainPage() {
  const nav = useNavigate();

  const [searchResults, setSearchResults] = useState<
    SearchResultProps | string
  >("Not Found");
  const [countPageValue, setCountPageValue] = useState<number>();

  const { keyword } = useParams<RouteParams>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentLimit = 12;
  const currentKeyword = keyword === "null" ? "" : keyword || "";
  const [currentCatagory, setCurrentCatagory] = useState<string>("");
  const [currentOrderWay, setCurrentOrderWay] = useState<string>("id");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const searchCards = async () => {
    try {
      const response = await api.get(
        `/card/search?page=${currentPage}&pageLimit=${currentLimit}&orderWay=${currentOrderWay}&ascending=${isAscending}&keyword=${currentKeyword}&catagory=${currentCatagory}`
      );
      const data = response?.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleChangeOrderway = (
    event: React.ChangeEvent<any>,
    value: OrderWayOption
  ) => {
    setCurrentOrderWay(value.orderWay);
    setIsAscending(value.ascending);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchCards();
      setSearchResults(data || []);
    };

    fetchData();
  }, [
    currentKeyword,
    currentPage,
    currentLimit,
    currentOrderWay,
    isAscending,
    currentCatagory,
  ]);

  const handleComboxChange = (filter: string) => {
    if (currentCatagory == filter) setCurrentCatagory("");
    else setCurrentCatagory(filter);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCountPageValue(
      typeof searchResults === "string" ? 0 : searchResults.totalPage
    );
  }, [searchResults]);

  return (
    <>
      <TopNav />

      <SortNav>
        <SortNavGroup>
          <SortNavText>排序方式：</SortNavText>
          <SortNavCombobox
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            disablePortal
            options={orderWays}
            clearIcon={false}
            clearOnEscape={false}
            clearOnBlur={false}
            onChange={handleChangeOrderway}
            disableClearable
            defaultValue={orderWays[0]}
            renderInput={(params) => <SortNavComboboxBorder {...params} />}
          />
        </SortNavGroup>
      </SortNav>

      <ItemContainer>
        <ContainerMain>
          <FilterBoxWrap>
            <form>
              <FilterBox>
                <FilterLi>
                  <FilterTitle>進階搜尋</FilterTitle>
                  <FilterButton onClick={() => nav("/searchpage")}>
                    搜尋賣家
                  </FilterButton>
                </FilterLi>
                <FilterLi>
                  <FilterTitle>卡片類型</FilterTitle>
                  <FilterList>
                    <Filter>
                      <FilterLabel>
                        <FilterInput
                          type="checkbox"
                          checked={currentCatagory == "怪獸卡"}
                          onChange={() => handleComboxChange("怪獸卡")}
                        />
                        <span>怪獸卡</span>
                      </FilterLabel>
                    </Filter>
                    <Filter>
                      <FilterLabel>
                        <FilterInput
                          type="checkbox"
                          checked={currentCatagory == "魔法卡"}
                          onChange={() => handleComboxChange("魔法卡")}
                        />
                        <span>魔法卡</span>
                      </FilterLabel>
                    </Filter>
                    <Filter>
                      <FilterLabel>
                        <FilterInput
                          type="checkbox"
                          checked={currentCatagory == "陷阱卡"}
                          onChange={() => handleComboxChange("陷阱卡")}
                        />
                        <span>陷阱卡</span>
                      </FilterLabel>
                    </Filter>
                  </FilterList>
                </FilterLi>
              </FilterBox>
            </form>
          </FilterBoxWrap>

          <ProductGridWrap>
            <article style={{ width: "100%" }}>
              {typeof searchResults === "string" ? (
                <h2 style={{ textAlign: "center" }}>Not Found</h2>
              ) : (
                <ProductGrid>
                  {searchResults?.items.map((item, index) => (
                    <Productblock
                      key={index}
                      onClick={() =>
                        nav(`/cardpage/${item.storeCardId}`)
                      }
                    >
                      <ProductContentWrap>
                        <ProductImg></ProductImg>
                        <ProductInfo>
                          <ProductTitle>
                            <h4>遊戲王</h4>
                          </ProductTitle>
                          <ProductText>
                            <h3>{item.name}</h3>
                            <h5>
                              {item.quantity}個存貨
                              <br />
                              價格
                              <ProductPrice>NT{item.price}</ProductPrice>
                            </h5>
                          </ProductText>
                          <ProductTitle>
                            <h5>{item.storeName}</h5>
                          </ProductTitle>
                        </ProductInfo>
                      </ProductContentWrap>
                    </Productblock>
                  ))}
                </ProductGrid>
              )}

              <Stack alignItems="center">
                <Pagination
                  count={countPageValue}
                  page={currentPage}
                  onChange={handleChangePage}
                />
              </Stack>
            </article>
          </ProductGridWrap>
        </ContainerMain>
      </ItemContainer>
    </>
  );
}

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
  width: 21%;
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

const SortNavCombobox = styled(Autocomplete)`
  display: inline-flex;
  height: 90%;
  width: 100%;
  align-items: center;
  justify-content: right;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dfe3ea;
  .MuiAutocomplete-inputRoot {
    height: 100%;
    width: 100%;
  }
`;

const SortNavComboboxBorder = styled(TextField)`
  height: 100%;
  box-sizing: border-box;

  input {
    height: 100%;
    box-sizing: border-box;
  }
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

const ProductTitle = styled.section`
  color: #1f100b;
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
