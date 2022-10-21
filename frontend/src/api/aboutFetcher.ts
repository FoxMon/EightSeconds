import customAxios from "@/util/customAxios";

const baseHeaders = {
  "Content-Type": "application/json",
};

export const aboutChartDataRequest = async (
  endPoint: string,
  dataName: string
) => {
  const res = await customAxios.get(`${endPoint}/${dataName}`, {
    headers: baseHeaders,
  });
  const { datas } = res.data;
  return datas;
};
