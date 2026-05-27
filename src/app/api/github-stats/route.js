export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/vivekducs", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "VK-Portfolio",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("GitHub API failed");
    const data = await res.json();

    let topLanguages = [];
    let contributions = [];
    let githubDetails = {
      totalPRs: 0,
      totalIssues: 0,
      totalStars: 0,
      totalContributions: 0,
      totalRepos: 0,
    };

    if (process.env.GITHUB_PAT) {
      const now = new Date();
      const oneYearAgo = new Date(now); oneYearAgo.setFullYear(now.getFullYear() - 1);
      const twoYearsAgo = new Date(now); twoYearsAgo.setFullYear(now.getFullYear() - 2);
      const twoYearsAgoDateStr = twoYearsAgo.toISOString().split('T')[0];

      const query = `
        query {
          user(login: "vivekducs") {
            repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR], orderBy: {field: UPDATED_AT, direction: DESC}) {
              totalCount
              nodes {
                stargazerCount
                isFork
                isPrivate
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  edges { size node { name } }
                }
              }
            }
            year0: contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${now.toISOString()}") {
              restrictedContributionsCount
              contributionCalendar {
                totalContributions
                weeks { contributionDays { contributionCount date } }
              }
            }
            year1: contributionsCollection(from: "${twoYearsAgo.toISOString()}", to: "${oneYearAgo.toISOString()}") {
              restrictedContributionsCount
              contributionCalendar {
                totalContributions
                # no need for weeks here since we only show 1 year heatmap
              }
            }
          }
          searchPRs: search(query: "author:vivekducs is:pr created:>=${twoYearsAgoDateStr}", type: ISSUE, first: 0) {
            issueCount
          }
          searchIssues: search(query: "author:vivekducs is:issue created:>=${twoYearsAgoDateStr}", type: ISSUE, first: 0) {
            issueCount
          }
        }
      `;
      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 },
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const userNode = gqlData?.data?.user;
        if (userNode) {
          const allWeeks = [
            ...(userNode.year0?.contributionCalendar?.weeks || [])
          ];

          const daysMap = new Map();
          allWeeks.forEach(week => {
            week.contributionDays.forEach(day => {
              daysMap.set(day.date, day.contributionCount);
            });
          });

          const sortedDates = Array.from(daysMap.keys()).sort();

          contributions = [];
          let currentWeek = new Array(7).fill(null);

          sortedDates.forEach(dateStr => {
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();
            currentWeek[dayOfWeek] = daysMap.get(dateStr);

            if (dayOfWeek === 6) {
              contributions.push(currentWeek);
              currentWeek = new Array(7).fill(null);
            }
          });
          if (currentWeek.some(d => d !== null)) {
            contributions.push(currentWeek);
          }

          const calendarTotal =
            (userNode.year0?.contributionCalendar?.totalContributions || 0) +
            (userNode.year1?.contributionCalendar?.totalContributions || 0);

          const restricted =
            (userNode.year0?.restrictedContributionsCount || 0) +
            (userNode.year1?.restrictedContributionsCount || 0);

          githubDetails.totalContributions = calendarTotal + restricted;
          githubDetails.totalPRs = gqlData?.data?.searchPRs?.issueCount || 0;
          githubDetails.totalIssues = gqlData?.data?.searchIssues?.issueCount || 0;

          githubDetails.totalRepos = userNode.repositories?.totalCount || 0;

          const reposList = userNode.repositories?.nodes || [];
          githubDetails.totalStars = reposList.reduce((acc, repo) => acc + (repo.stargazerCount || 0), 0);

          // Compute languages from ALL repos (private, forked, and public)
          const langCount = {};
          reposList.forEach(repo => {
            const langs = repo.languages?.edges || [];
            if (langs.length > 0) {
              // Take the primary language of each repo
              const primaryLang = langs[0].node.name;
              langCount[primaryLang] = (langCount[primaryLang] || 0) + 1;
            }
          });

          topLanguages = Object.entries(langCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang, count]) => ({ lang, count }));
        }
      }
    }

    return Response.json(
      {
        public_repos: data.public_repos || 0,
        followers: data.followers || 0,
        following: data.following || 0,
        avatar_url: data.avatar_url,
        bio: data.bio,
        topLanguages,
        contributions,
        githubDetails
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    return Response.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
