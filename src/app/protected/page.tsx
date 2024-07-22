"use client";
import TestService from "@/service/test/test.service";
import { useEffect } from "react";

export default function Protected() {
  useEffect(() => {
    getFindProtected();
  }, []);

  const getFindProtected = async () => {
    console.log("여기 호출");
    const res = await TestService.findProtected();

    console.log("[res]", res);
  };

  const parameterSwitcher = (
    apiUrl: string,
    indicator?: string,
    paramater?: any
  ) => {
    console.log("paramater", paramater);
    if (!indicator) return apiUrl;
    apiUrl = apiUrl.replace(indicator, paramater);
    console.log("apiUrl", apiUrl);
    return apiUrl;
  };

  return <div>Protected Page</div>;
}
