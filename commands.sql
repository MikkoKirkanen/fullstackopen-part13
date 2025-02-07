CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Mikko Kirkanen', 'https://mikkokirkanen.fi', 'Tervetuloa - Mikko Kirkanen');
INSERT INTO blogs (author, url, title) VALUES ('Mikko Kirkanen', 'https://mikkokirkanen.fi/ohjelmointi-ja-projektit/muistipeli', 'Muistipeli - Ohjelmointi ja projektit - Mikko Kirkanen');