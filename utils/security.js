import bcrypt from "bcrypt";

export const encryption = plaintext => bcrypt.hashSync(plaintext, 10);

export const validate = (plaintext, cyphertext) =>
  bcrypt.compareSync(plaintext, cyphertext);