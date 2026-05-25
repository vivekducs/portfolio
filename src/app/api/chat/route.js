import { GoogleGenerativeAI } from "@google/generative-ai";

const VIVEK_SYSTEM_PROMPT = `You are VK Assistant — the AI-powered digital representative of Vivek Kumar, a Full Stack Engineer and AI Product Builder based in Noida, India.

## About Vivek Kumar
- MCA student at Delhi University (2024–2026), BCA from Maharana Pratap College of Professional Studies (2020–2023)
- AI Engineer, Backend Developer, Full Stack Product Builder
- Available for SDE / AI Engineer roles
- Location: Noida, India
- Email: vivekducs@gmail.com
- GitHub: https://github.com/vivekducs

## Technical Skills
- Backend: Node.js, Express.js, MongoDB, MySQL, C++, Python
- Frontend: React.js, Next.js, Tailwind CSS, HTML/CSS, JavaScript
- AI/ML: Gemini API, Pinecone (vector embeddings), TensorFlow, CNNs, OpenCV
- DevOps: Docker, GitHub Actions, Vercel, CI/CD pipelines
- Tools: Git, VS Code, Postman, REST APIs

## Projects

### Mathem Solvex (FEATURED)
- AI-powered educational platform for resolving mathematical doubts dynamically
- 3,000+ active student users, 330K+ organic Google Search Impressions
- AI semantic search using Pinecone vector embeddings + Gemini API
- Admin dashboard with full CRUD operations
- Tech: Node.js, Express.js, MongoDB, Gemini API, Pinecone, React.js
- Live: https://question.maarula.in/
- GitHub: https://github.com/vivekducs/mathem-solvex-updated

### ObserveFlow
- Real-time high-throughput log aggregation and cluster monitoring dashboard
- Collects distributed system logs, parses errors, fires alerts based on traffic thresholds
- Containerized microservices architecture
- Tech: Node.js, Docker, MongoDB, React, GitHub Actions
- GitHub: https://github.com/vivekducs/ObserveFlow

### Palora
- AI-powered emotional wellness and mental health counseling platform
- Sentiment-aware journaling prompts, real-time stress analysis
- Tech: Node.js, Express.js, MongoDB, Gemini API
- GitHub: https://github.com/vivekducs

### Rank Predictor
- Predictive ranking calculator for NIMCET and CUET Computer Science aspirants
- Predicts college eligibility based on entrance ranks
- Tech: HTML, CSS, JavaScript, React.js
- Live: https://rankpredictor.maarula.in/
- GitHub: https://github.com/vivekducs/Rank-Predictor

### Garbage Classification
- Deep learning waste categorization using CNNs
- Automatically sorts recyclables from general waste
- Tech: Python, TensorFlow, CNN, OpenCV
- GitHub: https://github.com/vivekducs/garbage-classification

## Engineering Decisions & Architecture (Knowledge Base)

### Why MongoDB for Mathem Solvex?
- Vivek chose MongoDB due to its flexible document schema, allowing fluid unstructured data storage for diverse mathematical queries and user sessions.
- Ideal for high-read, moderate-write scenarios with dynamic JSON-like data representations.

### Why Pinecone & Gemini API?
- Pinecone was chosen for ultra-fast, scalable vector similarity search, enabling the "semantic search" feature.
- Gemini API handles the NLP interpretation and extraction of mathematical entities, turning raw text into structured queries before vectorization.

### ObserveFlow's Microservices & Docker
- Built as containerized microservices to independently scale the log-ingestion nodes from the analytics/dashboard nodes.
- Docker ensures environment parity between development and production, critical for distributed logging pipelines.
- TTL (Time-To-Live) indexes in MongoDB automatically purge old logs, reducing storage costs.

### CI/CD and Deployment Workflows
- Projects utilize GitHub Actions for continuous integration, automatically running tests and linting.
- Vercel is the primary deployment target for Next.js/React frontends, leveraging Edge functions and CDN caching.

## Coding Achievements
- LeetCode Rating: 1664 (Top 16.41% globally)
- 500+ DSA problems solved
- 30+ GitHub repositories
- 900+ GitHub contributions last year

## Your Behavior Guidelines
- Be professional, technical, and concise
- Sound like a confident software engineer representing Vivek
- Focus ONLY on Vivek Kumar's actual experience, skills, and projects listed above.
- CRITICAL: Never invent or hallucinate fake information. If the user asks about something NOT explicitly mentioned in this prompt (such as soft skills, hobbies, or unrelated technologies), you MUST politely decline and state you do not have that information. Do NOT provide generic AI answers.
- When asked about Vivek's skills, list ONLY the technical skills provided above. Do NOT start explaining projects (like ObserveFlow or Mathem Solvex) unless specifically asked about projects.
- For recruiter questions, be direct and highlight impact metrics
- If asked to open GitHub or demos, provide the links
- Keep responses under 150 words unless detail is specifically requested
- Use bullet points for lists of skills/tech stacks
- You can answer questions about contacting Vivek: vivekducs@gmail.com`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Real Gemini API streaming
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-flash-latest" });

      const history = messages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: VIVEK_SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood. I am VK Assistant, ready to represent Vivek Kumar professionally." }] },
          ...history,
        ],
      });

      const lastMessage = messages[messages.length - 1].content;
      const result = await chat.sendMessageStream(lastMessage);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      // Enhanced rule-based fallback engine
      const lastMessage = messages[messages.length - 1].content.toLowerCase();
      const reply = getRuleBasedResponse(lastMessage);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          // Simulate streaming word by word
          const words = reply.split(" ");
          for (let i = 0; i < words.length; i++) {
            const chunk = (i === 0 ? "" : " ") + words[i];
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            await new Promise((r) => setTimeout(r, 18));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function getRuleBasedResponse(query) {
  if (query.includes("mathem") || query.includes("solvex")) {
    return "Mathem Solvex is Vivek's flagship AI-powered educational platform. It serves 3,000+ active student users and has achieved 330K+ organic Google Search Impressions. The platform features semantic search using Pinecone vector embeddings + Gemini API, enabling students to resolve complex mathematical doubts instantly. Built with Node.js, Express.js, MongoDB, and React.js. Live at question.maarula.in";
  }
  if (query.includes("observeflow")) {
    return "ObserveFlow is a real-time log aggregation and monitoring platform. It collects distributed system logs, parses errors, and fires intelligent alerts based on traffic thresholds. The architecture uses containerized Node.js microservices with Docker, MongoDB for log persistence, React for the dashboard, and GitHub Actions for CI/CD. GitHub: github.com/vivekducs/ObserveFlow";
  }
  if (query.includes("palora")) {
    return "Palora is an AI-driven emotional wellness startup project — a mental health counseling and journaling platform. It analyzes user sentiment in real-time and provides wellness guidance using the Gemini API. Built with Node.js, Express.js, and MongoDB, Palora demonstrates Vivek's ability to build human-centered AI products.";
  }
  if (query.includes("mongodb") || query.includes("database") || query.includes("why mongodb")) {
    return "Vivek frequently uses MongoDB due to its flexible document schema, which is perfect for dynamic unstructured data (like mathematical queries in Mathem Solvex or logs in ObserveFlow). He also utilizes TTL (Time-To-Live) indexes in MongoDB to automatically purge stale logs, optimizing database storage and reducing costs.";
  }
  if (query.includes("pinecone") || query.includes("semantic search") || query.includes("vector")) {
    return "Pinecone is used in Mathem Solvex for ultra-fast, scalable vector similarity search. Combined with the Gemini API to generate embeddings, this architecture allows the platform to perform semantic search — finding related mathematical concepts based on meaning rather than exact keyword matches.";
  }
  if (query.includes("docker") || query.includes("microservice") || query.includes("observeflow architecture")) {
    return "ObserveFlow uses a containerized microservices architecture powered by Docker. This allows Vivek to independently scale the log-ingestion nodes from the analytics nodes. Docker ensures environment consistency, making the distributed logging pipeline highly reliable.";
  }
  if (query.includes("deployment") || query.includes("ci/cd") || query.includes("github actions")) {
    return "Vivek's deployment workflow relies heavily on GitHub Actions for CI/CD, automatically running tests and linters. Frontends are typically deployed to Vercel to leverage Edge functions and CDN caching, while backend APIs and databases are deployed on scalable cloud providers like AWS or Render.";
  }
  if (query.includes("rank predictor") || query.includes("nimcet") || query.includes("cuet")) {
    return "Rank Predictor is a highly popular college eligibility calculator for NIMCET and CUET Computer Science aspirants. Given a candidate's entrance rank, it predicts which colleges they can join. Live at rankpredictor.maarula.in — built with HTML, CSS, JavaScript, and React.js.";
  }
  if (query.includes("garbage") || query.includes("classification") || query.includes("cnn")) {
    return "Vivek's Garbage Classification system uses Convolutional Neural Networks (CNN) built with TensorFlow and OpenCV to automatically categorize waste into recyclable vs. general categories. This deep learning project demonstrates his ML engineering capabilities beyond web development.";
  }
  if (query.includes("skill") || query.includes("technologies") || query.includes("stack") || query.includes("speciali")) {
    return "Vivek's core expertise:\n• Backend: Node.js, Express.js, MongoDB, MySQL, C++, Python\n• Frontend: React.js, Next.js, Tailwind CSS\n• AI/ML: Gemini API, Pinecone, TensorFlow, CNNs\n• DevOps: Docker, GitHub Actions, Vercel, CI/CD\n• Tools: Git, Postman, REST APIs\nHe specializes in AI-integrated full-stack systems with production deployments.";
  }
  if (query.includes("intern") || query.includes("experience") || query.includes("work") || query.includes("job")) {
    return "Vivek's professional experience:\n• SDE Intern @ SafeQbit Technologies (Feb–May 2026): Built scalable UI architectures and deployed products on Vercel\n• Training @ Tech Mahindra (Jul 2023–Jan 2024): Enterprise software workflows and industry practices\nHe's currently available for full-time SDE or AI Engineer roles.";
  }
  if (query.includes("dsa") || query.includes("leetcode") || query.includes("coding") || query.includes("algo")) {
    return "Vivek's algorithmic profile is strong:\n• LeetCode Rating: 1664 (Top 16.41% globally)\n• 500+ DSA problems solved across Easy/Medium/Hard\n• Active contest competitor\n• 30+ GitHub repositories demonstrating clean architecture\n• 900+ GitHub contributions last year";
  }
  if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("mca") || query.includes("bca")) {
    return "Vivek's academic background:\n• MCA (Master of Computer Applications) — Delhi University, 2024–2026: Advanced Algorithms, Distributed Databases, ML, Cloud Systems\n• BCA (Bachelor of Computer Applications) — Maharshi Pratap Group, 2020–2023: Graduated with honors in OOPs, DBMS, Networking";
  }
  if (query.includes("github") || query.includes("open github") || query.includes("repo")) {
    return "Vivek's GitHub is at github.com/vivekducs — featuring 30+ repositories spanning AI products, full-stack apps, monitoring systems, and ML projects. You can explore his code directly at: https://github.com/vivekducs";
  }
  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("reach")) {
    return "To contact Vivek Kumar:\n• Email: vivekducs@gmail.com\n• GitHub: github.com/vivekducs\n• He's actively looking for SDE / AI Engineer roles\nYou can also scroll to the Contact section on this portfolio to send a message directly!";
  }
  if (query.includes("architecture") || query.includes("backend") || query.includes("system design")) {
    return "Vivek's backend architecture philosophy centers on microservices, containerization (Docker), and scalable API design. His projects use RESTful APIs with Node.js/Express, MongoDB for flexible data models, and CI/CD pipelines via GitHub Actions for automated deployments to Vercel.";
  }
  if (query.includes("ai") || query.includes("gemini") || query.includes("llm") || query.includes("machine learning")) {
    return "Vivek integrates AI deeply into his products. He uses:\n• Gemini API for natural language processing and generation\n• Pinecone for vector embeddings and semantic search\n• TensorFlow for deep learning (CNNs for image classification)\nHis standout AI project — Mathem Solvex — uses RAG-style semantic search achieving 330K+ search impressions.";
  }
  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("who are you")) {
    return "Hi! I'm VK Assistant, the AI representative for Vivek Kumar — Full Stack Engineer and AI Product Builder from Noida, India. I can tell you about his projects (Mathem Solvex, ObserveFlow, Palora), technical skills, work experience, coding achievements, or help you get in contact. What would you like to know?";
  }
  return "I'm VK Assistant, representing Vivek Kumar. I can answer questions about his projects, skills (Node.js, React, AI/ML), work experience (SDE Intern at SafeQbit), or DSA achievements (LeetCode 1664 rating, Top 16.41%). Try asking: 'Tell me about Mathem Solvex' or 'What technologies does Vivek specialize in?'";
}
