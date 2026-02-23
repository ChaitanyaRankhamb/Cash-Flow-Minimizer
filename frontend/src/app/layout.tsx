import { ThemeProvider } from "@/lib/theme";
import "@/app/globals.css";
import { UserProvider } from "@/context/UserContext";
import { GroupProvider } from "@/context/GroupContext";
import { ExpenseProvider } from "@/context/expenseContext";
import { SuggestionProvider } from "@/context/SuggestionContext";
import { NetBalanceProvider } from "@/context/netBalance.Context";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <GroupProvider>
              <ExpenseProvider>
                <SuggestionProvider>
                  <NetBalanceProvider>
                  {children}
                  </NetBalanceProvider>
                </SuggestionProvider>
              </ExpenseProvider>
            </GroupProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
