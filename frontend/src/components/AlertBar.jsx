import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAlert } from './AlertContext';

export default function AlertBar() {
  const { alertState, alertOnClose } = useAlert();

  return (
    <>
      <Snackbar
        open={alertState.open}
        autoHideDuration={3000}
        onClose={alertOnClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
      >
        <Alert 
          onClose={alertOnClose}
          variant="filled"
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  )
}