import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BaseComponentType } from "@/types/common/baseComponentType";
import CustomErrorComponent from "@/components/errorBoundary/CustomErrorComponent";

const CommonErrorBoundary = ({ children }: BaseComponentType) => {
  return (
    <ErrorBoundary FallbackComponent={CustomErrorComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default CommonErrorBoundary;
