const baseUrl = "https://admin.crystalight.com.sg/wp-json/wp/v2";

let headers = new Headers();
headers.append(
  "Authorization",
  "Basic " +
    btoa(import.meta.env.WP_USERNAME + ":" + import.meta.env.WP_PASSWORD),
);

export interface Catalogue {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    description: string;
    catalogue_format: "pdf" | "flipbook";
    pdf_details: {
      pdf_file: number;
      image_pdf: number;
    };
    flipbook_details: {
      flipbook_postid: number;
      image_flipbook?: number;
      slug: string;
    };
  };
}

interface MainCatalogue extends Catalogue {}
export const getMainCatalogues = async (): Promise<MainCatalogue[]> => {
  return await fetch(`${baseUrl}/catalogue_main`, { headers }).then((res) =>
    res.json(),
  );
};

interface SmallCatalogue extends Catalogue {
  "catalogue-category"?: number[];
}
export const getSmallCatalogues = async (): Promise<SmallCatalogue[]> => {
  return await fetch(`${baseUrl}/catalogue_small`, { headers }).then((res) =>
    res.json(),
  );
};

interface CatalogueCategory {
  id: number;
  name: string;
}
export const getCatalogueCategories = async (): Promise<
  CatalogueCategory[]
> => {
  return await fetch(`${baseUrl}/catalogue-category`, { headers }).then((res) =>
    res.json(),
  );
};

interface Media {
  id: number;
  title: {
    rendered: string;
  };
  source_url: string;
}
export const getMedia = async (id?: number): Promise<Media> => {
  return await fetch(`${baseUrl}/media/${id}`, { headers }).then((res) =>
    res.json(),
  );
};

interface Flipbook {
  id: number;
  meta: {
    flipbook_id?: string;
  };
}
export const getFlipbook = async (id: number): Promise<Flipbook> => {
  return await fetch(`${baseUrl}/flipbook/${id}`, { headers }).then((res) =>
    res.json(),
  );
};
