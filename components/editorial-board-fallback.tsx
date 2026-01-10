import Image from "next/image"

export function EditorialBoardFallback() {
  return (
    <div className="p-4 md:p-6">
      <p className="mb-3 text-sm md:text-base text-muted-foreground">
        When the database entries are unavailable, use this snapshot as a reference for the Editorial Board.
      </p>
      <div className="rounded-md border bg-card">
        <Image
          src="/images/editorial-board-legacy.png"
          alt="Editorial Board legacy snapshot"
          width={1200}
          height={610}
          className="w-full h-auto rounded-md"
          priority={false}
        />
      </div>
    </div>
  )
}
