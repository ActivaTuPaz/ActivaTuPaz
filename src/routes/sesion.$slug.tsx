import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sesion/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/sesiones/$slug",
      params: { slug: params.slug },
    });
  },
});
