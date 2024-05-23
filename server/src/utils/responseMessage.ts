export const success = (statusCode: number, message: string, data?: unknown) => {
  return {
    statusCode,
    success: true,
    message,
    data,
  };
};

export const fail = (statusCode: number, message: string) => {
  return {
    statusCode,
    success: false,
    message,
  };
};
