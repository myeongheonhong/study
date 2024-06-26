export interface ServiceResponseType<T = any> {
  status: boolean;
  statusCode: number;
  message: string;
  data?: T;
}
