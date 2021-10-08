drop table if exists subscription;
drop table if exists subscriber;
drop table if exists newsletter;

create table "subscriber" (
	subscriber_id serial primary key,
	email varchar(320) not null unique,
	pass text not null,
	admin boolean default false
);

create table "newsletter" (
	newsletter_id serial primary key,
	name text unique
);

create table "subscription" (
	subscriber_id integer references "subscriber",
	newsletter_id integer references "newsletter",
	primary key (subscriber_id, newsletter_id)
);

insert into subscriber (email, pass) values
('admin@neatnews.com', 'JDJhJDEwJHRMaUcvVUVYaGtmNE9nUGl4dlB2eC4wS01Pd2NxLmk3VlhDLmQzL0I5VlQ4ZjM2TVZneC5H'),
('test_user@gmail.com', 'JDJhJDEwJG5zVG1oREEzVE9VYXV1UzZuaGNYbU9od0Vhbk8ueFN3Yi5tRVFPV0ZHejFNYTdZVzkyR0hL'),
('john_smith@gmail.com', 'JDJhJDEwJGxYRGJaVW9JRlRHaUV5NU8waFFIWGVYWHZpV0suM1V1Rk8ydVdYZnd3azJiTTVFRFhCSEMu'),
('tim_person@gmail.com', 'JDJhJDEwJGQ3U0ZLUTZJQkdYVy9OcnR3cFVwcU9KVTBPTHBGWWJqYndkeks4ejBqY2pGYXZ0Y2ptbGll'),
('stan_mann@gmail.com', 'JDJhJDEwJGdWNlg1Q20wSEplWXQuRWZjVkhCeS5tNTV3em1hT0VoZ3RGWWpzY2w3aVRjaDdJbmtFT3dh'),
('brock_wurst@gmail.com', 'JDJhJDEwJFFZRnZhNU40T1FyQ1ZyWjhQdEJlLnVLczduU3hRVFJoMXYxTldQZ0wzN1ZwRlNmWmVxTFl5'),
('janet_lady@gmail.com', 'JDJhJDEwJEcxL0hoenRrSUtYeDNRMzIyZ1NwUy5DdnpjbkdTbnpZNjM4QUkwMWtlY2Z2OFF2dVZVMEZT'),
('jane_doe@gmail.com', 'JDJhJDEwJFNId2xBNFY4SWtWTkVYb2tQZDFJTi5nTlJHb1pTZXdZNjJIdWhCWFN0dUV4WHp3bUZlUHhD'),
('steve_carell@gmail.com', 'JDJhJDEwJHFrUDh0R3dmR2tONlpJdmFueXdKUmVYODFkRG1haW5jU2VXR212YTVodllRWUt2ZkJmb3cu'),
('ally_gaiter@gmail.com', 'JDJhJDEwJDYuUmcuN0RoTTVIQmpzWjhXY0tRMk91anBlVExhWE5NZFJxNTVWWS4yTVl5b0wuMlJMRi9h');

update subscriber set admin = true where email = 'admin@neatnews.com';

insert into newsletter ("name") values
('International Geographic'),
('Humorous Going Ons'),
('Clowns. What You and Your Kids Need to Know'),
('Things of Interest, Monthly'),
('Forks, Knives, and Other Such Cutlery'),
('Tidbits of Information, an Episodical'),
('Tuesday Tips for Bowling without Looking Silly'),
('Your Daily Dose of Origami-Based Yoga'),
('A Few Random Notes Played on the Piano, Quarterly'),
('How Fast Does Paint Dry - The Series'),
('The Same Neat Fact about Squids: On the Hour, Every Hour'),
('Your Mid October Summer Fashion Update'),
('Doesn''t this Person Kind of Look Like this Other Person?');

insert into "subscription" (subscriber_id, newsletter_id)
select subscriber_id, newsletter_id from subscriber join newsletter on random() > 0.5;