import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { addToAuditLog } from "./utils/api";

const CYPHER_APP_VERSION = "v1";
const ENCRYPTION_ALGORITHM = "aes-256-cbc";

interface Props {
  appId: string;
  appSecret: string;
  JWT_SECRET: string;
}

export class Cypher {
  appId: Buffer;
  appSecret: Buffer;
  JWT_SECRET: string;

  formattedAppId: string;
  formattedAppSecret: string;

  constructor({ appId, appSecret, JWT_SECRET }: Props) {
    this.JWT_SECRET = JWT_SECRET;
    this.formattedAppId = appId;
    this.formattedAppSecret = appSecret;

    const appIdActualValue = jwt.verify(
      appId.split(":")[2],
      JWT_SECRET
    ) as string;
    const appSecretActualValue = jwt.verify(
      appSecret.split(":")[2],
      JWT_SECRET
    ) as string;

    const appIdRegex = /^cyApp:v1:[a-zA-Z0-9._-]+$/i;
    const appSecretRegex = /^pss:v1:[a-zA-Z0-9._-]+$/i;

    if (!appIdRegex.test(appId) || !appSecretRegex.test(appSecret)) {
      throw new Error("Invalid Credentials Provided");
    }

    this.appId = Buffer.from(appIdActualValue, "hex");
    this.appSecret = Buffer.from(appSecretActualValue, "hex");
  }

  async encrypt(plainText: string): Promise<string> {
    try {
      const cipher = crypto.createCipheriv(
        ENCRYPTION_ALGORITHM,
        this.appSecret,
        this.appId
      );
      let encrypted = cipher.update(plainText, "utf-8", "hex");
      encrypted += cipher.final("hex");

      const encryptedPayload = `cy:${CYPHER_APP_VERSION}:${encrypted}`;
      addToAuditLog(this.formattedAppId, this.formattedAppSecret, "ENCRYPT");

      return encryptedPayload;
    } catch (err) {
      throw new Error("Encryption failed");
    }
  }

  async decrypt(payload: string): Promise<string> {
    try {
      const encrypted = payload.split(":")[2];
      const decipher = crypto.createDecipheriv(
        ENCRYPTION_ALGORITHM,
        this.appSecret,
        this.appId
      );
      let decrypted = decipher.update(encrypted, "hex", "utf-8");
      decrypted += decipher.final("utf-8");

      addToAuditLog(this.formattedAppId, this.formattedAppSecret, "DECRYPT");

      return decrypted;
    } catch (err) {
      throw new Error("Decryption failed");
    }
  }
}
