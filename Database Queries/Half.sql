CREATE TABLE IF NOT EXISTS USERS (
    UserID INT UNIQUE PRIMARY KEY,
    EMAIL TEXT UNIQUE,
    Password TEXT,
    Name VARCHAR(20),
    ProfilePic TEXT,
    Address TEXT,
    Username VARCHAR(20),
    Age INT,
    gender VARCHAR(6) CHECK (gender IN ('male', 'female')),
    PhoneNumber VARCHAR(20),
    cardNumber TEXT UNIQUE,
    Expiredate DATE,
    Role VARCHAR(10) CHECK (Role IN ('Client', 'Artist', 'Admin'))
);

CREATE TABLE Arts (
    ArtID INT UNIQUE PRIMARY KEY,
    Photo TEXT,
    ArtName VARCHAR(30),
    Description TEXT,
    BasePrice NUMERIC(10, 2), -- Optional fix for money type
    ReleaseDate DATE,
    TheArtistID INT,
    FOREIGN KEY (TheArtistID) REFERENCES USERS(UserID)
);

CREATE TABLE Exhibition (
    ExhibitionID INT PRIMARY KEY,
    Title VARCHAR(30),
    Theme TEXT UNIQUE,
    StartDate DATE,
    EndDate DATE
);

CREATE TABLE ExhibitionArts (
    ExhibitionID INT,
    ArtID INT,
    PRIMARY KEY (ExhibitionID, ArtID),
    FOREIGN KEY (ExhibitionID) REFERENCES Exhibition(ExhibitionID),
    FOREIGN KEY (ArtID) REFERENCES Arts(ArtID)
);

CREATE TABLE Feedback (
    FeedID INT PRIMARY KEY,
    Rating INT,
    Description TEXT,
    theDate DATE,
    SubmitterID INT,
    FOREIGN KEY (SubmitterID) REFERENCES USERS(UserID)
);
