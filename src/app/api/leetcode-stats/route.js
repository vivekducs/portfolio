export async function GET() {
  try {
    const query = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          topPercentage
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username: "AVPXM8" },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("LeetCode API failed");

    const json = await res.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    const matchedUser = json.data?.matchedUser;
    const contestRanking = json.data?.userContestRanking;

    if (!matchedUser) throw new Error("User not found");

    const submissions = matchedUser.submitStats.acSubmissionNum;
    const getCount = (diff) => submissions.find((s) => s.difficulty === diff)?.count || 0;

    return Response.json({
      solvedProblem: getCount("All"),
      easySolved: getCount("Easy"),
      mediumSolved: getCount("Medium"),
      hardSolved: getCount("Hard"),
      contestRating: contestRanking ? Math.round(contestRanking.rating) : 1664,
      contestGlobalRanking: contestRanking ? contestRanking.globalRanking : 0,
      contestTopPercentage: contestRanking ? contestRanking.topPercentage : 16.41,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
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
