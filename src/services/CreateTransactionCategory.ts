import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  category: string;
}

class CreateTransactionCategory {
  public async execute({ category }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const checkCategoryExists = await categoryRepository.findOne({
      where: { category },
    });

    let newCategory = categoryRepository.create({
      title: category,
    });
    const category_id = newCategory.id;

    if (checkCategoryExists) {
      newCategory = categoryRepository.create({
        id: category_id,
        title: category,
      });
    }

    await categoryRepository.save(newCategory);

    return newCategory;
  }
}

export default CreateTransactionCategory;
