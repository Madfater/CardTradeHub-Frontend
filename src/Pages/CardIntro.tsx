import { Icon } from "@mui/material";
import TopNav from "../Components/TopNav";
import styled from "styled-components";

export default function CardIntro() {
    return (
        <>
            <TopNav />
            <Container>
                <ContainerMain>
                    <ToastBox>
                        <span>
                            <ToastIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 26.846">
                                <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M12.227,30.9.527,19.2a1.8,1.8,0,0,1,0-2.546L3.073,14.1a1.8,1.8,0,0,1,2.546,0L13.5,21.986,30.382,5.1a1.8,1.8,0,0,1,2.546,0L35.473,7.65a1.8,1.8,0,0,1,0,2.546l-20.7,20.7A1.8,1.8,0,0,1,12.227,30.9Z" transform="translate(0 -4.577)">
                                </path>
                            </svg>
                            "成功加入購物車"
                            </ToastIcon>
                        </span>
                    </ToastBox>

                    <ProductInfo>
                        <ProductInfoHeader>
                            <ProductInfoHeaderTitle>
                                <h1>皮卡丘</h1>
                                <span>
                                    <b><a href="">25週年收藏款</a></b>  
                                </span>
                            </ProductInfoHeaderTitle>
                            <AddToFavorite>
                                <AddToFavoriteBTN>
                                    <FavoriteBTNIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.199 15.576"><path id="Icon_ionic-ios-heart-empty" data-name="Icon ionic-ios-heart-empty" d="M15.213,3.938h-.039a4.431,4.431,0,0,0-3.7,2.025,4.431,4.431,0,0,0-3.7-2.025H7.736a4.4,4.4,0,0,0-4.361,4.4,9.479,9.479,0,0,0,1.861,5.167,32.619,32.619,0,0,0,6.238,6.009,32.619,32.619,0,0,0,6.238-6.009,9.479,9.479,0,0,0,1.861-5.167A4.4,4.4,0,0,0,15.213,3.938Zm1.62,8.925a29.867,29.867,0,0,1-5.358,5.28,29.912,29.912,0,0,1-5.358-5.284A8.4,8.4,0,0,1,4.465,8.338,3.3,3.3,0,0,1,7.744,5.032h.035a3.265,3.265,0,0,1,1.6.421,3.4,3.4,0,0,1,1.184,1.11,1.094,1.094,0,0,0,1.83,0,3.437,3.437,0,0,1,1.184-1.11,3.265,3.265,0,0,1,1.6-.421h.035a3.3,3.3,0,0,1,3.279,3.306A8.507,8.507,0,0,1,16.833,12.863Z" transform="translate(-3.375 -3.938)"></path></svg>
                                    </FavoriteBTNIcon>
                                    加入我的最愛
                                </AddToFavoriteBTN>
                            </AddToFavorite>
                        </ProductInfoHeader>

                        <ProductInfoContainer>
                            <ProductInfoImage>
                                <ImageStyle>
                                </ImageStyle>
                            </ProductInfoImage>
                            <ProductInfoContent>
                                <ProductInfoStore>
                                    <ProductInfoItem>
                                        <ProductInfoLi>
                                            <ItemStore>
                                                <a href="/search/store/6266fe34819763394d2b2250">咪哥卡鋪 PTCG中文版寶可夢卡牌販售</a>  
                                                <StoreBades></StoreBades>
                                                <h4>備貨日期：2天</h4>
                                                <h4>商店評分：5星 (10則評價)</h4>
                                            </ItemStore>
                                            <ItemInfo>
                                               <h3><span>特殊閃（跟隨系列）</span><span>完美卡況</span></h3>
                                               <h4>NT.20</h4>
                                               <h5>+NT 65 運費</h5>
                                            </ItemInfo>
                                            <CreateCart>
                                                <ItemNumber>
                                                    <select>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <span>最多5</span>
                                                </ItemNumber>
                                                <CreateBTN>加入購物車</CreateBTN>
                                            </CreateCart>
                                        </ProductInfoLi>
                                    </ProductInfoItem>
                                </ProductInfoStore>

                                <ProductDetail>
                                    <li>單卡簡介：<br></br>臉頰兩側有著小小的電力袋。遇到危險時就會放電。
                                        <br></br>
                                        <br></br>
                                    </li>
                                    <li>商品編號：001/028</li>
                                    <li>細節項目：</li>
                                    <li>卡牌種類:寶可夢卡</li>
                                    <li>血量:60</li>
                                    <li>屬性:電系</li>
                                    <li>進化:基礎</li>
                                    <li>弱點/抵抗力/撤退:【鬥】×2/--/1【無】</li>
                                    <li>招式1:咬 【無】 10</li>
                                    <li>招式2:電流攻擊 【電】【無】 30擲1次硬幣若為反面，則這隻寶可夢也受到10點傷害。</li>
                                    <li>繪師:Mitsuhiro</li>
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

const AddToFavorite = styled.section`
    display: block;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font: inherit;
`;

const AddToFavoriteBTN = styled.a`
    cursor: pointer;
    padding: 8px 18px;
    min-width: 140px;
    color: #fff!important;
    background-color: #e05e2e;
    transition: background-color .3s;
    display: inline-flex;
    border-radius: 8px;
    border: 1px solid #dfe3ea;
    align-items: center;
    justify-content: center;

`;

const FavoriteBTNIcon = styled.a`
    margin-right: 9px;
    transition: transform .3s,-webkit-transform .3s,-moz-transform .3s;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    font-size: .85rem;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #dfe3ea;
    display: flex;
`;

const ItemStore = styled.section`
    flex: 1 1;
    margin-right: 10px;
    font-size: .85rem;
    h4 {
        margin: 0; 
        color: #747693;
    }
`;

const StoreBades = styled.li`
    margin-top: 5px;
    color: #303584;
    font-size: .85rem;
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
    span{
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
    color: #fff!important;
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