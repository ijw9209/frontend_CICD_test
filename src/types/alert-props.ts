import { ALERT_TYPE_ENUM } from "@/common";

export class AlertProps {
  display: boolean = false;
  alertType: ALERT_TYPE_ENUM = ALERT_TYPE_ENUM.ALERT;
  title?: string;
  message!: string;
  zIndex?: number;
  cancelButtonName?: string;
  confirmButtonName?: string;
  overlay: boolean = true;
  overlayClose: boolean = true;
  confirmCallback?: Function;
  cancelCallback?: Function;
  callBackUrl?: string;
}
