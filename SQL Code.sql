SELECT * FROM user JOIN posts ON user.id=posts.UserId ;

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

SELECT * FROM comment ;
SELECT * FROM posts ;


INSERT INTO comment (text,postID, userID) VALUES("One morning, when Gregor Samsa woke from troubled dreams, he",1,2),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo",2,3),
("But I must explain to you how all this mistaken",3,4),
("The European languages are members of the same family. Their,",4,5);

SELECT*FROM user 
INNER JOIN posts ON user.id=posts.UserId
INNER JOIN comment ON user.id=comment.userID
WHERE user.id=5;


