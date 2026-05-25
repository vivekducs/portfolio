export async function GET() {
  try {
    const res = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs/solved", {
      next: { revalidate: 3600 },
    });

    let solved = {};
    if (res.ok) {
      const data = await res.json();
      solved = {
        solvedProblem: data.solvedProblem || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
      };
    }

    const contestRes = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs/contest", {
      next: { revalidate: 3600 },
    });

    let contest = {};
    if (contestRes.ok) {
      const data = await contestRes.json();
      contest = {
        contestRating: Math.round(data.contestRating || 0),
        contestGlobalRanking: data.contestGlobalRanking || 0,
        contestTopPercentage: data.contestTopPercentage || 0,
      };
    }

    const calRes = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs/calendar", {
      next: { revalidate: 3600 },
    });
    
    let calendar = {};
    if (calRes.ok) {
      const data = await calRes.json();
      if (data.submissionCalendar) {
        calendar = JSON.parse(data.submissionCalendar);
      }
    }

    const badgeRes = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs/badges", {
      next: { revalidate: 3600 },
    });

    let badges = [];
    if (badgeRes.ok) {
      const data = await badgeRes.json();
      if (data.badges) {
        badges = data.badges; // Get all badges
      }
    }

    const profileRes = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs", {
      next: { revalidate: 3600 },
    });
    
    let profile = {};
    if (profileRes.ok) {
      const data = await profileRes.json();
      profile = {
        ranking: data.ranking || 0,
        reputation: data.reputation || 0,
      };
    }

    return Response.json({ ...solved, ...contest, ...profile, calendar, badges });
  } catch (error) {
    return Response.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
  }
}
