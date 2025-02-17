CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "logs" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  priority VARCHAR(10) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);