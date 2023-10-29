export interface Plant {
    id: number;
    default_image: DefaultImage | null;
    common_name: string;
    scientific_name: string;
    description: string;
  }

export interface APIResponse<T> {
    data: Array<T>;
}

interface DefaultImage {
  regular_url: string | null;
}