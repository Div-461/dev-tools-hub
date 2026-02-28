import { format } from "sql-formatter";

export function formatSql(sql: string): string {
  try {
    return format(sql, { language: "sql", tabWidth: 2, keywordCase: "upper" });
  } catch (e) {
    throw new Error("Failed to format SQL: " + (e instanceof Error ? e.message : "unknown error"));
  }
}

export const sqlSample = `select users.id, users.name, orders.total from users inner join orders on users.id = orders.user_id where users.active = true and orders.total > 100 order by orders.total desc limit 10`;
