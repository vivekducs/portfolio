export const projectsData = [
  {
    id: "mathem-solvex",
    title: "Mathem Solvex",
    category: "ai-ml",
    featured: true,
    desc: "Architected an AI-powered educational platform that successfully scaled to support over 3,000 active students. By implementing advanced search algorithms, the system delivers instant, step-by-step doubt resolution, driving significant user engagement and organic growth.",
    highlights: [
      "3,000+ active student users",
      "330K+ organic Google Search Impressions",
      "AI-powered semantic search via Pinecone & Gemini API",
      "Comprehensive CRUD administrator dashboard"
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "Gemini API", "Pinecone", "React.js"],
    live: "https://question.maarula.in/",
    github: "https://github.com/vivekducs/mathem-solvex-updated",
    engineering: {
      problem: "Students frequently encounter mathematical doubts outside classroom hours but traditional search engines provide generic answers rather than step-by-step contextual resolutions.",
      architecture: "A microservices-inspired monolith where a Node.js/Express backend coordinates between a MongoDB primary datastore and a Pinecone vector database. User queries are vectorized using sentence-transformers before undergoing semantic search.",
      decisions: [
        {
          title: "Why MongoDB?",
          content: "Selected for its flexible document schema, which is perfect for storing unstructured mathematical formulas (LaTeX) and user activity logs without requiring rigid migrations."
        },
        {
          title: "Why Pinecone?",
          content: "We needed sub-50ms latency for nearest-neighbor search across tens of thousands of mathematical questions. Pinecone handles the high-dimensional indexing efficiently."
        },
        {
          title: "Gemini Integration",
          content: "Gemini handles the final step-by-step generation if the semantic search confidence score falls below a threshold, ensuring a fallback for entirely novel questions."
        }
      ],
      scaling: "Implemented Redis caching for frequent queries and index clustering to handle the massive surge during exam seasons.",
      apiSchema: {
        method: "POST",
        endpoint: "/api/v1/search/semantic",
        body: { query: "Integrate x^2 * sin(x)" },
        response: { confidence: 0.94, resolution: "..." }
      },
      tradeoffs: "We sacrificed write-speed for read-speed. Vectorizing equations at ingest time takes ~1.2s per problem, but it allows instant 40ms retrieval during searches.",
      aiWorkflow: "1. Raw text -> 2. All-MiniLM-L6-v2 embedding -> 3. Pinecone cosine similarity -> 4. (Fallback) Gemini Pro zero-shot generation.",
      deploymentFlow: "Containerized Node.js services deployed to AWS ECS via GitHub Actions. MongoDB runs on Atlas Serverless.",
      future: "Migrating from raw REST to gRPC for inter-service communication to reduce serialization overhead."
    }
  },
  {
    id: "palora",
    title: "Palora",
    category: "ai-ml",
    featured: false,
    desc: "Developed a secure, privacy-first emotional wellness platform utilizing AI to analyze user sentiment in real-time. Designed to handle high-traffic spikes seamlessly while providing users with actionable, stress-reducing guidance.",
    tech: ["Node.js", "Express.js", "MongoDB", "Gemini API"],
    github: "https://github.com/vivekducs/Palora-backend",
    engineering: {
      problem: "Access to preliminary mental health support is often gated. Users needed a secure, zero-judgment journaling space capable of detecting subtle shifts in emotional distress.",
      architecture: "A secure REST API built with Express, featuring JWT authentication and robust rate-limiting. Journal entries are asynchronously processed by Gemini for emotional analysis.",
      decisions: [
        {
          title: "Data Privacy",
          content: "All journal entries are symmetrically encrypted at rest using AES-256-GCM. The AI analysis runs entirely ephemerally and is never used to train global models."
        },
        {
          title: "Sentiment Pipeline",
          content: "Instead of complex NLP models, we utilized Gemini with a highly constrained system prompt to extract 5 core emotional vectors (joy, sadness, anxiety, anger, neutral) per entry."
        }
      ],
      scaling: "Stateless API design allows horizontal scaling behind an NGINX load balancer, critical for handling sudden spikes during evening hours.",
      tradeoffs: "Using an LLM for real-time sentiment analysis introduces a variable latency of 1-3 seconds per journal entry, compared to <10ms for a local lightweight NLP model. However, the emotional nuance captured is drastically superior.",
      deploymentFlow: "Deployed on Render with automated horizontal autoscaling. MongoDB Atlas handles the database tier.",
      future: "Implementing a specialized fine-tuned smaller LLM (like Llama 3 8B) hosted on dedicated GPU instances to reduce latency and API costs."
    }
  },
  {
    id: "observeflow",
    title: "ObserveFlow",
    category: "systems",
    featured: false,
    desc: "Engineered a high-throughput monitoring system that aggregates distributed logs in real-time. By implementing automated alerting and efficient data storage, the platform drastically reduced incident response times for production environments.",
    tech: ["Go", "Docker", "Prometheus", "Grafana", "WebSockets"],
    github: "https://github.com/vivekducs/ObserveFlow",
    engineering: {
      problem: "Distributed microservices generate fragmented logs, making root-cause analysis during production incidents painfully slow.",
      architecture: "A Go-based ingestor service that consumes logs via gRPC. Logs are buffered in memory and flushed to a time-series optimized datastore. A WebSocket server streams critical alerts to the frontend.",
      decisions: [
        {
          title: "Why Go?",
          content: "Go's goroutines provide lightweight concurrency, allowing the ingestor to handle thousands of concurrent log streams with minimal memory overhead."
        },
        {
          title: "TTL Indexes",
          content: "Logs older than 7 days are automatically purged via TTL indexes to maintain predictable database performance and control storage costs."
        }
      ],
      scaling: "Implemented a circuit breaker pattern on the ingestor to gracefully degrade and drop low-priority logs during massive DDoS attacks, ensuring core cluster metrics survive.",
      tradeoffs: "Buffered memory writing means in the event of a catastrophic ingestor crash, we might lose up to 500ms of the most recent logs.",
      deploymentFlow: "Golang binaries compiled using multi-stage Dockerfiles and deployed directly to DigitalOcean Droplets via automated CI/CD.",
      future: "Transitioning the data store to ClickHouse for analytical queries to support real-time dashboards for petabyte-scale data."
    }
  },
  {
    id: "rank-predictor",
    title: "Rank Predictor",
    category: "fullstack",
    featured: false,
    desc: "Designed and deployed a highly responsive ranking calculator that supports thousands of concurrent users during peak traffic events, providing critical, real-time admission predictions for students.",
    tech: ["HTML", "CSS", "JavaScript", "React.js"],
    live: "https://rankpredictor.maarula.in/",
    github: "https://github.com/vivekducs/Rank-Predictor",
    engineering: {
      problem: "Aspirants needed a reliable way to predict their college assignments based on mock test scores before official results.",
      architecture: "A lightweight React SPA frontend paired with a static probabilistic model derived from 5 years of historical admissions data.",
      decisions: [
        {
          title: "Why React SPA?",
          content: "To provide an instant, app-like experience where changing inputs immediately recalculates the probability without server round-trips."
        }
      ],
      scaling: "Fully static deployment on Vercel edge network allows infinite scaling during the peak 48-hour results window."
    }
  },
  {
    id: "garbage-classification",
    title: "Garbage Classification",
    category: "ai-ml",
    featured: false,
    desc: "Built a deep learning classification system optimized for edge devices. By automating the categorization of recyclables, the project offers a scalable solution to improve efficiency in municipal waste management.",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV"],
    github: "https://github.com/vivekducs/garbage-classification",
    engineering: {
      problem: "Manual sorting of municipal solid waste is inefficient and hazardous.",
      architecture: "A custom ResNet-inspired CNN architecture trained on a dataset of 25,000 augmented images across 6 waste categories.",
      decisions: [
        {
          title: "Model Architecture",
          content: "Used transfer learning from MobileNetV2 to achieve 94% validation accuracy while maintaining a small enough footprint to run inference on edge devices (Raspberry Pi)."
        }
      ],
      scaling: "Designed for offline batch inference on conveyor belt edge devices with intermittent cloud syncing for model drift monitoring."
    }
  }
];
