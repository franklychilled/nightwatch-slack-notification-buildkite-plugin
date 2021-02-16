import { WebClient, WebAPICallResult } from "@slack/web-api";

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string;
  ts: string;
  message: {
    text: string;
  }
}

export const sendSlackMessage = async (slackToken: string, channel:string,  attachments: any[]) => {
  console.log(
      `Sending message to conversation ${channel} which contains the message ${JSON.stringify(attachments)}`
  );
  console.log("Connecting using " + slackToken.substring(0, 8) + "...");
  const web = new WebClient(slackToken);

  // The result is cast to the interface
  const res = (await web.chat.postMessage({ channel, attachments, text: "" }) as ChatPostMessageResult);

  // Properties of the result are now typed
  console.log(
    `A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${JSON.stringify(res.message)}`
  );
};