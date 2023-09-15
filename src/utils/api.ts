import axios from "axios";
import { API_ENDPOINT } from "./constants";

export function addToAuditLog(
  appId: string | Buffer,
  appSecret: string | Buffer,
  eventType: string
) {
  console.log(appId.toString("hex"), appSecret.toString("hex"));
  return axios.post(
    `${API_ENDPOINT}/apps/logs`,
    {
      SDK: "NODEJS_SDK",
      eventType,
    },
    {
      headers: {
        "x-app-id": `${appId.toString("hex")}`,
        "x-app-secret": `${appSecret.toString("hex")}`,
      },
    }
  );
}
