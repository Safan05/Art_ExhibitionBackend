CREATE OR REPLACE FUNCTION notify_auction_update() 
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('auction_update', NEW.highestbid::text);  -- Use the correct column name
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auction_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON auctions
FOR EACH ROW EXECUTE FUNCTION notify_auction_update();