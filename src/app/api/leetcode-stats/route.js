export async function GET() {
  try {
    // Using alfa-leetcode-api public proxy
    const res = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs/solved", {
      next: { revalidate: 3600 },
    });

    let solved = { solvedProblem: 500, easySolved: 210, mediumSolved: 240, hardSolved: 50 };
    if (res.ok) {
      const data = await res.json();
      solved = {
        solvedProblem: data.solvedProblem || 500,
        easySolved: data.easySolved || 210,
        mediumSolved: data.mediumSolved || 240,
        hardSolved: data.hardSolved || 50,
      };
    }

    const contestRes = await fetch("https://alfa-leetcode-api.onrender.com/vivekducs/contest", {
      next: { revalidate: 3600 },
    });

    let contest = { contestRating: 1664, contestGlobalRanking: 0 };
    if (contestRes.ok) {
      const data = await contestRes.json();
      contest = {
        contestRating: Math.round(data.contestRating || 1664),
        contestGlobalRanking: data.contestGlobalRanking || 0,
        contestTopPercentage: data.contestTopPercentage || 16.41,
      };
    }

    return Response.json({ ...solved, ...contest });
  } catch {
    return Response.json({
      solvedProblem: 500,
      easySolved: 210,
      mediumSolved: 240,
      hardSolved: 50,
      contestRating: 1664,
      contestGlobalRanking: 0,
      contestTopPercentage: 16.41,
    });
  }
}
