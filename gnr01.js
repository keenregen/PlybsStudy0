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

// Based on the collection code above, "first-city" is the `id` of the new record. 
// The `id` "first-city" must be unique (not already exist in the collection)
await db.collection("City").create(["second-city", "Second City"]); 
// first-city is the `id`, First City is the `name`
