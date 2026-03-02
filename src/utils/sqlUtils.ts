import { format } from "sql-formatter";

export type SqlDialect = "sql" | "mysql" | "postgresql" | "tsql";

export const dialectLabels: Record<SqlDialect, string> = {
  sql: "Standard SQL",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  tsql: "SQL Server",
};

export function formatSql(sql: string, dialect: SqlDialect = "sql"): string {
  try {
    return format(sql, {
      language: dialect,
      tabWidth: 2,
      keywordCase: "upper",
      linesBetweenQueries: 2,
    });
  } catch (e) {
    throw new Error(
      "Failed to format SQL: " +
        (e instanceof Error ? e.message : "unknown error")
    );
  }
}

export const sqlSample = `-- Create a stored procedure
CREATE PROCEDURE GetActiveOrders(@MinTotal DECIMAL(10,2))
AS
BEGIN
  SET NOCOUNT ON;

  SELECT o.order_id, o.order_date, c.name AS customer_name, o.total
  FROM orders o
  INNER JOIN customers c ON o.customer_id = c.id
  LEFT JOIN shipping s ON o.order_id = s.order_id
  WHERE o.status = 'active'
    AND o.total > @MinTotal
    AND o.order_date >= DATEADD(MONTH, -3, GETDATE())
  ORDER BY o.total DESC;

  /* Return summary */
  SELECT COUNT(*) AS total_orders, SUM(total) AS grand_total
  FROM orders
  WHERE status = 'active' AND total > @MinTotal;
END;

-- Create a view
CREATE VIEW vw_TopCustomers AS
SELECT c.id, c.name, COUNT(o.order_id) AS order_count, SUM(o.total) AS lifetime_value
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING SUM(o.total) > 1000
ORDER BY lifetime_value DESC;

-- Create a function
CREATE FUNCTION CalculateDiscount(@total DECIMAL(10,2), @tier VARCHAR(20))
RETURNS DECIMAL(10,2)
AS
BEGIN
  DECLARE @discount DECIMAL(10,2);
  IF @tier = 'gold'
    SET @discount = @total * 0.15;
  ELSE IF @tier = 'silver'
    SET @discount = @total * 0.10;
  ELSE
    SET @discount = @total * 0.05;
  RETURN @discount;
END;

-- Create a trigger
CREATE TRIGGER trg_AfterInsertOrder ON orders
AFTER INSERT
AS
BEGIN
  INSERT INTO audit_log (event, description, created_at)
  SELECT 'ORDER_CREATED', CONCAT('Order ', CAST(order_id AS VARCHAR), ' created with total ', CAST(total AS VARCHAR)), GETDATE()
  FROM inserted;
END;`;
