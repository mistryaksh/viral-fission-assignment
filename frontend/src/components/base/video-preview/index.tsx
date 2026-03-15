import { IVideoProps } from "@/interface"
import { Bookmark, Sparkles } from "lucide-react"
import { FC } from "react"
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert"
import { Button } from "../../ui/button"

export const VideoPreview: FC<{
  video: IVideoProps
  isLoadingThumnail: boolean
  isErrorThumnail: boolean
  thumbnailErrorText: string
  onGenerateThumnail: () => void
  clearInput: () => void
  navigate: (path: string) => void
}> = ({
  video,
  isErrorThumnail,
  isLoadingThumnail,
  thumbnailErrorText,
  clearInput,
  onGenerateThumnail,
  navigate,
}) => {
  return (
    <div className="mx-auto rounded-md border p-6 md:max-w-2xl">
      Video is ready to generate thumbnail
      <video src={video.videoUrl} controls className="w-[80vh] rounded-lg">
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-start">
        <h6 className="text-xl font-semibold">{video.title}</h6>
        <p>{video.description}</p>
        <div className="my-2 flex items-center gap-5">
          <div className="flex items-center gap-0">
            <Bookmark className="size-5" />
            <h6 className="text-sm">Tags :</h6>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {video?.tags.map((tag) => (
              <span key={tag} className="truncate text-sm text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          {isErrorThumnail && (
            <Alert variant="destructive">
              <AlertTitle>Failed to create thumbnail</AlertTitle>
              <AlertDescription>{thumbnailErrorText}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex w-full justify-end">
          <Button
            onClick={() => {
              clearInput()
              navigate("/")
            }}
            variant="ghost"
          >
            Skip
          </Button>
          <Button onClick={onGenerateThumnail} disabled={isLoadingThumnail}>
            {isLoadingThumnail && <>Generating Thumbnail...</>}
            {!isLoadingThumnail && (
              <>
                <Sparkles /> Generate Thumbnail
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
