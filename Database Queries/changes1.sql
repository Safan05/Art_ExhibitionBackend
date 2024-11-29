
alter table users add column status varchar(10) CHECK (Status IN ('available','banned'));

CREATE VIEW UserIdByUserName AS
SELECT UserID, UserName
FROM Users;

alter table users 
alter column status SET default 'available';

alter table arts 
alter column status SET default 'available';

alter table auction add column highestBid int default 0;

ALTER TABLE auction
DROP COLUMN starttime,
DROP COLUMN endtime;

 ALTER TABLE auction
add COLUMN starttime TIMESTAMP ;

 
ALTER TABLE auction
add COLUMN endtime  TIMESTAMP WITHOUT TIME ZONE;

CREATE TABLE Following (
artistid int ,
clientid int ,
primary key (artistid , clientid),
foreign key (artistid) references users(userid),
foreign key (clientid) references users(userid)
);

CREATE TABLE Wishlist (
artid int ,
clientid int ,
primary key (artid , clientid),
foreign key (artid) references arts(artid),
foreign key (clientid) references users(userid)
);


