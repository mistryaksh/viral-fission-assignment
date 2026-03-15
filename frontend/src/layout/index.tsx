import { Button } from "@/components/ui/button"
import { Grid, Plus } from "lucide-react"
import type { FC } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export const Layout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isNew = location.pathname === "/new"
  return (
    <main>
      <nav className="rounded-b-md bg-primary/30 px-3 py-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h6 className="text-lg font-semibold">Thumbnail Generator</h6>

          {!isNew ? (
            <Button
              onClick={() => navigate("/new")}
              variant="default"
              size="lg"
            >
              <Plus /> Video
            </Button>
          ) : (
            <Button onClick={() => navigate("/")} variant="default" size="lg">
              <Grid /> List
            </Button>
          )}
        </div>
      </nav>
      <section className="container mx-auto p-3">
        <Outlet />
      </section>
    </main>
  )
}
