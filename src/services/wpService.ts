const baseUrl = "https://admin.crystalight.com.sg/wp-json/wp/v2";

interface Catalogue {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    description: string;
    file: number;
    image: number;
    size: "lg" | "sm";
    buttonText: string;
  };
}
export const getMainCatalogues = async (): Promise<Catalogue[]> => {
  return await fetch(`${baseUrl}/catalogue_main`).then((res) => res.json());
};

export const getSmallCatalogues = async (): Promise<Catalogue[]> => {
  return await fetch(`${baseUrl}/catalogue_small`).then((res) => res.json());
};

interface Media {
  id: number;
  title: {
    rendered: string;
  };
  source_url: string;
}
export const getMedia = async (id: number): Promise<Media> => {
  return await fetch(`${baseUrl}/media/${id}`).then((res) => res.json());
};
