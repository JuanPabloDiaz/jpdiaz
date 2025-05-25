import {statSync} from "fs";
import getReadingTime from 'reading-time';
import {toString} from 'mdast-util-to-string';
import {formatDate} from "../utils/formatDate.ts";

export function remarkModifiedTime() {
  return function (tree: any, file: any) {
    if (!file?.data?.astro?.frontmatter) return;
    const filepath = file.history?.[0];
    if (!filepath) return;
    const result = statSync(filepath);
    file.data.astro.frontmatter.lastModified = formatDate(result.mtime);
    const textOnPage = toString(tree);
    file.data.astro.frontmatter.readingTime = getReadingTime(textOnPage);
  };
}
