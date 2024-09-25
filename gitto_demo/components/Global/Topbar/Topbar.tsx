import { PropsWithChildren } from "react";

export const Topbar: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="w-full h-20 overflow-x-hidden">{children}</div>
);
