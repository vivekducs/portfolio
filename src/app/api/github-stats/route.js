export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/AVPXM8", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "VK-Portfolio",
      },
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    if (!res.ok) throw new Error("GitHub API failed");

    const data = await res.json();

    // Also fetch repos for language stats
    const reposRes = await fetch("https://api.github.com/users/AVPXM8/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "VK-Portfolio" },
      next: { revalidate: 3600 },
    });

    let topLanguages = [];
    if (reposRes.ok) {
      const repos = await reposRes.json();
      const langCount = {};
      repos.forEach((repo) => {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });
      topLanguages = Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang, count]) => ({ lang, count }));
    }

    return Response.json({
      public_repos: data.public_repos || 30,
      followers: data.followers || 0,
      following: data.following || 0,
      avatar_url: data.avatar_url,
      bio: data.bio,
      topLanguages,
    });
  } catch {
    // Fallback static data
    return Response.json({
      public_repos: 30,
      followers: 12,
      following: 18,
      topLanguages: [
        { lang: "JavaScript", count: 14 },
        { lang: "Python", count: 6 },
        { lang: "TypeScript", count: 4 },
        { lang: "HTML", count: 4 },
        { lang: "CSS", count: 3 },
      ],
    });
  }
}
