import sslcommerz from "sslcommerz-lts";

export const ssl = new sslcommerz(
  process.env.STORE_ID!,
  process.env.STORE_PASSWORD!,
  false
);
