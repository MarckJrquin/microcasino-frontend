import { Toaster as SonnerToaster } from "sonner";
import { useSelector } from "react-redux";

const Toaster = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <SonnerToaster 
      richColors 
      closeButton 
      theme={theme} 
      position="bottom-right"
    />
  );
};

export default Toaster;
