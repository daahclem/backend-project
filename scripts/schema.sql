-- Create the "data" table
CREATE TABLE IF NOT EXISTS "Data" (
  "id" SERIAL PRIMARY KEY,
  "field1" VARCHAR(255) NOT NULL,
  "field2" VARCHAR(255) NOT NULL,
  "field3" VARCHAR(255) NOT NULL, 
  "createdAt" TIMESTAMPTZ NOT NULL,
  "updatedAt" TIMESTAMPTZ NOT NULL
);


-- Add any additional table definitions, indexes, or constraints as needed
