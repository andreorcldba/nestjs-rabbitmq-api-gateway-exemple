export interface IResponseMessage {
  [key: number|string]: {
    statusCode: number;
    message: string | string[];
    error: string;
  }
}
