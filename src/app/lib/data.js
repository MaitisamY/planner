// 'use server'
// import { sql } from '@vercel/postgres'

// export async function getTasks() {
//     const { rows } = await sql`SELECT * FROM todo_list`
//     return rows
// }

// export async function editTask(id, newTask, dueDate, status) {
//     const { rows } = await sql`UPDATE todo_list SET task = ${newTask}, due_date = ${dueDate}, status = ${status} WHERE id = ${id} RETURNING *`
//     return rows
// }

// export async function deleteTask(id) {
//     const { rows } = await sql`DELETE FROM todo_list WHERE id = ${id} RETURNING *`
//     return rows
// }

// export async function reCreateTask(id, newTask, dueDate, status) {
//     const { rows } = await sql`UPDATE todo_list SET task = ${newTask}, due_date = ${dueDate}, status = ${status} WHERE id = ${id} RETURNING *`
//     return rows
// }



