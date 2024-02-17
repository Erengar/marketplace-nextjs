DO $$ BEGIN
 CREATE TYPE "group" AS ENUM('user', 'admin', 'superadmin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
