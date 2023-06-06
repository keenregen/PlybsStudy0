import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "study-trial-trial",
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
    publicKey?: PublicKey;
    publicKey2?: String;
    publicKeyH?: string;
    name?: string;
    age?: number; 

    constructor (id: string) {
        if (ctx.publicKey.toHex() != "0x74dd6261d87091d93a372be682f5fba4d5b4369ec8352a624540764ad40c4220e9f4a3fc653a3e55c688d78e517c0d5639334dd20307cc717d79dd2bf09e9c50")
        {error('You are not allowed to use constructor.');}
        this.id = id;
        this.name = ctx.publicKey.toHex();

    }
    function setName (name: string) {
        this.name = ctx.publicKey.toHex();
      }
    }
`,);