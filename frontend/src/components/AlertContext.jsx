import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [alertState, setAlertState] = useState({
    open: false,
    severity: '',
    message: ''
  });

  const showSuccessAlert = (message = '') => {
    setAlertState({
      open: true,
      severity: 'success',
      message: message
    })
  }

  const showErrorAlert = (message = '') => {
    setAlertState({
      open: true,
      severity: 'error',
      message: message
    })
  }

  const alertOnClose = () => {
    setAlertState({
      ...alertState,
      open: false,
    });
  }

  return (
    <AlertContext.Provider
      value={{ alertState, showSuccessAlert, showErrorAlert, alertOnClose }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export function useAlert() {
  return useContext(AlertContext);
}