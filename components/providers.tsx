import { Toaster as Sonner } from "sonner"
import { AuthProvider } from "@/lib/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Sonner />
    </AuthProvider>
  )
}