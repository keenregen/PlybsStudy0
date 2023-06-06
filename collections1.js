import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "study-trial-five",
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
    constructor (id: string, name?:string) {
        this.id = id;
        this.name = name;
    }
    function setId (id: string) {
        this.id = id;
      }
      function setName (name: string) {
        this.name = name;
      }
    }
`,); // your-namespace is optional if you have defined a default namespace