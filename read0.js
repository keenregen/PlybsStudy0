import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "study-zero",
    signer: (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.key0, data)
      }}
  });

const result0 = await db.collection("City").record("first-city").get();
const result1 = await db.collection("City").record("second-city").get();

console.log("first: ", result0.data,"\nsecond: ", result1.data);
