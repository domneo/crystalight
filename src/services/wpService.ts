const baseUrl = "https://admin.crystalight.com.sg/wp-json/wp/v2";

export interface Catalogue {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    description: string;
    image: number;
    catalogue_format: "pdf" | "flipbook";
    pdf_file?: number;
    flipbook_id?: string;
    slug?: string;
  };
}

interface MainCatalogue extends Catalogue {}
export const getMainCatalogues = async (): Promise<MainCatalogue[]> => {
  return await fetch(`${baseUrl}/catalogue_main`).then((res) => res.json());
};

interface SmallCatalogue extends Catalogue {
  "catalogue-category"?: number[];
}
export const getSmallCatalogues = async (): Promise<SmallCatalogue[]> => {
  return await fetch(`${baseUrl}/catalogue_small`).then((res) => res.json());
};

interface CatalogueCategory {
  id: number;
  name: string;
}
export const getCatalogueCategories = async (): Promise<
  CatalogueCategory[]
> => {
  return await fetch(`${baseUrl}/catalogue-category`).then((res) => res.json());
};

interface Media {
  id: number;
  title: {
    rendered: string;
  };
  source_url: string;
}
export const getMedia = async (id?: number): Promise<Media> => {
  return await fetch(`${baseUrl}/media/${id}`).then((res) => res.json());
};
