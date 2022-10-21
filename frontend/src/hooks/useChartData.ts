import { useState, useEffect, useMemo } from "react";
import { aboutChartDataRequest } from "@/api/aboutFetcher";
import { ChartDataType } from "@/types/chart/chartDataType";

const useChartData = (dataName: string, initialValue: ChartDataType) => {
  const [chartInfo, setCharttInfo] = useState<ChartDataType>(initialValue);

  useEffect(() => {
    (async () => {
      const res = await aboutChartDataRequest("/api/data", dataName);
      setCharttInfo(res);
    })();
  }, []);

  const rtnChartData = useMemo(() => chartInfo, [chartInfo]);

  return [rtnChartData];
};

export default useChartData;
