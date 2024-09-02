enum Sender {
  React,
  Content,
}
interface ChromeMessage {
  from: Sender;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
}
export type { ChromeMessage };
export { Sender };