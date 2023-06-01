// initialize the library

import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import 'dotenv/config' 

const db = new Polybase({
  defaultNamespace: "study-zero",
  signer: (data) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.key0, data)
    }}
});


// a Polybase collection describes the rules for a collection of data

// In this example the JavaScript SDK is used to generate a collection called City
// that has name and country fields, and a setCountry() function. 
// You can define multiple collections in a single applySchema call.

// The `collection` keyword defines a named collection.
// Collection properties define the "columns" in a record.

// @`public` means that the collection is public, anyone can view and read
// the records in the collection. You can still implement rules on who can 
// edit the data by defining functions on the collection and checking the public key.

// `id` is unique and required on all collections

// A mandatory property is written like this: 'name: string'
// An optional property denoted with ?: 'country?: string'

// `constructor` is called when a new record is generated,
//  make sure to assign a value to `this.id` and `this.name`
// `this.id` must be assigned in the constructor
// `this.id` must be unique in collection

await db.applySchema(`
  @public
  collection City {
    id: string;
    name: string;
    country?: string;

    constructor (id: string, name: string) {
      this.id = id;
      this.name = name;
    }

    setCountry (country: string) {
      this.country = country;
    }
  }

  @public
  collection Country {
    id: string;
    name: string;

    constructor (id: string, name: string) {
      this.id = id;
      this.name = name;
    }
  }
`,
); // your-namespace is optional if you have defined a default namespace