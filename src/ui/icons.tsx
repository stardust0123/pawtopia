"use client";

import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Save,
  MoreHorizontal,
  Menu,
  Share2,
  User,
  Star,
  Pen,
  Tag,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

/* ---------- Types ---------- */

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

/* ---------- Base Button ---------- */

function IconButton({
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

/* ---------- Navigation ---------- */

export function BackButton(props: ButtonProps) {
  const router = useRouter();
  return (
    <IconButton
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        router.back();
      }}
    >
      <ArrowLeft size={18} />
    </IconButton>
  );
}

export function ForwardButton(props: ButtonProps) {
  const router = useRouter();
  return (
    <IconButton
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        router.forward();
      }}
    >
      <ArrowRight size={18} />
    </IconButton>
  );
}

export function HomeButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Home size={18} />
    </IconButton>
  );
}

/* ---------- Actions ---------- */

export function AddButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Plus size={18} />
    </IconButton>
  );
}

export function MinusButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Minus size={18} />
    </IconButton>
  );
}

export function SaveButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Save size={18} />
    </IconButton>
  );
}

export function ShareButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Share2 size={18} />
    </IconButton>
  );
}

/* ---------- UI / Utility ---------- */

export function CartButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <ShoppingCart size={18} />
    </IconButton>
  );
}

export function SearchButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Search size={18} />
    </IconButton>
  );
}

export function MenuButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Menu size={18} />
    </IconButton>
  );
}

export function MoreButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <MoreHorizontal size={18} />
    </IconButton>
  );
}

/* ---------- User / Social ---------- */

export function ProfileButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <User size={18} />
    </IconButton>
  );
}

export function StarButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Star size={18} />
    </IconButton>
  );
}

export function WriteButton(props: ButtonProps) {
  return (
    <IconButton {...props}>
      <Pen size={18} />
    </IconButton>
  );
}

/* ---------- Raw Icons (non-button use) ---------- */

export const Icons = {
  tag: Tag,
  settings: Settings,
};
