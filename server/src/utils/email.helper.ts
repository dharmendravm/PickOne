import * as path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

export const renderEmailEjs = async (
  filename: string,
  payload: any,
): Promise<string> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const html: string = await ejs.renderFile(
    path.resolve(__dirname, "..", "views", "emails", filename),
    payload,
  );

  return html;
};
