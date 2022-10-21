export interface ErrorType {
  response: {
    data: {
      success: boolean;
      status: number;
      message: string;
    };
  };
}
