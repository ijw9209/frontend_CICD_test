"use client";
import TestService from "@/services/test/test.service";
import { useEffect } from "react";

export default function Protected() {
  useEffect(() => {
    getFindProtected();
  }, []);

  const getFindProtected = async () => {
    const res = await TestService.findProtected();

    // console.log("[res]", res);
  };

  return <div>Protected Page</div>;
}
