import { Sheet } from "@/components/ui/sheet"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Navbar } from "./Navbar"
import { Header } from "./Header"
import { Outlet } from "react-router-dom"
import type { Models } from "node-appwrite"
import { Verify } from "./pages/Verify"

export type DashboardProps = {
  user: Models.User<Models.Preferences>
}

export function DashboardLayout(props: DashboardProps) {
  const {user} = props;
  const role = user.emailVerification ? "user" : "guest";
  return (
    <TooltipProvider>
      <Sheet>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Navbar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            {user.emailVerification && (<Outlet />)}
            {!user.emailVerification && (<Verify />)}
          </div>
        </div>
      </Sheet>
    </TooltipProvider>
  )
}
