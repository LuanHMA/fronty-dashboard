import Image from "next/image";
import { MobileMenu } from "./mobile-menu";
import { PageTitle } from "./page-title";
import Logo from "@/assets/logo.png";
import UserMenu from "./user-menu";
export function Header() {
  return (
    <header className="border-b h-20 bg-neutral-0 ">
      <div className={`px-6 sm:px-8 flex justify-between items-center h-full`}>
        <PageTitle />

        <div className="flex items-center justify-between w-full sm:hidden">
          <Image src={Logo} alt="Fronty Digital" width={140} />

          <MobileMenu />
        </div>
        <div className="hidden sm:flex sm:items-center sm:gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
