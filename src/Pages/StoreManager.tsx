import TopNav from "../Components/TopNav";
import styled from "styled-components";
import useDialog from "../Hooks/useDialog";
import api from "../Components/API";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Pagination, Stack, Autocomplete, TextField } from "@mui/material";
import { TextDialog, ConfirmDialog, EditionDialog ,AddCardDialog } from "../Dialogs";


interface CardData {
  actaulCardID: number;
  name: string;
  price: number;
  quantity: number;
  storeCardId: number;
  storeId: number;
  storeName: string;
  desc: string;
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
  const [rerender, setRerender] = useState(false);

  const [text, setText] = useState<string>("");

  const [deleteCardId, setDeleteCardId] = useState<number>(0);
  const [updateCardId, setUpdateCardId] = useState<number>(0);

  const {
    isOpen: isTextDialogOpen,
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
  } = useDialog();

  const [editedProduct, setEditedProduct] = useState({
    quantity: 0,
    price: 0,
    desc: ''
  });

  const { isOpen: isEditDialogOpen, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog();
  const { isOpen: isConfirmDialogOpen, openDialog: openConfirmDialog, closeDialog: closeConfirmDialog } = useDialog();
  const { isOpen: isAddCardDialogOpen, openDialog: openAddCardDialog, closeDialog: closeAddCardDialog } = useDialog();

  const [orderway, setOrderway] = useState<string>("id");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [countPageValue, setCountPageValue] = useState<number>();
  const PageLimit = 12;

  const getStoreCards = async () => {
    try {
      const response = await api.get(
        `/card/store?storeId=${userId}&page=${page}&pageLimit=${PageLimit}&orderWay=${orderway}&ascending=${isAscending}`
      );

      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const removeStoreCards = async () => {
    try {
      const response = await api.delete(`/card?userId=${userId}&cardId=${deleteCardId}`);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addStoreCards = async (quantity: number, cardId: number, price: number, desc: string) => {
    try {
      const body = {
        "storeId": userId,
        "price": price,
        "status": desc,
        "quantity": quantity,
        "ACCard_ID": cardId
      }
      const response = await api.post("/card", body);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateStoreCards = async (quantity: number, price: number, desc: string) => {
    try {

      const body = {
        "cardId": updateCardId,
        "price": price,
        "status": desc,
        "quantity": quantity,
        "userId": userId
      }
      const response = await api.put("/card", body);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeOrderway = (
    event: React.ChangeEvent<any>,
    value: OrderWayOption
  ) => {
    setOrderway(value.orderWay);
    setIsAscending(value.ascending);
  };

  const handleConfirmDelete = async () => {
    const result = await removeStoreCards();
    if (await result === "removed") {
      setText("刪除成功");
      openTextDialog();
      setRerender(!rerender);
    }
    else {
      setText("刪除失敗")
      openTextDialog();
    }
    closeConfirmDialog();
  };

  const handleAddCard = async (addedCard: { actualCard:number; quantity: number; price: number; desc: string; }) => {
    const result = await addStoreCards(addedCard.quantity,addedCard.actualCard, addedCard.price, addedCard.desc);
    if (typeof await result === "number") {
      setText("新增成功");
      openTextDialog();
      setRerender(!rerender);
    }
    else {
      setText("新增失敗")
      openTextDialog();
    }
    closeConfirmDialog();

  };

  const handleSaveCard = async (updatedCard: { quantity: number; price: number; desc: string; }) => {

    const result = await updateStoreCards(updatedCard.quantity, updatedCard.price, updatedCard.desc);
    if (await result === "updated") {
      setText("修改成功");
      openTextDialog();
      setRerender(!rerender);
    }
    else {
      setText("修改失敗")
      openTextDialog();
    }
    closeConfirmDialog();

  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getStoreCards();
      setSearchResults(data)
    }

    if(searchResults)
      setCountPageValue(searchResults.totalPage)
    else
      setCountPageValue(0)

    fetchData()
  }, [page, rerender, orderway, isAscending])

  return (
    <>
      <AddCardDialog
        open={isAddCardDialogOpen}
        onClose={closeAddCardDialog}
        onSave={handleAddCard}
      />

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={() => { handleConfirmDelete() }}
      />

      <EditionDialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        onSave={handleSaveCard}
        initialProduct={editedProduct}
      />

      <TextDialog
        open={isTextDialogOpen}
        onClose={closeTextDialog}
        onConfirm={closeTextDialog}
        Text={text}
      />

      <TopNav />

      <SortNav>
        <AddButton onClick={openAddCardDialog}>新增</AddButton>
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
                          <RedButton onClick={() => { setDeleteCardId(item.storeCardId); openConfirmDialog(); }}>刪除</RedButton>
                          <BlueButton onClick={() => {
                            setEditedProduct({ quantity: item.quantity, price: item.price, desc: item.desc }); setUpdateCardId(item.storeCardId); openEditDialog();
                          }}>修改</BlueButton>
                        </ButtonContainer>
                      </ProductContentWrap>
                    </Productblock>
                  ))}
                </ProductGrid>
              )}

              <Stack alignItems="center">
                <Pagination count={countPageValue} page={page} onChange={(event, value: number) => setPage(value)} />
              </Stack>
            </article>
          </ProductGridWrap>
        </ContainerMain>
      </ItemContainer>
    </>
  );
}

const SortNav = styled.div`
  justify-content: space-between;
  display: flex;
  height: 50px;
  padding: 0 40px;
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

const Button = styled.button`
  color: white;	
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;`

const RedButton = styled(Button)`
  background-color: red;
`;

const AddButton = styled(RedButton)`
  background-color: #00ADEF;
`;

const BlueButton = styled(Button)`
  background-color: blue;
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