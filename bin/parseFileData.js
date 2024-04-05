#!/usr/bin/env node
import { readFileSync } from "fs";

export default function parseFileData(filePath, getExtension = false) {
  const file = readFileSync(filePath);
  const extension = filePath
    .split("\\")[filePath.split("\\").length - 1]
    .split(".")[1];
  switch (extension) {
    case "json":
      return JSON.parse(file);
    default:
      return file;
  }
}
