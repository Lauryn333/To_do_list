DROP TABLE IF EXISTS list;
DROP TABLE IF EXISTS item;

create table list (
  id int unsigned primary key auto_increment not null,
  name varchar(100) not null);

create table item (
  id int unsigned primary key auto_increment not null,
  todo varchar(100) not null,
  list_id int unsigned not null,
  foreign key(list_id) references list(id)
);

INSERT INTO list (name) VALUES 
('Test 1'),
('Test 2'),
('Test 3');


INSERT INTO item (todo, list_id) VALUES 
('Acheter du chocolat', 1),
('Passer le balais', 3),
('Envoyer des CV', 2);