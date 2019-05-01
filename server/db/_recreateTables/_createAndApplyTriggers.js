const { query } = require('..');

module.exports = () =>
	query(`
  ---------------------------
  ---- Create
  -- Trigger for updated_at
  CREATE OR REPLACE FUNCTION blog.auto_update_timestamp()
  RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
  $$ LANGUAGE plpgsql;
  ---- Apply
  -- Users
  CREATE TRIGGER trigger_auto_update_timestamp
  BEFORE UPDATE ON blog.users
  FOR EACH ROW
  EXECUTE PROCEDURE blog.auto_update_timestamp();
  -- Posts
  CREATE TRIGGER trigger_auto_update_timestamp
  BEFORE UPDATE ON blog.posts
  FOR EACH ROW
  EXECUTE PROCEDURE blog.auto_update_timestamp();
  `);
