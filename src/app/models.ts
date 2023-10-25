export interface Plant {
    id: number;
    default_image: DefaultImage | null;
    common_name: string;
    descriptions: Array<Description>;
  }

export interface APIResponse<T> {
    data: Array<T>;
}

interface Description {
    subtitle: string,
    description: string;
  }

interface DefaultImage {
  regular_url: string | null;
}