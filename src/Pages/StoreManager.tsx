import TopNav from "../Components/TopNav";
import styled from "styled-components";
import ConfirmationDialog from "../Dialogs/ConfirmDialog";
import EditProductDialog from "../Dialogs/EditionDialog";
import useDialog from "../Hooks/useDialog";
import api from "../Components/API";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Pagination, Stack, Autocomplete, TextField } from "@mui/material";


interface CardData {
  actaulCardID: number;
  name: string;
  price: number;
  quantity: number;
  storeCardId: number;
  storeId: number;
  storeName: string;
  desc:string;
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

export default function StoreManager() {

  const { userId } = useAuth();

  const [searchResults, setSearchResults] = useState<SearchResultProps>();

  const { isOpen: isEditDialogOpen, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog();
  const { isOpen: isConFirmDialogOpen, openDialog: openonFirmDialog, closeDialog: closeonFirmDialog } = useDialog();

  const [currentCatagory, setCurrentCatagory] = useState<string>("");
  const [orderway, setOrderway] = useState<string>("id");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const PageLimit = 12;

  const getStoreCards = async () => {
    try {
      const response = await api.get(
        `/card/store?storeId=${userId}&page=${page}&pageLimit=${PageLimit}&orderWay=${orderway}&ascending=${isAscending}`
      );
      console.log(`/card/store?storeId=${userId}&page=${page}&pageLimit=${PageLimit}&orderWay=${orderway}&ascending=${isAscending}`)
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const removeStoreCards = async () => {
    try {
      const response = await api.get("/card/remove");
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addStoreCards = async (quantity: number, cardId: string, price: number, description: string) => {
    try {
      const body = {
        "storeId": userId,
        "price": price,
        "status": description,
        "quantity": quantity,
        "ACCard_ID": cardId
      }
      const response = await api.post("/card/add", body);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateStoreCards = async (quantity: number, cardId: string, price: number, description: string) => {
    try {

      const body = {
        "cardId": cardId,
        "price": price,
        "status": description,
        "quantity": quantity,
      }
      const response = await api.post("/card/add", body);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleComboxChange = (filter: string) => {
    if (currentCatagory == filter) setCurrentCatagory("");
    else setCurrentCatagory(filter);
    setPage(1);
  };

  const handleChangeOrderway = (
    event: React.ChangeEvent<any>,
    value: OrderWayOption
  ) => {
    setOrderway(value.orderWay);
    setIsAscending(value.ascending);
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted");
    closeonFirmDialog();
  };

  const handleSaveProduct = (updatedProduct: { quantity: number; price: number; description: string; }) => {
    console.log('Product updated:', updatedProduct);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStoreCards();
      setSearchResults(data)
    }

    fetchData()
  }, [page])

  console.log(searchResults)
  return (
    <>
      <ConfirmationDialog
        open={isConFirmDialogOpen}
        onClose={closeonFirmDialog}
        onConfirm={handleConfirmDelete}
      />

      <EditProductDialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        onSave={handleSaveProduct}
      />

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

              {typeof searchResults === "undefined" ? (
                <h2 style={{ textAlign: "center" }}>Not Found</h2>
              ) : (
                <ProductGrid>
                  {searchResults?.items.map((item, index) => (
                    <Productblock>
                      <ProductContentWrap>
                        <ProductImg />
                        <ProductInfo>
                          <h3>{item.name}</h3>
                          <h4>數量: {item.quantity}</h4>
                          <h4>價格: {item.price}</h4>
                          <h4>簡介: {item.desc}</h4>
                        </ProductInfo>
                        <ButtonContainer>
                          <RedButton onClick={openonFirmDialog}>刪除</RedButton>
                          <BlueButton onClick={openEditDialog}>修改</BlueButton>
                        </ButtonContainer>
                      </ProductContentWrap>
                    </Productblock>
                  ))}
                </ProductGrid>
              )}

              <Stack alignItems="center">
                <Pagination count={page} page={searchResults?.totalPage} onChange={(event, value: number) => setPage(value)} />
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
  grid-template-columns: repeat(1, 1fr);
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const RedButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const BlueButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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