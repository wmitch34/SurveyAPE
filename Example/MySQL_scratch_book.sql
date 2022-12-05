SELECT `title`, `description`, surveys.surveyID 
FROM surveys, questions 
WHERE surveys.email = "test@gmail.com" AND EXISTS(  SELECT * 
                                                    FROM questions
                                                    WHERE questions.answer IS NULL
                                                    AND questions.surveyID = surveys.surveyID);


SELECT participantEmail, surveyID
FROM questions
WHERE questions.participantEmail = "test@gmail.com" AND EXISTS( SELECT *
                                                                FROM questions, surveys
                                                                WHERE questions.answer IS NULL 
                                                                AND );
                                                                
SELECT DISTINCT s.title, s.description, s.surveyID
FROM questions q
INNER JOIN surveys s 
ON s.surveyID = q.surveyID
WHERE q.answer IS NULL
AND q.participantEmail = "test@gmail.com";

SELECT DISTINCT s.title, s.description, s.surveyID
FROM questions q
INNER JOIN surveys s 
ON s.surveyID IN (SELECT surveyID
                  FROM questions
                  WHERE questions.answer IS NOT NULL)
WHERE q.participantEmail = "test@gmail.com";

SELECT DISTINCT s.title, s.description, s.surveyID
FROM questions q, surveys s
GROUP BY s.surveyID
HAVING q.answer <= NULL;
AND s.surveyID = q.surveyID;

SELECT s.title, s.description, s.surveyID, SUM(q.answer)
FROM questions q, surveys s

SELECT s.title, s.description, s.surveyID
FROM surveys s
HAVING s.surveyID = (SELECT surveyID
                    FROM questions q
                    WHERE q.participantEmail = "test@gmail.com"
                    GROUP BY surveyID
                    HAVING sum(q.answer is NULL) = 0);


AND EXISTS( SELECT *
            FROM questions 
            WHERE FIND_IN_SET('NULL',group_concat(IFNULL(answer, 'NULL'))))

            SELECT question, group_concat(IFNULL(answer, 'NULL')) AS answer
                                FROM questions
                                WHERE participantEmail = "test@gmail.com"
                                AND surveyID = "3"
                                GROUP BY question;


SELECT id, question, group_concat(IFNULL(answer, 'NULL')) AS answer
FROM questions
WHERE participantEmail = "test@gmail.com"
AND surveyID = "5"
GROUP BY question, id;