"use client";
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"
import { css } from "@emotion/react"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./AuthContext"
import { app } from "../../lib/FirebaseConfig"

const Signup = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const auth = getAuth(app)
  const isLoggedIn = !!user
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // デバッグ用一括ログ表示のフラグ
  let debugShowLogs = false;
  // デバッグ用一括ログ表示を切り替える関数
  function toggleLogs() {
    debugShowLogs = !debugShowLogs;
  }

  // デバッグ用一括コンソールログ出力する関数
  function toggleConsoleLog(message: any) {
    if (debugShowLogs) {
      console.log(message);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toggleConsoleLog("handleSubmit に入った")
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    router.push("/")
  }
  const handleClose = async () => {
    await router.push("/")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleConsoleLog("handleChangeEmail に入った")
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleConsoleLog("handleChangePassword に入った")
    setPassword(e.currentTarget.value)
  }
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column;
      `}
    >
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <Link className="text-xl"
        href="/top"
      >
        topに戻る
      </Link>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            css={css`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 16px;
          `}
        >
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            css={css`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 16px;
          `}
        >
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
          `}
        >
          <Link href={"/login"}>
            すでに登録している人はこちら
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup