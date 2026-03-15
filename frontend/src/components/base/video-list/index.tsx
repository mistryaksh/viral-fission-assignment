import type { FC } from "react"
import { VideoCard, VideoCardSkeleton } from "../video"
import type { IVideoProps } from "@/interface"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const VideoList: FC<{
  isLoading?: boolean
  videos: IVideoProps[]
}> = ({ isLoading, videos }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))
        : videos.map((video) => <VideoCard key={video._id} video={video} />)}
    </div>
  )
}

export const EmptyVideo = () => {
  const navigate = useNavigate()

  return (
    <Empty className="h-85 border">
      <EmptyHeader>
        <div className="flex items-center gap-3">
          <EmptyMedia variant="icon">
            <Video />
          </EmptyMedia>
          <EmptyTitle className="text-lg">No Video Yet</EmptyTitle>
        </div>
        <EmptyDescription>
          You haven&apos;t uploaded any videos yet. Get started by creating your
          first video.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => navigate("/new")}>Create Video</Button>
      </EmptyContent>
    </Empty>
  )
}
