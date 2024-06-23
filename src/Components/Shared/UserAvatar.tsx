import { Avatar } from "@mui/material";

interface Props {
  alt: string | null;
  src?: string | null;
  size?: number | string;
}

const getTextForAvatar = (alt: string) => {
  const words = alt.split(" ");

  if (words.length > 1) {
    return words.map((w) => w[0]).join("");
  }
  return alt.slice(0, 2);
};

const UserAvatar = ({ alt, src, size = 50 }: Props) => {
  /*   console.log(src); */

  if (src) {
    return <Avatar sx={{ width: size, height: size }} src={src}></Avatar>;
  }

  return (
    <Avatar sx={{ width: size, height: size }}>
      {alt ? getTextForAvatar(alt) : "?"}
    </Avatar>
  );
};

export default UserAvatar;
