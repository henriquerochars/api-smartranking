import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;

    const categoryFound = await this.categoryModel
      .findOne({
        category: category,
      })
      .exec();

    if (categoryFound) {
      throw new BadRequestException(`Category ${category} already registred`);
    }

    const categoryCreated = new this.categoryModel(createCategoryDto);
    return await categoryCreated.save();
  }

  async getAllCategories(): Promise<Array<Category>> {
    return await this.categoryModel.find().exec();
  }

  async getCategoryById(category: string): Promise<Category> {
    const categoryFound = await this.categoryModel
      .findOne({ category: category })
      .exec();

    if (!categoryFound) {
      throw new NotFoundException(`Category ${category} not found`);
    }

    return categoryFound;
  }
}
