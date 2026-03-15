import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { bytesToSize } from "@/utils"
import { Loader2, Video } from "lucide-react"
import { type FC, SetStateAction, Dispatch } from "react"

export const NewVideoForm: FC<{
  errorText: string
  isError: boolean
  input: {
    title: string
    description: string
    tags: string
    video: File | null
  }
  setInput: Dispatch<
    SetStateAction<{
      title: string
      description: string
      tags: string
      video: File | null
    }>
  >
  clearInput: () => void
  navigate: (path: string) => void
  onSubmit: () => void
  isLoading: boolean
}> = ({
  errorText,
  input,
  isError,
  setInput,
  clearInput,
  navigate,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="mx-auto rounded-md border p-6 md:max-w-2xl">
      <FieldSet>
        <FieldLegend>Create a new video</FieldLegend>
        <FieldDescription>This appears on list.</FieldDescription>
        {isError && <FieldError>{errorText}</FieldError>}
        <FieldGroup>
          <Field className="gap-0">
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              value={input.title}
              onChange={(e) =>
                setInput({
                  ...input,
                  title: e.target.value,
                })
              }
              id="title"
              placeholder="Video Title"
              className="rounded-sm"
            />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              value={input.description}
              onChange={(e) =>
                setInput({
                  ...input,
                  description: e.target.value,
                })
              }
              cols={8}
              id="description"
              placeholder="Your Description which explains about the video..."
              rows={8}
            />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <Input
              value={input.tags}
              onChange={(e) =>
                setInput({
                  ...input,
                  tags: e.target.value,
                })
              }
              id="tags"
              placeholder="Tags"
              className="rounded-sm"
            />
            <FieldDescription className="text-right">
              Seprate tags by comma
            </FieldDescription>
          </Field>
          <Field className="gap-0">
            {!input.video && (
              <FieldLabel htmlFor="video">Select Video</FieldLabel>
            )}
            {!input.video ? (
              <Input
                onChange={(e) => {
                  if (e.target.files) {
                    setInput({
                      ...input,
                      video: e.target.files[0],
                    })
                  }
                }}
                id="video"
                type="file"
              />
            ) : (
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-primary p-2 text-primary">
                    <Video />
                  </div>
                  <div className="gap-0!">
                    <h6 className="">{(input.video as File).name}</h6>
                    <p className="text-sm">{input.video.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <p className="text-sm text-gray-500">
                    {bytesToSize(input.video.size)}
                  </p>
                  <Button
                    onClick={() =>
                      setInput({
                        ...input,
                        video: null,
                      })
                    }
                    variant="destructive"
                    className="cursor-pointer"
                    size="xs"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            {!input.video && (
              <FieldDescription>Select a video to upload.</FieldDescription>
            )}{" "}
          </Field>
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => {
                clearInput()
                navigate("/")
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} variant="default" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
