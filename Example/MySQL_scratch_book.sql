SELECT s.title, s.description, s.surveyID
								FROM surveys s
								HAVING s.surveyID = (	SELECT surveyID
														FROM questions q
														WHERE q.participantEmail = "will@gmail.com"
														GROUP BY surveyID
														HAVING sum(q.answer is NULL) = 0;);

SELECT question, type, json_arrayagg(answer) AS answer FROM questions WHERE surveyID = 3 GROUP BY question, type;

SELECT question, type, answer, JSON_ARRAYAGG(JSON_OBJECT('answer', answer)) FROM questions WHERE surveyID = 2 GROUP BY question, type;

SELECT question, type, group_concat(answer) AS answer, AVG(answer) AS average, VARIANCE(answer) AS variance FROM questions WHERE surveyID = 1 GROUP BY question, type;