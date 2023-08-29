import { getMedia } from "../services/wpService";

export interface CatalogueProps {
  title: string;
  description?: string;
  imagePdfId?: number;
  imageFlipbookId?: number;
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
    image = (await getMedia(props.imageFlipbookId)).source_url;

    // Use first image of FlipBook if preview image is not defined
    if (!image) {
      image = `https://admin.crystalight.com.sg/wp-content/uploads/flipbook/${props.flipbookId}/files/page/1.jpg`;
    }
  }

  if (props.catalogueFormat === "pdf") {
    url = (await getMedia(props.pdfFileId)).source_url;
    image = (await getMedia(props.imagePdfId)).source_url;
  }

  if (!image) {
    image = "/catalogue_placeholder.svg";
  }

  return { image, url };
};
