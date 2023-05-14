-- Add up migration script here
CREATE TABLE feature_requests (
  id UUID NOT NULL UNIQUE PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content text NOT NULL,
  likes integer NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
