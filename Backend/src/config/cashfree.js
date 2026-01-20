import axios from "axios";
import env from "./env.js";

const CASHFREE_BASE_URL =
  env.cashfree.env === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

const cashfreeClient = axios.create({
  baseURL: CASHFREE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-client-id": env.cashfree.appId,
    "x-client-secret": env.cashfree.secretKey,
    "x-api-version": "2022-09-01",
  },
});

export default cashfreeClient;
