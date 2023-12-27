import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "./API";
import TextDialog from "../Dialogs/TextDialog";
import useDialog from "../Hooks/useDialog";

export default function MainPage() {
  const nav = useNavigate();
  const { userId, logout } = useAuth();
  const [userName, setUserName] = useState<string>();

  const {
    isOpen: isTextDialogOpen,
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
  } = useDialog();

  const handleGotologinButton = () => {
    nav("/login");
  };

  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean>(false);

  const getUserName = async () => {
    try {
      const response = await api.get(`/user/name?id=${userId}`);
      const data = response?.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId != null) {
      setIsUserIdAvailable(true);
    } else {
      setIsUserIdAvailable(false);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserName();
      setUserName(data);
    };
    fetchData();
  }, []);

  const handleLogoutClick = () => {
    openTextDialog();
    logout();
  };

  return (
    <>
      <TextDialog
        open={isTextDialogOpen}
        onClose={closeTextDialog}
        onConfirm={closeTextDialog}
        Text={"成功登出"}
      />
      <Wrap>
        <Section1>
          <PageTitle>
            <PageTitleFont>CARDTRADING</PageTitleFont>
          </PageTitle>

          <SearchBar>
            <article style={{ boxSizing: "border-box", width: "100%" }}>
              <SearchBarInput></SearchBarInput>
            </article>
            <SearchBarButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <g clipPath="url(#clip0_2_683)">
                  <path
                    d="M9.34657 7.99355H8.79957L8.59457 7.82255C9.27901 7.00576 9.65426 5.9742 9.65457 4.90855C9.64883 4.03327 9.38381 3.17932 8.89298 2.45458C8.40215 1.72985 7.70755 1.16683 6.8969 0.836671C6.08626 0.506508 5.19594 0.424006 4.33843 0.599586C3.48092 0.775166 2.69468 1.20095 2.07904 1.82316C1.4634 2.44536 1.04597 3.23607 0.879492 4.09539C0.713012 4.95471 0.804947 5.8441 1.14369 6.6512C1.48242 7.4583 2.05277 8.1469 2.78267 8.63002C3.51256 9.11313 4.36927 9.36909 5.24457 9.36555C6.30719 9.35891 7.33447 8.98314 8.15057 8.30255L8.35557 8.47355V9.02155L11.7736 12.4505L12.7996 11.4215L9.34657 7.99355ZM5.24657 7.99355C4.63583 7.99533 4.0383 7.81585 3.52963 7.47784C3.02096 7.13983 2.62402 6.65849 2.38907 6.09476C2.15411 5.53103 2.09171 4.91025 2.20977 4.31104C2.32783 3.71182 2.62103 3.1611 3.05225 2.72862C3.48348 2.29613 4.03333 2.00132 4.6322 1.88152C5.23107 1.76171 5.85202 1.8223 6.41644 2.0556C6.98086 2.28891 7.46336 2.68444 7.80285 3.19213C8.14234 3.69981 8.32357 4.29681 8.32357 4.90755C8.32581 5.31285 8.24776 5.71458 8.09391 6.08954C7.94006 6.46451 7.71346 6.80529 7.42719 7.09221C7.14092 7.37913 6.80066 7.6065 6.42604 7.7612C6.05142 7.91591 5.64987 7.99488 5.24457 7.99355H5.24657Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_683">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="translate(0.799561 0.450562)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </SearchBarButton>
          </SearchBar>

          <NavUl>
            {isUserIdAvailable ? (
              <>
                <NavLi>
                  <LoginButtonFont>歡迎 {userName}</LoginButtonFont>
                </NavLi>
                <NavLi>
                  <LoginButton>
                    <LoginButtonFont onClick={handleLogoutClick}>
                      登出
                    </LoginButtonFont>
                  </LoginButton>
                </NavLi>
              </>
            ) : (
              <NavLi>
                <LoginButton>
                  <LoginButtonFont onClick={handleGotologinButton}>
                    登入/註冊
                  </LoginButtonFont>
                </LoginButton>
              </NavLi>
            )}
          </NavUl>
        </Section1>

        <Section2>
          <ButtonList>
            <NavButton>
              <NavButtonFont>首頁</NavButtonFont>
            </NavButton>
            <NavButton>
              <NavButtonFont>我的訂單</NavButtonFont>
            </NavButton>
            <NavButton>
              <NavButtonFont>我的商店</NavButtonFont>
            </NavButton>
          </ButtonList>

          <CircleNavButtonlist>
            <ShopCartButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clipPath="url(#clip0_2_716)">
                  <path
                    d="M3.49891 16.4506C2.96519 16.4495 2.45353 16.2375 2.07544 15.8607C1.69736 15.484 1.48351 14.9731 1.4805 14.4394V3.96048C1.48005 3.8482 1.51649 3.73887 1.58422 3.64932L3.85157 0.658003C3.89987 0.593595 3.96251 0.541318 4.03452 0.505312C4.10653 0.469307 4.18594 0.450562 4.26645 0.450562H13.3327C13.4132 0.450562 13.4926 0.469307 13.5646 0.505312C13.6366 0.541318 13.6993 0.593595 13.7476 0.658003L16.017 3.64932C16.084 3.73926 16.1203 3.84833 16.1207 3.96048V14.4363C16.118 14.9711 15.9037 15.4831 15.5248 15.8605C15.1459 16.2379 14.633 16.45 14.0982 16.4506H3.49891ZM2.51771 4.13473V14.4363C2.51963 14.6961 2.62418 14.9446 2.80857 15.1276C2.99295 15.3107 3.24222 15.4134 3.50203 15.4134H14.094C14.3545 15.4136 14.6046 15.3108 14.7896 15.1274C14.9746 14.9439 15.0795 14.6948 15.0814 14.4342V4.13473L13.0744 1.48777H4.52264L2.51771 4.13473Z"
                    fill="white"
                  />
                  <path
                    d="M15.5969 4.4791H1.9991C1.86156 4.4791 1.72965 4.42447 1.6324 4.32721C1.53514 4.22995 1.4805 4.09804 1.4805 3.9605C1.4805 3.82296 1.53514 3.69105 1.6324 3.59379C1.72965 3.49653 1.86156 3.44189 1.9991 3.44189H15.5969C15.7345 3.44189 15.8664 3.49653 15.9636 3.59379C16.0609 3.69105 16.1155 3.82296 16.1155 3.9605C16.1155 4.09804 16.0609 4.22995 15.9636 4.32721C15.8664 4.42447 15.7345 4.4791 15.5969 4.4791Z"
                    fill="white"
                  />
                  <path
                    d="M8.80009 10.4492C7.87696 10.4476 6.99212 10.0801 6.33946 9.42724C5.6868 8.77438 5.31955 7.88943 5.31818 6.9663C5.31818 6.82876 5.37281 6.69685 5.47007 6.59959C5.56733 6.50233 5.69924 6.44769 5.83678 6.44769C5.97432 6.44769 6.10623 6.50233 6.20349 6.59959C6.30075 6.69685 6.35539 6.82876 6.35539 6.9663C6.35675 7.61399 6.61444 8.23481 7.07214 8.69309C7.52983 9.15137 8.15033 9.40985 8.79802 9.41204C9.11937 9.41231 9.43763 9.34925 9.7346 9.22646C10.0316 9.10368 10.3014 8.92357 10.5288 8.69643C10.7561 8.4693 10.9364 8.19959 11.0595 7.90272C11.1825 7.60586 11.2458 7.28765 11.2458 6.9663C11.2458 6.82876 11.3005 6.69685 11.3977 6.59959C11.495 6.50233 11.6269 6.44769 11.7644 6.44769C11.902 6.44769 12.0339 6.50233 12.1311 6.59959C12.2284 6.69685 12.283 6.82876 12.283 6.9663C12.283 7.89003 11.9161 8.77594 11.2629 9.42912C10.6097 10.0823 9.72383 10.4492 8.80009 10.4492Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_716">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.799561 0.450562)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </ShopCartButton>
          </CircleNavButtonlist>
        </Section2>
      </Wrap>
    </>
  );
}

