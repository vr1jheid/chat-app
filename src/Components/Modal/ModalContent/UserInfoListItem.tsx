import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const UserInfoListItem = ({ icon, children, className }: Props) => {
  return (
    <li className="flex py-3 gap-2">
      <div className="px-3 text-icon-modal">{icon}</div>
      <p className={twMerge("flex items-center tracking-wider", className)}>
        {children}
      </p>
    </li>
  );
};
