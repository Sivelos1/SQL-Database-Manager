-- Departments --

USE workplace_db IF EXISTS workplace_db

INSERT INTO department (id, department_name)
VALUES (001, "Finance"),
(002, "HR"),
(003, "Engineering"),
(004, "Sales"),
(005, "Operations");

-- Roles

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Financial Analyst", 30.50, 001),
(002, "Transfer Price Officer", 30.50, 001),
(003, "Investment Analyst", 45.50, 001),
(004, "Project Control Analyst", 30.50, 001),
(005, "Project Budget Analyst", 30.50, 001),
(006, "HR Assistant", 15.25, 002),
(007, "HR Representative", 15.25, 002),
(008, "HR Specialist", 30.50, 002),
(009, "HR Intern", 1.25, 002),
(010, "HR Manager", 10.25, 002),
(011, "Chief Engineer", 75.25, 003),
(012, "VP of Engineering", 125.25, 003),
(013, "Engineering Director", 45.25, 003),
(014, "Engineering Manager", 10.25, 003),
(015, "Engineering Intern", 1.25, 003),
(016, "Account Executive", 75.25, 004),
(017, "Business Developer", 60.00, 004),
(018, "Sales Manager", 30.50, 004),
(019, "Salesperson", 7.25, 004),
(020, "Store Manager", 15.25, 004),
(021, "Chief Operating Officer", 125.25, 005),
(022, "VP of Operations", 60.00, 005),
(023, "Director of Operations", 30.50, 005),
(024, "Operations Manager", 15.25, 005),
(025, "Entry Level Employee", 7.25, 005);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (001, "Bret", "Harper", 001),
(002, "Mason", "Walker", 002),
(003, "Rudy", "Hudson", 003),
(004, "Aubrey", "George", 004),
(005, "Gabe", "Scott", 005),
(006, "Kit", "Head", 006),
(007, "Sammy", "Arnold", 007),
(008, "Ray", "Watts", 008),
(009, "Alexis", "Wynn", 009),
(010, "Silver", "Decker", 010),
(011, "Jo", "Davidson", 011),
(012, "Jamie", "Austin", 012),
(013, "Gabby", "Webb", 013),
(014, "Willy", "Saunders", 014),
(015, "Lane", "Anderson", 015),
(016, "Kiran", "Sanders", 016),
(017, "Skye", "Melton", 017),
(018, "Kris", "LeBlanc", 018),
(019, "Frankie", "Nalsh", 019),
(020, "Reggie", "Reilly", 020),
(021, "Jordan", "Porter", 021),
(022, "Sam", "Gibson", 022),
(023, "Val", "Porter", 023),
(024, "Rene", "Marsh", 024),
(025, "Gale", "Butler", 025);

UPDATE employees SET manager_id = 023 WHERE id = 001;
UPDATE employees SET manager_id = 023 WHERE id = 002;
UPDATE employees SET manager_id = 023 WHERE id = 003;
UPDATE employees SET manager_id = 023 WHERE id = 004;
UPDATE employees SET manager_id = 023 WHERE id = 005;
UPDATE employees SET manager_id = 010 WHERE id = 006;
UPDATE employees SET manager_id = 010 WHERE id = 007;
UPDATE employees SET manager_id = 010 WHERE id = 008;
UPDATE employees SET manager_id = 010 WHERE id = 009;
UPDATE employees SET manager_id = 021 WHERE id = 010;
UPDATE employees SET manager_id = 021 WHERE id = 011;
UPDATE employees SET manager_id = 011 WHERE id = 012;
UPDATE employees SET manager_id = 011 WHERE id = 013;
UPDATE employees SET manager_id = 013 WHERE id = 014;
UPDATE employees SET manager_id = 014 WHERE id = 015;
UPDATE employees SET manager_id = 024 WHERE id = 016;
UPDATE employees SET manager_id = 024 WHERE id = 017;
UPDATE employees SET manager_id = 024 WHERE id = 018;
UPDATE employees SET manager_id = 020 WHERE id = 019;
UPDATE employees SET manager_id = 018 WHERE id = 020;
UPDATE employees SET manager_id = 021 WHERE id = 022;
UPDATE employees SET manager_id = 021 WHERE id = 023;
UPDATE employees SET manager_id = 023 WHERE id = 024;
UPDATE employees SET manager_id = 020 WHERE id = 025;