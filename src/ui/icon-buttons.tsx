import { Icons, IconName } from "@/ui/icons";
import { ButtonHTMLAttributes } from "react";

type IconButtonProps = {
  icon: IconName;
  label?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon,
  label,
  className,
  ...props
}: IconButtonProps) {
  const Icon = Icons[icon];
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-100 transition ${className ?? ""}`}
      {...props}
    >
      <Icon size={16} />
      {label && <span>{label}</span>}
    </button>
  );
}
