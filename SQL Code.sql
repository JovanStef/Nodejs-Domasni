SELECT * FROM user INNER JOIN posts ON user.id=posts.UserId INNER JOIN comment ON comment.postID=posts.id ORDER BY user.id;

SELECT user.id , user.name ,user.surname,posts.UserId,posts.text,posts.likes,comment.text FROM user INNER JOIN posts ON user.id=posts.UserId INNER JOIN comment ON comment.postID=posts.id where user.id=1 ;

CREATE TABLE comment (
id INT AUTO_INCREMENT PRIMARY KEY,
text TEXT NOT NULL,
postID INT NOT NULL,
userID INT NULL
);
ALTER TABLE posts modify id int(6) not null;
ALTER TABLE user modify id int(6) not null;

ALTER TABLE comment
ADD FOREIGN KEY (postID) REFERENCES posts(id);
ALTER TABLE comment
ADD FOREIGN KEY (userID) REFERENCES user(id);

ALTER TABLE posts ADD FOREIGN KEY (UserId) REFERENCES user(id); 

ALTER TABLE user ADD COLUMN password VARCHAR(64) NOT NULL DEFAULT "password";

DELETE FROM user WHERE id=0;

SELECT * FROM comment ;
SELECT * FROM posts ;
SELECT * FROM user;

ALTER TABLE user DROP COLUMN password ;

ALTER TABLE posts DROP FOREIGN KEY userID;

DROP TABLE comment;

alter table user add constraint unique email_constraint(email);

INSERT INTO comment (text,postID, userID) VALUES("One morning, when Gregor Samsa woke from troubled dreams, he",4,5),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo",3,4),
("But I must explain to you how all this mistaken",2,3),
("The European languages are members of the same family. Their,",1,2);

SELECT*FROM user 
INNER JOIN posts ON user.id=posts.UserId;


