SET @my_loc = ST_GeomFromText('POINT(42.658986 23.316078)', 4326);

SELECT * FROM defaultdb.locations as loc
INNER JOIN (
  SELECT * FROM defaultdb.events as innerEvent
  WHERE innerEvent.finishDate > NOW()
) AS e ON e.id = loc.eventId
WHERE (ST_Distance_Sphere(loc.coords,  @my_loc) ) <= 700;
