import { Button } from "@/components/ui/button"
import { IThumbnailProps } from "@/interface"
import { Check } from "lucide-react"
import { FC } from "react"

export const ThumbPreview: FC<{
  thumbnails: IThumbnailProps[]
  isLoadingSetThumbnail: boolean
  onSetPrimary: (url: string) => void
}> = ({ thumbnails, isLoadingSetThumbnail, onSetPrimary }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {thumbnails &&
        thumbnails.map((thumb) => (
          <div key={thumb.url}>
            {thumb.url && (
              <img className="rounded-md" src={thumb.url} alt={thumb.url} />
            )}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-primary">Score {thumb.score} / 100</p>
              <Button
                size="sm"
                disabled={thumb.isPrimary || isLoadingSetThumbnail}
                onClick={() => {
                  onSetPrimary(thumb.url)
                }}
                variant={thumb.isPrimary ? "default" : "outline"}
              >
                <Check /> Set as primary
              </Button>
            </div>
          </div>
        ))}
    </div>
  )
}
