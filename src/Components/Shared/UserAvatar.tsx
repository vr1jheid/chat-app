import { Avatar } from "@mui/material";

interface Props {
  alt: string;
  src?: string | null;
  size?: number | string;
  variant?: "circular" | "rounded" | "square";
}

const getTextForAvatar = (alt: string) => {
  const words = alt.split(" ");

  if (words.length > 1) {
    return words.map((w) => w[0]).join("");
  }
  return alt.slice(0, 1);
};

export const UserAvatar = ({ alt, src, size, variant = "circular" }: Props) => {
  const sizeSize = size ?? "100%";
  return (
    <Avatar
      variant={variant}
      sx={{ width: sizeSize, height: sizeSize }}
      src={src ?? undefined}
    >
      {!src && alt ? getTextForAvatar(alt) : "?"}
    </Avatar>
  );
};
