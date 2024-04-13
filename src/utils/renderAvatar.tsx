import { Avatar } from "@mui/material";

type RenderAvatarFunc = (
  alt: string | null,
  src?: string | null,
  size?: number
) => JSX.Element;

const getTextForAvatar = (alt: string) => {
  const words = alt.split(" ");

  if (words.length > 1) {
    return words.map((w) => w[0]).join("");
  }
  return alt.slice(0, 2);
};

const renderAvatar: RenderAvatarFunc = (alt, src, size = 50) => {
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

export default renderAvatar;
