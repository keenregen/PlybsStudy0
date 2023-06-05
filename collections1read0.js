import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "study-trial-one",
    signer: (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.key0, data)
      }}
  });

const result0 = await db.collection("User");
// const result1 = await db.collection("City").record("second-city").get();

console.log("first: ", ethPersonalSign(process.env.key0,[]), ctx.publicKey);
