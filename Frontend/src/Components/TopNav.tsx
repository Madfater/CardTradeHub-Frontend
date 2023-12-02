import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Section1 = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10%;
  background: #232540;
`;

const Section2 = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 911.37px;
`;

const PageTitle = styled.div`
  display: flex;
  padding: 3px 0px 10px 0px;
  justify-content: center;
  align-items: center;
`;

const PageTitleFont = styled.div`
  color: #fff;
  font-family: ABeeZee;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px; /* 150% */
  letter-spacing: 3px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
	width: 50%;
	height: 40px;
  align-items: flex-start;
  border-radius: 8px;
  background: #fff;
`;

const SearchBarInput = styled.div`
  display: flex;
	width: 90%;
	height: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px 0px 0px 8px;
  background: #fff;
`;

const SearchBarButton = styled.div`
  display: flex;
  width: 10%;
	height: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0px 8px 8px 0px;
  background: #3e51fe;
`;

const LoginButton = styled.div`
	width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginButtonFont = styled.div`
display: flex;
height: 18px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: #FFF;
font-family: Noto Sans TC;
font-size: 12px;
font-style: normal;
font-weight: 350;
line-height: 18px; /* 150% */
letter-spacing: 3px;
`;

export default function MainPage() {
  return (
    <Wrap>
      <Section1>
        <PageTitle>
          <PageTitleFont>CARDTRADING</PageTitleFont>
        </PageTitle>
        <SearchBar>
          <SearchBarInput></SearchBarInput>
          <SearchBarButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <g clip-path="url(#clip0_2_683)">
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
        <LoginButton>
					<LoginButtonFont>登入/註冊</LoginButtonFont>
				</LoginButton>
      </Section1>
      <Section2></Section2>
    </Wrap>
  );
}
