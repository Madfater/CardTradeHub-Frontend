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

export default function MainPage() {
  return (
    <>
      <TopNav></TopNav>
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
    </>
  );
}
