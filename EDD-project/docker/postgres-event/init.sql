CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "logs" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  priority VARCHAR(10) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION notify_new_log()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('logs_channel', NEW.id::TEXT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_new_log_trigger
AFTER INSERT ON logs
FOR EACH ROW
EXECUTE FUNCTION notify_new_log();
