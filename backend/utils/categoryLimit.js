import Category from "../models/category.model.js";
import ChromatographyCategory from "../models/chromatographyCategory.model.js";

export const CATEGORY_LIMIT = 25;

export const getCategoryLimitStatus = async () => {
    const [productCategoryCount, chromatographyCategoryCount] = await Promise.all([
        Category.countDocuments(),
        ChromatographyCategory.countDocuments(),
    ]);
    const count = productCategoryCount + chromatographyCategoryCount;

    return {
        count,
        limit: CATEGORY_LIMIT,
        remaining: Math.max(CATEGORY_LIMIT - count, 0),
        canAdd: count < CATEGORY_LIMIT,
    };
};
