import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "study-trial-three",
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
    name?: string;
    age?: number; 
    publicKey: PublicKey;
    publicKeyH: string;

    constructor (id: string) {
        this.id = id;
        this.publicKey = ctx.publicKey;
        this.publicKeyH = ctx.publicKey.toHex();
    }
    function setName (name: string) {
      if (this.publicKey != ctx.publicKey) {
        error("you do not have permission to do that");
      }
        this.name = name;
      }
    }
`); // your-namespace is optional if you have defined a default namespace