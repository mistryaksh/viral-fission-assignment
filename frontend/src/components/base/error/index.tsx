import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { FC } from "react"

export const ErrorCard: FC<{ errorText: string }> = ({ errorText }) => {
  return (
    <Alert variant="destructive">
      <AlertTitle>Failed to get videos</AlertTitle>
      <AlertDescription>{errorText}</AlertDescription>
    </Alert>
  )
}
