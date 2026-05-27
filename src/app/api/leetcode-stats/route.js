const LEETCODE_API = "https://alfa-leetcode-api.onrender.com/vivekducs";
const FETCH_OPTIONS = { next: { revalidate: 3600 } };

export async function GET() {
  try {
    // Parallelize all 5 API calls (was sequential — 5x slower)
    const [solvedRes, contestRes, calRes, badgeRes, profileRes] = await Promise.allSettled([
      fetch(`${LEETCODE_API}/solved`, FETCH_OPTIONS).then((r) => r.json()),
      fetch(`${LEETCODE_API}/contest`, FETCH_OPTIONS).then((r) => r.json()),
      fetch(`${LEETCODE_API}/calendar`, FETCH_OPTIONS).then((r) => r.json()),
      fetch(`${LEETCODE_API}/badges`, FETCH_OPTIONS).then((r) => r.json()),
      fetch(`${LEETCODE_API}`, FETCH_OPTIONS).then((r) => r.json()),
    ]);

    const solved = solvedRes.status === "fulfilled" ? {
      solvedProblem: solvedRes.value.solvedProblem || 0,
      easySolved: solvedRes.value.easySolved || 0,
      mediumSolved: solvedRes.value.mediumSolved || 0,
      hardSolved: solvedRes.value.hardSolved || 0,
    } : {};

    const contest = contestRes.status === "fulfilled" ? {
      contestRating: Math.round(contestRes.value.contestRating || 0),
      contestGlobalRanking: contestRes.value.contestGlobalRanking || 0,
      contestTopPercentage: contestRes.value.contestTopPercentage || 0,
    } : {};

    let calendar = {};
    if (calRes.status === "fulfilled" && calRes.value.submissionCalendar) {
      calendar = JSON.parse(calRes.value.submissionCalendar);
    }

    const badges = badgeRes.status === "fulfilled" && badgeRes.value.badges
      ? badgeRes.value.badges
      : [];

    const profile = profileRes.status === "fulfilled" ? {
      ranking: profileRes.value.ranking || 0,
      reputation: profileRes.value.reputation || 0,
    } : {};

    return Response.json(
      { ...solved, ...contest, ...profile, calendar, badges },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    return Response.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
  }
}
