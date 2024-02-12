# 1 - PLANNER - To-do-list Application

## Introduction

Planner is a simple daily tasks maintainer app built on Next.js framework, designed to assist users in managing their tasks efficiently. It provides essential features such as task creation, editing, marking as completed or pending, and deletion. The app utilizes local storage to persist tasks and related functionalities.

## Features
- **Task Management**: Users can create, edit, mark as completed or pending, and delete tasks.
- **Local Storage**: Utilizes browser local storage to persist tasks and their statuses.
- **Date Restrictions**: Users cannot select previous dates for task creation. In the task edit view, users can choose previous dates but not less than the current date.
- **Two Views**: Offers two types of views - grid and list view, with the default being grid.
- **Home View**: Displays tasks for the current date and dates ahead of today.
- **Trash View**: Tasks are moved to the trash view when their due date has passed.

## Usage
1. **Creating a Task**: Click on the "Create Task" button to open the custom modal. Write the task details and select a due date. Only future dates can be selected.
2. **Editing a Task**: Double-click on a task to open the edit modal. Modify the task details or due date. Previous dates can be selected, but not less than the current date.
3. **Marking Task Status**: Click on the checkbox next to a task to mark it as completed or pending.
4. **Deleting a Task**: Click on the delete icon to remove a task from the list.
5. **View Options**: Toggle between grid and list view using the provided options.
6. **Trash View**: Tasks with past due dates are automatically moved to the trash view.

## Installation
1. Clone or download the Planner repository from [GitHub](https://github.com/MaitisamY/planner).
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open the provided URL in a web browser to access the application.

## Live Demo
Check out the live version of the project [here](https://next-to-do-app-nu.vercel.app)

## Support
For any inquiries or support requests, please reach out to the development team through our GitHub repository.

## Note
This project is open-source and does not include a license. Users are free to use and modify the code according to their requirements.

