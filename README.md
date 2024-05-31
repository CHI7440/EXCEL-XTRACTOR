# Objective:
- The goal of this assignment is to develop a web application using Django, which allows users to upload Excel or CSV files, extracts data from them, generates a summary report, and emails the summary report to specified recipients. Additionally, the application is to be deployed on a server for testing.

# Technologies Used:
- Django: Python-based web framework for backend development.
- Pandas: Python library for data manipulation and analysis.
- HTML/CSS/JavaScript: For frontend development and user interaction.
- Git: Version control system for tracking changes in the project.
- SMTP: Simple Mail Transfer Protocol for sending emails.

# Directory Structure:
- The project is structured in accordance with Django's recommended structure.
- It consists of a main project directory ('Excel Extractor') and an app directory ('home').
- Static files (CSS, JS, images) are stored in the 'static' directory, and templates are stored in the 'templates' directory.

# Frontend Development:
- HTML templates are used for rendering frontend views.
- CSS is utilized for styling the web pages.
- JavaScript is employed for handling file uploads via drag-and-drop functionality.

# Backend Development:
- Django views are implemented to handle user requests and file uploads.
- Upon file upload, the backend extracts data using Pandas based on the file format (CSV or Excel).
- A summary report is generated from the extracted data, which includes grouping by 'State' and 'DPD' (Days Past Due).
- The summary report is formatted into HTML for email and display purposes.
- The SMTP protocol is used to send the summary report via email to specified recipients.


# Conclusion:
- The Excel Extractor web application successfully fulfills the assignment objectives by allowing users to upload Excel or CSV files, extracting data from them, generating a summary report, and emailing the report to designated recipients. The application demonstrates proficiency in Django development, Git implementation, and deployment practices.

