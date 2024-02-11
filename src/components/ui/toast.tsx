import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastContainerType = {
  position:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  theme: "light" | "dark";
  autoClose: number;
};

const MyToastContainer = ({
  position,
  theme,
  autoClose,
}: ToastContainerType) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      theme={theme}
    />
  );
};

export default MyToastContainer;
