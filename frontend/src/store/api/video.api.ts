import type {
  IVideoProps,
  IVideoPaginationProps,
  IThumbnailProps,
} from "@/interface"
import { apiBaseQuery } from "@/utils/api.utils"
import { createApi } from "@reduxjs/toolkit/query/react"

const videoApi = createApi({
  baseQuery: apiBaseQuery,
  reducerPath: "videoApi",
  tagTypes: ["videoApi"],
  endpoints: ({ query, mutation }) => ({
    getVideos: query<
      {
        data: {
          videos: IVideoProps[]
          pagination: IVideoPaginationProps
        }
      },
      {
        search: string
        tag: string
        page: string
        limit: string
      }
    >({
      query: ({ limit, page, search, tag }) => {
        return {
          url: "/video",
          params: {
            search,
            tag,
            page,
            limit,
          },
        }
      },
      providesTags: ["videoApi"],
    }),
    getVideoById: query<{ data: IVideoProps }, { id: string }>({
      query: ({ id }) => `/video/${id}`,
      providesTags: ["videoApi"],
    }),
    uploadVideo: mutation<
      {
        data: {
          message: string
          video: IVideoProps
        }
      },
      {
        title: string
        description: string
        tags: string
        video: File
      }
    >({
      query: ({ title, description, tags, video }) => {
        const formData = new FormData()

        formData.append("title", title)
        formData.append("description", description)
        formData.append("tags", tags)
        formData.append("video", video)

        return {
          url: "/video",
          method: "POST",
          body: formData,
        }
      },

      invalidatesTags: ["videoApi"],
    }),
    generateThumnail: mutation<
      { data: IThumbnailProps[] },
      { videoId: string }
    >({
      query: ({ videoId }) => {
        return {
          url: `/video/${videoId}/thumbnails/generate`,
          method: "POST",
        }
      },
      invalidatesTags: ["videoApi"],
    }),
    setThumbnailPrimary: mutation<
      {
        data: {
          message: string
          thumbs: IThumbnailProps[]
        }
      },
      {
        videoId: string
        thumbnailUrl: string
      }
    >({
      query: ({ videoId, thumbnailUrl }) => ({
        url: `/video/${videoId}/thumbnails/select`,
        body: {
          thumbnailUrl,
        },
        method: "POST",
      }),
      invalidatesTags: ["videoApi"],
    }),
    deleteVideo: mutation<
      {
        data: string
      },
      { videoId: string }
    >({
      query: ({ videoId }) => ({
        url: `/video/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videoApi"],
    }),
  }),
})

export const {
  reducer: videoApiReducer,
  middleware: videoApiMiddleware,

  useGetVideosQuery,
  useLazyGetVideosQuery,
  useGetVideoByIdQuery,
  useLazyGetVideoByIdQuery,
  useUploadVideoMutation,
  useGenerateThumnailMutation,
  useSetThumbnailPrimaryMutation,
  useDeleteVideoMutation,
} = videoApi
