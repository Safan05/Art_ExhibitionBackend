 ALTER TABLE auction
Add COLUMN status VARCHAR(10) CHECK (Status IN ('pending','cancelled','approved'));
DROP COLUMN startbid;