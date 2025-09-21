export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  company?: string;
  location: {
    coordinates: [number, number]; // [lng, lat]
  };
}

export interface Course {
  name: string;
  diets?: string;
  price?: string;
}

export interface Menu {
  courses: Course[];
}
