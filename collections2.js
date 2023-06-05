import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config'

const db = new Polybase({
    defaultNamespace: "study-trial-two",
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
    
    constructor (id: string) {
      if (id != "first-userr") {
        error("you do not have permission to do that");
      }
        this.id = id;

    }
    function setName (name: string) {
        this.name = name;
      }
    }
`); // your-namespace is optional if you have defined a default namespace