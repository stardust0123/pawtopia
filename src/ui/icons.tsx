import {
  ArrowLeft,
  ArrowRight,
  Home,
  Settings,
  User,
  Plus,
  Trash2,
  Tag
} from "lucide-react";

export const Icons = {
  back: ArrowLeft,
  forward: ArrowRight,
  home: Home,
  settings: Settings,
  user: User,
  add: Plus,
  delete: Trash2,
  tag: Tag
};

export type IconName = keyof typeof Icons;
