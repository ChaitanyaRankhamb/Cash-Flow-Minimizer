import { toast } from "sonner"

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export function showToast(
  title: string,
  description: string,
  position: ToastPosition = "bottom-right",
) {
  toast(title, {
    description,
    position,
  })
}