const Wrap = styled.nav`
  position: relative;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const Section1 = styled.section`
  padding: 0 40px;
  align-items: center;
  height: 70px;
  background-color: #232540;
  display: flex;
  justify-content: space-between;
`;

const PageTitle = styled.div`
  display: flex;
  flex-flow: column;
`;

const PageTitleFont = styled.div`
  color: #fff;
  font-family: ABeeZee;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px; /* 150% */
  letter-spacing: 3px;
`;

const SearchBar = styled.form`
  width: 50%;
  height: 40px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
`;

const SearchBarInput = styled.input`
  border-radius: 8px 0 0 8px;
  color: #747693;
  writing-mode: horizontal-tb !important;
  padding-block: 1px;
  padding-inline: 2px;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  letter-spacing: 3px;
  font-size: 0.75rem;
`;

const SearchBarButton = styled.div`
  width: 50px;
  border: none;
  border-radius: 0 8px 8px 0;
  background-color: #3e51fe;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const LoginButtonFont = styled.div`
  display: flex;
  height: 18px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  font-family: Noto Sans TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 350;
  line-height: 18px; /* 150% */
  letter-spacing: 3px;
`;

const NavUl = styled.ul`
  flex-basis: 140px;
  justify-content: flex-end;
  height: 100%;
  display: flex;
  align-items: center;
  flex-flow: row;
  box-sizing: border-box;
`;

const NavLi = styled.li`
  position: relative;
  height: 100%;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section2 = styled.section`
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
`;

const ButtonList = styled.ul`
  display: flex;
  flex-flow: row;
`;

const NavButton = styled.li`
  display: inline-flex;
  margin-right: 60px;
`;

const NavButtonFont = styled.a`
  color: #1f100b;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleNavButtonlist = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const ShopCartButton = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 36px;
  opacity: 0.5;
  background: #3e51fe;
`;
