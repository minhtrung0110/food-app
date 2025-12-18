import { foodCategoriesSample } from '@/libs/seed/food-category';

export const fetchListFoodCategory = () => {
  try {
    // const res = await api.get('/food-category');
    // return res.data;
    return foodCategoriesSample;
  } catch (error) {
    console.log(error);
    return [];
  }
};
