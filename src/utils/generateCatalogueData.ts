import pdfJS from "pdfjs-dist";
import { getMedia } from "../services/wpService";
import { NodeCanvasFactory } from "./nodeCanvasFactory";

export interface CatalogueProps {
  title: string;
  description?: string;
  imageId?: number;
  catalogueFormat: "pdf" | "flipbook";
  pdfFileId?: number;
  flipbookId?: string;
  slug?: string;
}

export const generateCatalogueData = async (props: CatalogueProps) => {
  let image;
  let url;

  if (props.catalogueFormat === "flipbook") {
    url = `/catalogues/${props.slug}`;
    image = (await getMedia(props.imageId)).source_url;

    if (!image) {
      image = `https://admin.crystalight.com.sg/wp-content/uploads/flipbook/${props.flipbookId}/files/page/1.jpg`;
    }
  }

  if (props.catalogueFormat === "pdf") {
    url = (await getMedia(props.pdfFileId)).source_url;
    image = (await getMedia(props.imageId)).source_url;

    // Use first image of PDF if preview image is not defined
    if (!image) {
      const canvasFactory = new NodeCanvasFactory();

      // Load the PDF file
      const pdf = await pdfJS.getDocument({ url, canvasFactory }).promise;

      // Get the first page
      const page = await pdf.getPage(1);

      // Render the page on a Node canvas with 100% scale
      const viewport = page.getViewport({ scale: 1 });
      const canvasAndContext = canvasFactory.create(
        viewport.width,
        viewport.height
      );
      const renderContext = {
        canvasContext:
          canvasAndContext.context as unknown as CanvasRenderingContext2D,
        viewport,
      };
      await page.render(renderContext).promise;

      // Convert the canvas to an image buffer.
      image = canvasAndContext.canvas.toDataURL("image/jpeg");
      // Release page resources.
      page.cleanup();
    }
  }

  return { image, url };
};
