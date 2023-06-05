import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "study-trial-two",
    signer: (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.key0, data)
      }}
  });

const result0 = await db.collection("User").record("first-user").get();
// const result1 = await db.collection("City").record("second-city").get();

console.log("first: ", result0);
