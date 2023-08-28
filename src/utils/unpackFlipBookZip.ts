import fs from "fs";
import { readFile } from "fs/promises";
import JSZip from "jszip";
import { parse } from "node-html-parser";

const appendPublicFolder = (fileData: string, publicFolder: string) => {
  const publicFolderEncoded = encodeURI(publicFolder);
  return fileData
    .replaceAll(/\/files\//gi, "/" + publicFolderEncoded + "/files/")
    .replaceAll(/"files\//gi, '"' + publicFolderEncoded + "/files/")
    .replaceAll(/'files\//gi, "'" + publicFolderEncoded + "/files/")
    .replaceAll(/\/javascript\//gi, "/" + publicFolderEncoded + "/javascript/")
    .replaceAll(/"javascript\//gi, '"' + publicFolderEncoded + "/javascript/")
    .replaceAll(/'javascript\//gi, "'" + publicFolderEncoded + "/javascript/")
    .replaceAll(/\/style\//gi, "/" + publicFolderEncoded + "/style/")
    .replaceAll(/"style\//gi, '"' + publicFolderEncoded + "/style/")
    .replaceAll(/'style\//gi, "'" + publicFolderEncoded + "/style/");
};

export const unpackFlipBookZip = async (zipBuffer: ArrayBuffer) => {
  let rootPath;

  // Load the zip file as an object
  const zip = await JSZip.loadAsync(zipBuffer);

  // Create directories
  for (const file in zip.files) {
    if (Object.prototype.hasOwnProperty.call(zip.files, file)) {
      const fileObj = zip.files[file];
      if (fileObj.name.endsWith("/")) {
        const publicDir = `public/${fileObj.name}`;
        try {
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  // Extract files
  for (const file in zip.files) {
    if (Object.prototype.hasOwnProperty.call(zip.files, file)) {
      const fileObj = zip.files[file];
      const isRootFile = fileObj.name.split("/").length === 2;
      const elementExt = fileObj.name.split(".").pop();

      if (!fileObj.name.endsWith("/")) {
        const filePathArr = fileObj.name.split("/");
        const filePath = filePathArr.join("/");
        const fileName = filePathArr.pop();

        // Extract plaintext files to public directory
        if (["svg", "js", "css", "html"].includes(elementExt || "")) {
          const fileData = await fileObj.async("string");
          let updatedFileData = appendPublicFolder(fileData, filePathArr[0]);

          let writePath = "";
          if (isRootFile) {
            // Only root HTML file should be extracted to pages directory
            rootPath = encodeURI(fileName || "");
            writePath = `src/pages/${fileName}`;

            // Add a custom styles and back button
            const html = parse(updatedFileData);
            const head = html.querySelector("head");
            const body = html.querySelector("body");
            const backIcon = await readFile(
              "public/icon-undo-2-dark.svg",
              "utf8"
            );

            head?.insertAdjacentHTML(
              "beforeend",
              `<link rel="stylesheet" href="flipBook.css" />`
            );
            body?.insertAdjacentHTML(
              "beforeend",
              `<a id="backBtn" href="/" title="Back to catalogues" style="display:flex; align-items:center; gap:8px;">${backIcon} Back to catalogues</a>`
            );

            updatedFileData = html.toString();
          } else {
            writePath = `public/${filePath}`;
          }
          fs.writeFile(writePath, updatedFileData, {}, (err) => {
            if (err) {
              console.error(err);
            }
            // file written successfully
          });
        }

        // Extract static binary assets to public directory
        if (
          ["mp3", "ogg", "jpg", "jpeg", "png", "gif"].includes(elementExt || "")
        ) {
          const fileData = await fileObj.async("uint8array");
          const blob = new Blob([fileData]);
          fs.writeFile(
            `public/${filePath}`,
            Buffer.from(await blob.arrayBuffer()),
            {},
            (err) => {
              if (err) {
                console.error(err);
              }
              // file written successfully
            }
          );
        }
      }
    }
  }

  return { rootPath };
};
