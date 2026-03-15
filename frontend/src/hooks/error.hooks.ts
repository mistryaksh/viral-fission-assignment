import { useMemo } from "react"

type ValidationErrorItem = {
  message?: string
}

type ErrorShape = {
  data?: {
    message?: string | ValidationErrorItem[]
  }
  message?: string
}

export const useReduxErrorHandler = (
  isError: boolean,
  error: ErrorShape | unknown | any
) => {
  return useMemo(() => {
    if (!isError) return ""

    const backendMessage = error?.data?.message

    if (Array.isArray(backendMessage)) {
      return (
        backendMessage
          .map((item) => item?.message)
          .filter(Boolean)
          .join(", ") || "Validation failed"
      )
    }

    if (typeof backendMessage === "string") {
      return backendMessage
    }

    if (typeof error?.message === "string") {
      return error.message
    }

    return "Something went wrong. Please try again!"
  }, [isError, error])
}
