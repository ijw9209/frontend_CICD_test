"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { PAGE_URL_ENUM, ALERT_TYPE_ENUM } from "@/common";
import Link from "next/link";
import { Fragment } from "react";
import { useCommonAlertModalStore } from "@/store/common-alert-modal.store";
import { LodashUtil } from "@/common";
import { AlertProps } from "@/types";

export default function Home() {
  const { data: session } = useSession();
  const lodashUtil = new LodashUtil();

  const { setAlertProps } = useCommonAlertModalStore((state) => ({
    setAlertProps: state.setAlertProps,
  }));

  const showAlert = lodashUtil.debounceUtil(() => {
    const alertProps = new AlertProps();
    alertProps.display = true;
    alertProps.message = "This is an alert message!";
    alertProps.alertType = ALERT_TYPE_ENUM.ALERT;
    setAlertProps(alertProps);
  }, 500);

  return (
    <div>
      <h1>Welcome to the JWT Auth Example</h1>

      {session ? (
        <Fragment>
          {/* <Link href="/protected">Go to Protected Page</Link> */}
          <Link href={PAGE_URL_ENUM.SENIORLIFE_LIST}>SeniorLife</Link>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            로그아웃
          </button>
        </Fragment>
      ) : (
        <Link href={PAGE_URL_ENUM.LOGIN}>Login</Link>
      )}
      <div>
        <button onClick={showAlert}>Show Alert</button>
      </div>
    </div>
  );
}
