import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    ListFilter,
    MoreVertical,
    Truck,
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button, buttonVariants } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
  } from "@/components/ui/pagination"
  import { Progress } from "@/components/ui/progress"
  import { Separator } from "@/components/ui/separator"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  
  export function Verify() {
    return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div>
          <Card
            className="overflow-hidden"
          >
            <CardContent className="p-6 text-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                    Verify your email to start creating awesome stuff!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                    Check your spam folder if you can't find the email.
                    </p>
                    <div className="mt-6">
                    <a
                        href="/account/login"
                        className={buttonVariants({ variant: 'default' })}
                    >
                        Resend Verification Email
                    </a>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
    </main>
    )
  }
  