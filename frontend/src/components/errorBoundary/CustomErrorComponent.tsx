import React, { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { AxiosError } from "axios";
import ErrorPage from "@/components/pages/ErrorPage";
import NotFound from "@/components/pages/NotFound";
import BaseErrorBoundaryContanier from "@/components/hoc/BaseErrorBoundaryContainer";

const IS_DEV_MODE = true;

const CustomErrorComponent = ({ error }: FallbackProps) => {
  useEffect(() => {
    IS_DEV_MODE && console.log(error);
  }, []);

  return (
    <BaseErrorBoundaryContanier>
      {error instanceof AxiosError ? <ErrorPage /> : <NotFound />}
    </BaseErrorBoundaryContanier>
  );
};

export default CustomErrorComponent;
