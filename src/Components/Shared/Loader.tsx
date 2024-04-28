import { CircularProgress } from "@mui/material";

interface Props {
  color?: string;
  size?: number;
}

const Loader = ({ color, size }: Props) => {
  return (
    <div
      style={{ color: color ?? "white" }}
      className={`absolute w-full h-full top-0 left-0 flex justify-center items-center`}
    >
      <CircularProgress size={size} color="inherit" />
    </div>
  );
};

export default Loader;
