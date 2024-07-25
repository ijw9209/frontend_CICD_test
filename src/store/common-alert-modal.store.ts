// zustand의 create를 사용하여 store를 생성.
import { AlertProps } from "@/types";
import { create } from "zustand";

interface commonAlertModalStore {
  alertProps: AlertProps;
  setAlertProps: (newProps: Partial<AlertProps>) => void;
  closeModal: () => void;
}

export const useCommonAlertModalStore = create<commonAlertModalStore>(
  (set) => ({
    alertProps: new AlertProps(),
    setAlertProps: (newProps) =>
      set((state) => ({
        alertProps: { ...state.alertProps, ...newProps },
      })),
    closeModal: () =>
      set((state) => ({
        alertProps: { ...state.alertProps, display: false },
      })),
  })
);
