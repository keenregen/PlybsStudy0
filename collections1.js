import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "study-trial-one",
    signer: (data) => {
        return {
            h: 'eth-personal-sign',
            sig: ethPersonalSign(process.env.key0, data)
        }}
});

// public key can be used to authenticate function
// calls later

await db.applySchema(`
  @public
  collection User {
    id: string;
    publicKey: PublicKey;
    name?: string;
    age?: number; 
    constructor (id: string) {
        this.id = id;
        this.publicKey = ctx.publicKey;
    }
    function setName (name: string) {
        if (ctx.publicKey != this.publicKey) {
          error('You are not the generator of this record.');
        }
        this.name = name;
      }
    }
`,); // your-namespace is optional if you have defined a default namespace