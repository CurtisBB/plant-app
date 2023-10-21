export interface Plant {
    background_image: string;
    name: string;
    descriptions: Array<Description>;
  }

export interface APIResponse<T> {
    results: Array<T>;
}

interface Description {
    subtitle: string,
    description: string;
  }