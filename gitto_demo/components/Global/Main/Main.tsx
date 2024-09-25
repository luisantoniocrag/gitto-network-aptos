import { PropsWithChildren } from "react";
import { Menu } from "../Menu/Menu";

export const Main: React.FC<PropsWithChildren> = ({ children }) => (
  <main className="h-screen min-w-screen w-screen max-w-[430px] flex flex-col flex-1 relative">
    {children}
    <Menu />
  </main>
);
