import React, { useState } from "react";
import api from "../Components/API";
import styled from "styled-components";
import bk from "../Images/LoginBackground.jpg";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useDialog from "../Hooks/useDialog";
import TextDialog from "../Dialogs/TextDialog";

const FrameWrapper = styled.div`
  position: relative;
  background-color: #faf7f7;
  color: #1f100b;
  letter-spacing: 3px;
  font-family: Noto Sans TC, sans-serif;
  line-height: 1.5;
`;

const MainWrapper = styled.div`
  display: flex;
  padding: 40px;
  min-height: 95vh;
  background-image: url(${bk});
  background-attachment: fixed;
  background-position: 50%;
  background-size: cover;
`;

const Bkb = styled.div`
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0.15)),
    to(#000)
  );
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Article = styled.div`
  position: relative;
  width: 85%;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: center;
  flex-flow: row;
`;

const Section = styled.div`
  flex: 2 1;
  color: #fff;
  display: block;
`;

const SectionText = styled.h1`
  font-size: 2.25rem;
  font-weight: 500;
`;

const Alter = styled.h1`
  margin: 15px 0;
  width: 60px;
  height: 4px;
  border-radius: 5px;
  background-color: #3e51fe;
  content: "";
`;

const Aside = styled.div`
  flex: 1 1;
  padding: 40px 20px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-flow: column;
`;

const From = styled.form`
  display: block;
`;

const FromTitle = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
`;

const FromRow = styled.main`
  margin-bottom: 20px;
`;

const FromLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  opacity: 0.6;
`;

const FromInput = styled.input`
  flex: 1 1;
  padding: 14px 0px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  letter-spacing: 2px;
  font-size: 1rem;
  border: 1px solid #dfe3ea;
`;

const LoginButton = styled.div`
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  background-color: #3e51fe;
  color: #fff;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const Formfooter = styled.footer`
  margin-right: auto;
  margin-left: auto;
  min-width: 100%;
  text-align: center;
  letter-spacing: 1px;
  font-size: 0.75rem;
  margin-top: 20px;
`;
const BlueText = styled.a`
  color: #3e51fe;
  cursor: pointer;
`;

export default function MemberLogin() {
  const nav = useNavigate();

  const { setUserId } = useAuth();

  const [accountValue, setAccountValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [textContent, setTextContent] = useState("");

  const {
    isOpen: isTextDialogOpen,
    openDialog: openTextDialog,
    closeDialog: closeTextDialog,
  } = useDialog();

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountValue(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const verifyAccount = async () => {
    try {
      const body = {
        email: accountValue,
        password: passwordValue,
      };
      const response = await api.post("/user/login", body);
      const data = response?.data;

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConfirmButton = async () => {
    const result = await verifyAccount();
    if (result == "this email isn't register yet") {
      setTextContent("帳號尚未註冊");
      openTextDialog();
    } else if (result == "login failed") {
      setTextContent("登入失敗");
      openTextDialog();
    } else {
      setUserId?.(result);
      nav("/");
    }
  };

  const handleGotoRegisterButton = () => {
    nav("/registerpage");
  };

  return (
    <>
      <TextDialog
        open={isTextDialogOpen}
        onClose={closeTextDialog}
        onConfirm={closeTextDialog}
        Text={textContent}
      />
      <FrameWrapper>
        <Bkb />
        <MainWrapper>
          <Article>
            <Section>
              <SectionText>CardShop</SectionText>
              <Alter></Alter>
              <span>超過數萬張的卡牌交易，即在CardShop!</span>
            </Section>

            <Aside>
              <From>
                <FromTitle>會員登入</FromTitle>

                <main>
                  <FromRow>
                    <section>
                      <FromLabel>
                        使用者帳號
                        <span>*</span>
                      </FromLabel>
                      <FromInput
                        value={accountValue}
                        onChange={handleAccountChange}
                      />
                    </section>
                  </FromRow>

                  <FromRow>
                    <section>
                      <FromLabel>
                        使用者密碼
                        <span>*</span>
                      </FromLabel>
                      <FromInput
                        value={passwordValue}
                        onChange={handlePasswordChange}
                      />
                    </section>
                  </FromRow>
                </main>

                <LoginButton onClick={handleConfirmButton}>
                  帳號登入
                </LoginButton>

                <Formfooter>
                  您還沒有帳號嗎？
                  <BlueText onClick={handleGotoRegisterButton}>
                    即刻註冊吧！
                  </BlueText>
                </Formfooter>
              </From>
            </Aside>
          </Article>
        </MainWrapper>
      </FrameWrapper>
    </>
  );
}
