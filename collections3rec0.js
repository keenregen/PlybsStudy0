import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: "study-trial-three",
    signer: (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(process.env.key0, data)
      }}
  });

// Based on the collection code above, "first-user" is the `id` of the new record. 
// The `id` "first-user" must be unique (not already exist in the collection)
await db.collection("User").create(["first-user"]); 
// first-user is the `id`, First User is the `name`