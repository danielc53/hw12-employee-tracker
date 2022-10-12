SELECT
    e.id AS id,
    e.first_name AS First,
    e.last_name AS Last,
    e.role_id AS Role,
    r.salary AS Salary,
    d.name AS Department

FROM employee e
LEFT JOIN employee m
    on e.manager_id = m.id
LEFT JOIN role r
    ON e.role_id = r.title
LEFT JOIN department d
    ON r.department_id = d.id