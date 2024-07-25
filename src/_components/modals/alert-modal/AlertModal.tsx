"use client";
import { useState, useEffect, Fragment } from "react";
import styles from "./alert-modal.module.scss";
import { AlertProps } from "@/types";
import { useCommonAlertModalStore } from "@/store/common-alert-modal.store";
import { useRouter } from "next/navigation";
import { ALERT_TYPE_ENUM } from "@/common";

export default function AlertModal() {
  const router = useRouter();
  const { alertProps, closeModal } = useCommonAlertModalStore((state) => ({
    alertProps: state.alertProps,
    closeModal: state.closeModal,
  }));

  const formatMessage = (message) => {
    // \n 문자를 <br /> 태그로 변환
    return message.split("\n").map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  };

  useEffect(() => {
    console.log(alertProps);
  }, [alertProps]);

  const onClose = () => {
    if (alertProps.callBackUrl) {
      console.log("여기");
      router.push(alertProps.callBackUrl);
    }
    closeModal();
  };

  const confirm = () => {
    console.log("확인버튼");
    closeModal();
  };

  return (
    <Fragment>
      {alertProps.alertType === ALERT_TYPE_ENUM.ALERT &&
        alertProps?.display && (
          <div className={styles.modal_wrap}>
            {/* <button onClick={openModal}>Show Alert</button> */}
            <div className={styles.modal_overlay}>
              <div className={styles.content}>
                {alertProps?.title && <h1>{alertProps.title}</h1>}
                <p>{formatMessage(alertProps?.message)}</p>
                <button onClick={onClose}>
                  {alertProps.confirmButtonName || "확인"}
                </button>
              </div>
            </div>
          </div>
        )}
      {alertProps.alertType === ALERT_TYPE_ENUM.CONFIRM &&
        alertProps?.display && (
          <div className={styles.modal_wrap}>
            {/* <button onClick={openModal}>Show Alert</button> */}
            <div className={styles.modal_overlay}>
              <div className={styles.content}>
                {alertProps?.title && <h1>{alertProps.title}</h1>}
                <p>{formatMessage(alertProps?.message)}</p>
                <button className={styles.confirm_btn} onClick={confirm}>
                  {alertProps.confirmButtonName || "확인"}
                </button>
                <button onClick={onClose}>
                  {alertProps.cancelButtonName || "취소"}
                </button>
              </div>
            </div>
          </div>
        )}
    </Fragment>
  );
}
