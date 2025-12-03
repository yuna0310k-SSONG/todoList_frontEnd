"use client";

import React from "react";

type Props = {
  loading: boolean;
  error?: string | null;
  loadingText?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Status({ loading, error, loadingText = "Loading…", className, children }: Props) {
  if (error) return <p className={className ? className : "text-sm text-red-500"}>{error}</p>;
  if (loading) return <p className={className ? className : "text-sm opacity-70"}>{loadingText}</p>;
  return <>{children}</>;
}
