import { Cypher } from "./index";

const cypher = new Cypher({
  appId:
    "cyApp:v1:eyJhbGciOiJIUzI1NiJ9.MWI2ZjhhMjM0MDM1MzZmNWY3MmEwNzkyOWU1MzA1OGE.1CF2PT9qnkW9TbnlTyhCOGP8RGLhscwVbwlJAas-ouw",
  appSecret:
    "pss:v1:eyJhbGciOiJIUzI1NiJ9.MDNlYmFiM2NiZGE4OWM5YWMyZWY1MWNjYzM3ZTliNzcwMWUzNDA1OWY3MjEzN2U4ZWFiYjY1NDdmNjAxYzIzNg.Ssz-S_LNJWZ5ZEGqdu_DPYsIXymJ6ulIkcxMfhDXYXI",
  JWT_SECRET: "AWDJKHGAWJHDKHAWKJD",
});

const main = async () => {
  const encrypted = await cypher.encrypt("The british are coming!");

  console.log("Encrypted:", encrypted);

  const decrypted = await cypher.decrypt(encrypted);

  console.log("Decrypted:", decrypted);
};

main();
