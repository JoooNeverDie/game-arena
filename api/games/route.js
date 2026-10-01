import { games } from "../../games-data";

export function GET() {
  return Response.json({
    ok: true,
    total: games.length,
    games: games.map(({ id, title, slug, category, level, author, age, views, likes, modes, tags, description, createdAt }) => ({
      id,
      title,
      slug,
      category,
      level,
      author,
      age,
      views,
      likes,
      modes,
      tags,
      description,
      createdAt
    }))
  });
}
