import { ErrorCard } from "@/components/base/error"
import { VideoPagination } from "@/components/base/pagination"
import { VideoSearchControl } from "@/components/base/search-control"
import { EmptyVideo, VideoList } from "@/components/base/video-list"
import { useReduxErrorHandler } from "@/hooks/error.hooks"
import type { IVideoPaginationProps, IVideoProps } from "@/interface"
import { useGetVideosQuery } from "@/store/api/video.api"
import { useEffect, useState } from "react"

export const HomePage = () => {
  const [search, setSearch] = useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isError, error, isLoading } = useGetVideosQuery({
    limit: "8",
    page: page.toString(),
    search: debouncedSearch,
    tag: "",
  })

  const errorText = useReduxErrorHandler(isError, error)

  const pagination: IVideoPaginationProps = data?.data
    ?.pagination as IVideoPaginationProps

  return (
    <div className="mt-10 space-y-10">
      {/* errors */}
      {isError && <ErrorCard errorText={errorText} />}

      {/* search & filter */}
      {(data?.data.videos as IVideoProps[])?.length > 2 && (
        <VideoSearchControl search={search} setSearch={setSearch} />
      )}

      {/* video list */}
      {(data?.data?.videos as IVideoProps[])?.length > 0 && (
        <VideoList
          videos={data?.data?.videos as IVideoProps[]}
          isLoading={isLoading}
        />
      )}
      {data?.data.videos.length === 0 && <EmptyVideo />}

      {/* video pagination */}
      {(pagination?.total as number) > 10 && (
        <VideoPagination
          page={page}
          pagination={pagination}
          setPage={setPage}
        />
      )}
    </div>
  )
}
