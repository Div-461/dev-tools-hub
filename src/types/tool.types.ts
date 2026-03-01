import { FileJson, FileSpreadsheet, FileCode, Lock, Clock, Key, Database, Braces } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ToolInfo {
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
}

export const tools: ToolInfo[] = [
  { name: "JSON Viewer", path: "/json-viewer", description: "View and explore large JSON files with a virtualized tree", icon: Braces },
  { name: "JSON to CSV", path: "/json-to-csv", description: "Convert JSON arrays to CSV format instantly", icon: FileJson },
  { name: "CSV to JSON", path: "/csv-to-json", description: "Parse CSV data into structured JSON", icon: FileSpreadsheet },
  { name: "XML Formatter", path: "/xml-formatter", description: "Pretty-print and validate XML documents", icon: FileCode },
  { name: "Base64", path: "/base64", description: "Encode and decode Base64 strings", icon: Lock },
  { name: "Timestamp", path: "/timestamp", description: "Convert between Unix timestamps and dates", icon: Clock },
  { name: "JWT Decoder", path: "/jwt-decoder", description: "Decode and inspect JSON Web Tokens", icon: Key },
  { name: "SQL Formatter", path: "/sql-formatter", description: "Format SQL queries with proper indentation", icon: Database },
];
