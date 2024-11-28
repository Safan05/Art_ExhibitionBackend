CREATE TABLE Auction (
AuctionID int primary key,
StartingBid int ,
StartTime time,
EndTime time,
ArtID int,

foreign key (ArtID) references arts(ArtID)
);


CREATE TABLE RECIEPT (
RecieptID  int Primary key,
RecieptDate Date,
Description TEXT,
Price money,
BuyerID int,
ArtistID int ,
ArtID int ,

foreign key (ArtID)  references arts(ArtID),
foreign key (BuyerID) references users(UserID),
foreign key (ArtistID) references users(userID)
	
);

CREATE TABLE BIDS(
AuctionID int ,
Amount int ,
BidTime Timestamp,
BiddingClient int ,

primary key (AuctionID , Amount),
foreign key (AuctionID) references Auction(AuctionID),
foreign key (BiddingClient) references users(userID)
);

CREATE TABLE Reviews(
ClientID int,
ArtID int,
Comments TEXT,
Rate int ,
	
Primary key (ClientID , ArtID),
foreign key (ClientID) references users(userID),
foreign key (ArtID) references arts(ArtID)
);

CREATE TABLE DeletedArts (
ArtID int primary key ,
AdminID int , 
DeleteDate date,
Cause TEXT,
	
foreign key (ArtID) references arts(ArtID),
foreign key (AdminID) references users(userID)
);
ALTER TABLE arts ADD Column Status TEXT CHECK (Status IN ('available','deleted'));


CREATE TABLE BannedUsers(
BannedID int primary key,
AdminID int ,
Cause TEXT,
Banneddate date,

foreign key (BannedID) references users(userID),
foreign key (AdminID) references users(userID)
)