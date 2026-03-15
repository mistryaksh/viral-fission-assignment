import type { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { IVideoProps } from "@/interface"
import { MoveRight } from "lucide-react"
import moment from "moment"
import { Link } from "react-router-dom"

export const VideoCard: FC<{ video: IVideoProps }> = ({ video }) => {
  const thumbnail =
    video?.thumbnails?.find((t) => t?.isPrimary)?.url ||
    "https://placehold.co/600x400/EEE/31343C"
  return (
    <Card className="group overflow-hidden rounded-md p-0">
      <CardContent className="relative px-0">
        <img
          className="h-55 w-full object-cover"
          src={thumbnail}
          alt={video.title}
        />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background/90 via-transparent/90 to-transparent" />
      </CardContent>

      <CardHeader>
        <div className="flex flex-col items-start">
          <Link to={`/${video._id}`}>
            <CardTitle className="cursor-pointer group-hover:underline">
              {video.title}
            </CardTitle>
          </Link>
          <p className="w-full truncate leading-loose text-gray-500">
            {video.description}
          </p>
        </div>

        <CardDescription>
          <div className="my-2 flex flex-wrap items-center gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="truncate rounded-sm text-xs text-gray-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardDescription>

        <CardAction />
      </CardHeader>

      <CardFooter className="flex items-center justify-between bg-transparent">
        <p className="text-xs text-gray-500">
          {moment(video.createdAt).format("lll")}
        </p>

        <Link to={`/${video._id}`}>
          <Button variant="ghost" size="icon-sm">
            <MoveRight className="size-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export const VideoCardSkeleton = () => {
  return (
    <Card className="rounded-md p-0">
      <CardContent className="px-0">
        <Skeleton className="h-55 w-full rounded-md" />
      </CardContent>

      <CardHeader className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>

      <CardFooter className="flex justify-end">
        <Skeleton className="h-9 w-9 rounded-md" />
      </CardFooter>
    </Card>
  )
}
