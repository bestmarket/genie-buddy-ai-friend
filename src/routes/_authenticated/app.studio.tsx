import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/app/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Channel Studio" },
      { name: "description", content: "Produce videos in batches, in several languages." },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="rounded-lg border border-dashed border-border p-10 text-center">
      <h2 className="text-sm font-medium text-foreground">Studio is coming next</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This is where you'll pick languages, produce videos in batches and schedule them.
      </p>
    </div>
  );
}
