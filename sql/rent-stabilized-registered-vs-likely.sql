-- 13441 rows from registered rent stabilized units brooklyn
-- 11959 rows from likely rent stabilized units brooklyn


-- select features from bk_rent_stablized and bk_rentstab_registered that don't intersect
SELECT a.*
FROM bk_likely_rent_stablized a left join
  bk_rentstab_registered b on
  ST_Intersects(a.the_geom, ST_Centroid(b.the_geom))
where b.cartodb_id is null
-- this one works!

SELECT a.*
FROM bk_likely_rent_stablized a left join
  bk_rentstab_registered b on
  ST_Intersects(a.the_geom, ST_Centroid(b.the_geom))
where b.cartodb_id is null


SELECT a.* 
FROM bk_likely_rent_stablized a, 
    bk_rentstab_registered b 
    where st_intersects(
        a.the_geom, 
        ST_Centroid(
            b.the_geom
            )
        )
-- returns 7824 that intersect

SELECT a.*
FROM bk_likely_rent_stablized a
left join bk_rentstab_registered b
ON (a.bbl = b.bbl)
where a.bbl IS NULL
-- returns none!

SELECT 
  a.cartodb_id, 
  a.address,
  a.the_geom,
  a.the_geom_webmercator
FROM 
bk_likely_rent_stablized as a left join
  bk_rentstab_registered as b on
  ST_Intersects(a.the_geom, b.the_geom)
where b.cartodb_id is null
-- returns 2928 that don't intersect each other

SELECT a.cartodb_id, a.the_geom, a.address, a.the_geom_webmercator 
FROM bk_likely_rent_stablized a left join
bk_rentstab_registered as b on
a.bbl = b.bbl
where a.bbl IS NULL

SELECT  l.*
FROM    t_left l
LEFT JOIN t_right r
ON      r.value = l.value
WHERE   r.value IS NUL