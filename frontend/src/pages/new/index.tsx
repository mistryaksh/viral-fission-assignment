import { NewVideoForm } from "@/components/base/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { VideoPreview } from "@/components/base/video-preview"
import { useReduxErrorHandler } from "@/hooks/error.hooks"
import {
  useGenerateThumnailMutation,
  useSetThumbnailPrimaryMutation,
  useUploadVideoMutation,
} from "@/store/api/video.api"
import { MoveLeft, Sparkles } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { ThumbPreview } from "@/components/base/thumb-preview"
import { IThumbnailProps } from "@/interface"

export const NewVideoPage = () => {
  const [Upload, { isError, error, data, isSuccess, isLoading }] =
    useUploadVideoMutation()
  const [
    GenerateThumnail,
    {
      isError: isErrorThumnail,
      error: errorThumnail,
      isLoading: isLoadingThumnail,
      data: dataThumnail,
      isSuccess: isSuccessThumnail,
    },
  ] = useGenerateThumnailMutation()
  const [
    SetThumbnail,
    {
      isLoading: isLoadingSetThumbnail,
      isError: isErrorSetThumbnail,
      error: errorSetThumbnail,
      isSuccess: isSuccessSetThumbnail,
      data: dataSetThumbnail,
    },
  ] = useSetThumbnailPrimaryMutation()

  const navigate = useNavigate()

  const errorText = useReduxErrorHandler(isError, error)
  const thumbnailErrorText = useReduxErrorHandler(
    isErrorThumnail,
    errorThumnail
  )
  const thumbnailSetErrorText = useReduxErrorHandler(
    isErrorSetThumbnail,
    errorSetThumbnail
  )

  const [input, setInput] = useState<{
    title: string
    description: string
    tags: string
    video: File | null
  }>({
    title: "",
    description: "",
    tags: "",
    video: null,
  })

  useEffect(() => {
    if (isSuccessSetThumbnail) {
      toast.success(dataSetThumbnail.data.message)
    }
  }, [isSuccessSetThumbnail, dataSetThumbnail, navigate])

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.data.message)
    }
  }, [isSuccess, data])

  const clearInput = () => {
    setInput({
      title: "",
      description: "",
      tags: "",
      video: null,
    })
  }

  const onSubmit = () => {
    if (input.title === "") {
      toast.warning("Title is required")
    } else if (input.description === "") {
      toast.warning("Description is required")
    } else if (!input.video) {
      toast.warning("Video is required")
    } else {
      Upload({
        description: input.description,
        tags: input.tags,
        title: input.title,
        video: input.video as File,
      })
        .unwrap()
        .then(() => {
          clearInput()
        })
    }
  }

  const onGenerateThumnail = useCallback(() => {
    if (data?.data.video) {
      GenerateThumnail({ videoId: data?.data.video._id })
    }
  }, [data, GenerateThumnail])

  const onSetPrimary = useCallback(
    async (thumbnailUrl: string) => {
      if (isSuccessThumnail) {
        await SetThumbnail({
          thumbnailUrl,
          videoId: data?.data.video._id as string,
        })
          .unwrap()
          .then(() => {
            clearInput()
          })
      } else {
        toast.error("Something went wrong")
      }
    },
    [isSuccessThumnail, SetThumbnail, data]
  )

  const thumbnails = !isSuccessSetThumbnail
    ? dataThumnail?.data
    : dataSetThumbnail?.data?.thumbs || []
  return (
    <div className="mt-10 space-y-10">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            clearInput()
            navigate(-1)
          }}
          variant="default"
          size="icon-lg"
        >
          <MoveLeft />
        </Button>
        <h1 className="text-xl capitalize">Upload video thumbnail</h1>
      </div>
      {!isSuccess && (
        <NewVideoForm
          errorText={errorText}
          input={input}
          setInput={setInput}
          clearInput={clearInput}
          isError={isError}
          isLoading={isLoading}
          navigate={navigate}
          onSubmit={onSubmit}
        />
      )}
      {isSuccess && !isSuccessThumnail && (
        <VideoPreview
          clearInput={clearInput}
          isErrorThumnail={isErrorThumnail}
          navigate={navigate}
          onGenerateThumnail={onGenerateThumnail}
          thumbnailErrorText={thumbnailErrorText}
          video={data?.data.video}
          isLoadingThumnail={isLoadingThumnail}
        />
      )}
      {isSuccessThumnail && (
        <div className="mx-auto rounded-md border p-6 md:max-w-2xl">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <Sparkles />
              <h6 className="text-xl">Congratulations Thumbnail Generated</h6>
            </div>
            <p className="text-gray-500">
              Now simply config your video thumbnail
            </p>
          </div>
          {isErrorSetThumbnail && (
            <Alert variant="destructive">
              <AlertTitle>Failed to set thumbnail</AlertTitle>
              <AlertDescription>{thumbnailSetErrorText}</AlertDescription>
            </Alert>
          )}
          <ThumbPreview
            isLoadingSetThumbnail={isLoadingSetThumbnail}
            onSetPrimary={onSetPrimary}
            thumbnails={thumbnails as IThumbnailProps[]}
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                clearInput()
                navigate("/")
              }}
            >
              Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
