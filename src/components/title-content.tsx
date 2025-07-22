"use client";

import { Button } from "./ui/button";

export const TitleContent = ({
  title,
  btnText,
  btnOnClick,
}: {
  title: string;
  btnText?: string;
  btnOnClick?: () => void;
}) => {
  return (
    <div className="bg-muted/70 border-b p-4 flex items-center justify-between gap-5">
      <h1 className="text-xl font-semibold">{title}</h1>
      {btnOnClick && <Button onClick={btnOnClick}>{btnText}</Button>}
    </div>
  );
};
