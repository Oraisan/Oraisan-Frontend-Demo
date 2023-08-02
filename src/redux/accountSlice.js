import { createSlice } from "@reduxjs/toolkit";
import { LS } from "src/constants";
import store from "./store";
import {
    generatePublicAndPrivateKeyStringFromMnemonic,
    generatePublicKeyStringFromPrivateKeyString,
} from "src/service/utils";
import { BASE_API_URL } from "src/constants";
import Axios from "axios";

const bip39 = require("bip39");
const { generate } = require("password-hash");
const { eddsa, babyJub } = require("circomlib");

const initialLogin = localStorage.getItem(LS.LOGIN);

export const constructInitialAccounts = () => {
    var arr = [];
    var count = 1;
    while (true) {
        if (
            localStorage.getItem(`${LS.PUBLIC_KEY} ${count}`) === undefined ||
            localStorage.getItem(`${LS.PUBLIC_KEY} ${count}`) === null
        )
            break;
        let publicKey = localStorage.getItem(`${LS.PUBLIC_KEY} ${count}`);
        let privateKey = localStorage.getItem(`${LS.PRIVATE_KEY} ${count}`);
        let password = localStorage.getItem(`${LS.PASSWORD} ${count}`);
        let name = localStorage.getItem(`${LS.NAME} ${count}`);
        if (
            publicKey !== undefined &&
            publicKey !== null &&
            privateKey !== undefined &&
            privateKey !== null &&
            password !== undefined &&
            password !== null
        ) {
            arr.push({
                name: name,
                publicKey: publicKey,
                privateKey: privateKey,
                password: password,
            });
        }
        count++;
    }

    return arr;
};

const initialState = {
    isLogin: initialLogin === null ? undefined : initialLogin,
    activeAccount:
      initialActiveAccount === null ? undefined : initialActiveAccount,
    mnemonic: undefined,
    cachedPublicKeyBuffer: localStorage.getItem(LS.PUBLIC_KEY),
    cachedPrivateKeyBuffer: localStorage.getItem(LS.PRIVATE_KEY),
    cachedPasswordBuffer: localStorage.getItem(LS.PASSWORD),
    cachedNameBuffer: undefined,
    accounts: constructInitialAccounts(),
  };

  
const initialActiveAccount = localStorage.getItem(LS.ACTIVE_ACCOUNT); export const changeActiveAccount = (index) => (dispatch) => {
    dispatch(changeActiveAccountSuccess({ index: index }));
};