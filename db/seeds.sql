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

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Bret", "Harper", 001, 023),
(002, "Mason", "Walker", 002, 023),
(003, "Rudy", "Hudson", 003, 023),
(004, "Aubrey", "George", 004, 023),
(005, "Gabe", "Scott", 005, 023),
(006, "Kit", "Head", 006, 010),
(007, "Sammy", "Arnold", 007, 010),
(008, "Ray", "Watts", 008, 010),
(009, "Alexis", "Wynn", 009, 010),
(010, "Silver", "Decker", 010, 021),
(011, "Jo", "Davidson", 011, 021),
(012, "Jamie", "Austin", 012, 011),
(013, "Gabby", "Webb", 013, 011),
(014, "Willy", "Saunders", 014, 013),
(015, "Lane", "Anderson", 015, 014),
(016, "Kiran", "Sanders", 016, 024),
(017, "Skye", "Melton", 017, 024),
(018, "Kris", "LeBlanc", 018, 024),
(019, "Frankie", "Nalsh", 019, 020),
(020, "Reggie", "Reilly", 020, 018),
(021, "Jordan", "Porter", 021, 021),
(022, "Sam", "Gibson", 022, 021),
(023, "Val", "Porter", 023, 021),
(024, "Rene", "Marsh", 024, 023),
(025, "Gale", "Butler", 025, 020);