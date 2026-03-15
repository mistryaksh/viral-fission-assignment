import { ErrorCard } from "@/components/base/error"
import { Button } from "@/components/ui/button"
import { useReduxErrorHandler } from "@/hooks/error.hooks"
import {
  useDeleteVideoMutation,
  useGenerateThumnailMutation,
  useLazyGetVideoByIdQuery,
  useSetThumbnailPrimaryMutation,
} from "@/store/api/video.api"
import {
  Bookmark,
  Check,
  Loader2,
  MoveLeft,
  Sparkles,
  Trash2,
} from "lucide-react"
import moment from "moment"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

export const VideoDetails = () => {
  const params = useParams()
  const videoId = params.id
  const [GetVideo, { data, isError, error, isLoading, isSuccess }] =
    useLazyGetVideoByIdQuery()
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
  const [
    GenerateThumnail,
    {
      isError: isErrorThumnail,
      error: errorThumnail,
      isLoading: isLoadingThumnail,
      isSuccess: isSuccessThumnail,
    },
  ] = useGenerateThumnailMutation()
  const [
    Delete,
    {
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
      data: deleteData,
    },
  ] = useDeleteVideoMutation()

  const thumbnailSetErrorText = useReduxErrorHandler(
    isErrorSetThumbnail,
    errorSetThumbnail
  )
  const thumbnailErrorText = useReduxErrorHandler(
    isErrorThumnail,
    errorThumnail
  )
  const deleteErrorText = useReduxErrorHandler(isDeleteError, deleteError)

  const navigate = useNavigate()

  const videoUrl = data?.data.videoUrl
  const video = data?.data
  const errorText = useReduxErrorHandler(isError, error)

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData.data)
      navigate("/", {
        replace: true,
      })
    }
  }, [isDeleteSuccess, deleteData, navigate])

  useEffect(() => {
    if (isSuccessThumnail) {
      toast.success(`Thumbnail generated successfully`)
    }
  }, [isSuccessThumnail])

  useEffect(() => {
    if (isSuccessSetThumbnail) {
      toast.success(dataSetThumbnail.data.message)
    }
  }, [isSuccessSetThumbnail, dataSetThumbnail, navigate])

  useEffect(() => {
    if (videoId) {
      GetVideo({ id: videoId })
    }
  }, [videoId, GetVideo])

  const onGenerateThumnail = useCallback(() => {
    if (video) {
      GenerateThumnail({ videoId: video._id })
    }
  }, [video, GenerateThumnail])

  const onSetPrimary = useCallback(
    async (thumbnailUrl: string) => {
      if (isSuccess) {
        await SetThumbnail({
          thumbnailUrl,
          videoId: video?._id as string,
        }).unwrap()
      } else {
        toast.error("Something went wrong")
      }
    },
    [isSuccess, SetThumbnail, video]
  )

  const onDelete = async (id: string) => {
    await Delete({
      videoId: id,
    })
  }
  return (
    <div>
      {isError && <ErrorCard errorText={errorText} />}
      {isErrorSetThumbnail && <ErrorCard errorText={thumbnailSetErrorText} />}
      {isErrorThumnail && <ErrorCard errorText={thumbnailErrorText} />}
      {isDeleteError && <ErrorCard errorText={deleteErrorText} />}

      {isLoading && (
        <div className="flex h-55 flex-col items-center justify-center">
          <Loader2 className="animate-spin" />
          <p>Fetching details...</p>
        </div>
      )}
      {!isLoading && (
        <div className="mt-10 space-y-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Button
                  onClick={() => navigate(-1)}
                  variant="default"
                  size="icon-lg"
                >
                  <MoveLeft />
                </Button>
                <h6>Video Details</h6>
              </div>
              <video src={videoUrl} controls className="w-[80vh] rounded-lg">
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-10">
              <h6 className="text-2xl font-semibold">{video?.title}</h6>
              <p className="leading-snug text-gray-500">{video?.description}</p>
              <p className="text-right text-sm text-gray-500">
                {moment(video?.createdAt).format("lll")}
              </p>
              <div className="">
                <div className="flex items-center gap-0">
                  <Bookmark className="size-5" />
                  <h6 className="text-sm">Tags :</h6>
                </div>
                <div className="my-2 flex flex-wrap items-center gap-2">
                  {video?.tags.map((tag) => (
                    <span key={tag} className="truncate text-sm text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              {!video?.thumbnails.length && (
                <Button
                  onClick={onGenerateThumnail}
                  disabled={isLoadingThumnail}
                >
                  {isLoadingThumnail ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles />
                  )}{" "}
                  Generate Thumbnails
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => onDelete(video?._id as string)}
              >
                {isDeleteLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
                Delete
              </Button>
            </div>
          </div>
          {video?.thumbnails.length !== 0 && (
            <div>
              <h6>Thumbnails :</h6>
              <div className="grid grid-cols-6 gap-4">
                {video?.thumbnails.map((thumbnail, index) => (
                  <div className="relative" key={index}>
                    <img
                      key={index}
                      className="my-3 h-33 w-full rounded-md object-cover"
                      src={thumbnail.url}
                      alt={video?.title}
                    />
                    <div className="absolute right-2 bottom-11 flex items-center gap-3">
                      <Button
                        variant={thumbnail.isPrimary ? "default" : "outline"}
                        size="icon-sm"
                        className="cursor-pointer"
                        onClick={() => onSetPrimary(thumbnail.url)}
                      >
                        {isLoadingSetThumbnail ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Check />
                        )}
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      {thumbnail.score}/100
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
