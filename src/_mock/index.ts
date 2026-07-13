export type Photo = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  categoryId: string;
};

export type PhotoWithCategory = Photo & {
  category: Category;
};

export type Category = {
  id: string;
  name: string;
  label: string;
  description: string;
  imageUrl: string;
};

export type CategoryWithPhotos = Category & {
  photos: Photo[];
}

export type Like = {
  id: string;
  userId: string;
  photoId: string;
}