// Converts parsed JSON into a flat array of renderable lines for virtualization

export interface JsonLine {
  id: string;
  depth: number;
  key?: string;
  value?: string;
  valueType: "string" | "number" | "boolean" | "null" | "object" | "array" | "bracket";
  isExpandable: boolean;
  isExpanded: boolean;
  childCount?: number;
  raw?: unknown;
  bracket?: string;
  comma: boolean;
  path: string;
}

function getType(val: unknown): JsonLine["valueType"] {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val as JsonLine["valueType"];
}

export function flattenJson(
  data: unknown,
  expandedPaths: Set<string>,
  defaultExpandDepth = 1
): JsonLine[] {
  const lines: JsonLine[] = [];
  let idCounter = 0;

  function walk(
    value: unknown,
    depth: number,
    key: string | undefined,
    path: string,
    isLast: boolean
  ) {
    const id = String(idCounter++);
    const type = getType(value);
    const comma = !isLast;

    if (type === "object" || type === "array") {
      const entries =
        type === "object"
          ? Object.entries(value as Record<string, unknown>)
          : (value as unknown[]).map((v, i) => [String(i), v] as [string, unknown]);

      const childCount = entries.length;
      const autoExpand = depth < defaultExpandDepth;
      const isExpanded = expandedPaths.has(path) ?? autoExpand;
      const openBracket = type === "object" ? "{" : "[";
      const closeBracket = type === "object" ? "}" : "]";

      if (isExpanded) {
        lines.push({
          id,
          depth,
          key,
          valueType: type,
          isExpandable: true,
          isExpanded: true,
          childCount,
          bracket: openBracket,
          comma: false,
          path,
          raw: undefined,
        });

        entries.forEach(([k, v], i) => {
          const childPath = `${path}.${k}`;
          const childKey = type === "object" ? k : undefined;
          walk(v, depth + 1, childKey, childPath, i === entries.length - 1);
        });

        lines.push({
          id: String(idCounter++),
          depth,
          valueType: "bracket",
          isExpandable: false,
          isExpanded: false,
          bracket: closeBracket,
          comma,
          path: path + ".__close",
        });
      } else {
        const preview =
          type === "object"
            ? `{${childCount} keys}`
            : `[${childCount} items]`;
        lines.push({
          id,
          depth,
          key,
          value: preview,
          valueType: type,
          isExpandable: true,
          isExpanded: false,
          childCount,
          bracket: undefined,
          comma,
          path,
        });
      }
    } else {
      const display =
        type === "string"
          ? `"${String(value)}"`
          : String(value);

      lines.push({
        id,
        depth,
        key,
        value: display,
        valueType: type,
        isExpandable: false,
        isExpanded: false,
        comma,
        path,
      });
    }
  }

  walk(data, 0, undefined, "$", true);
  return lines;
}

export function generateSampleJson(): string {
  const users = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: 20 + (i % 40),
    active: i % 3 !== 0,
    address: {
      street: `${100 + i} Main St`,
      city: ["New York", "London", "Tokyo", "Paris", "Sydney"][i % 5],
      zip: `${10000 + i}`,
    },
    tags: ["developer", "designer", "manager", "analyst"].slice(0, (i % 4) + 1),
  }));
  return JSON.stringify({ users, total: users.length, page: 1 }, null, 2);
}
