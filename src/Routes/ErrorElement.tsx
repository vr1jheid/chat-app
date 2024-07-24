import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();
  console.log("HIIHI", error);
  const errorMessage = error instanceof Error ? error.message : "Unknown Error";

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center gap-10 w-full h-full lg:w-[600px] lg:h-[500px] text-white">
        <div className="text-7xl">
          <SmartToyIcon fontSize="large" /> Whoops...
        </div>
        <div className="text-4xl">
          An error has occurred:
          <br /> {errorMessage}
        </div>
      </div>
    </div>
  );
};
