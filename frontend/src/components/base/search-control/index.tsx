import { Input } from "@/components/ui/input"
import type { FC } from "react"

export const VideoSearchControl: FC<{
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}> = ({ search, setSearch }) => {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex-1">
        <Input
          value={search}
          onChange={(prop) => setSearch(prop.target.value)}
          placeholder="Search by Videos, tags..."
        />
      </div>
    </div>
  )
}
