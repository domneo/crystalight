import { getFlipbook, getMedia } from "../services/wpService";

export interface CatalogueProps {
  title: string;
  description?: string;
  imagePdfId?: number;
  imageFlipbookId?: number;
  catalogueFormat: "pdf" | "flipbook";
  pdfFileId?: number;
  flipbookPostId?: number;
  slug?: string;
}

export const generateCatalogueData = async (props: CatalogueProps) => {
  let image;
  let url;

  if (props.catalogueFormat === "flipbook") {
    url = `/catalogues/flip/${props.slug}`;
    image = (await getMedia(props.imageFlipbookId)).source_url;

    // Use first image of FlipBook if preview image is not defined
    if (!image) {
      const flipbook = await getFlipbook(props.flipbookPostId!);
      image = `https://admin.crystalight.com.sg/wp-content/uploads/flipbook/${flipbook.meta.flipbook_id}/files/page/1.png`;
    }
  }

  if (props.catalogueFormat === "pdf") {
    url = `/catalogues/pdf/${props.pdfFileId}`;
    image = (await getMedia(props.imagePdfId)).source_url;
  }

  if (!image) {
    image = "/catalogue_placeholder.svg";
  }

  return { image, url };
};
