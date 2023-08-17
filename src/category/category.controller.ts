import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoryService } from './category.service';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Array<Category>> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:category')
  async getCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoryService.getCategoryById(category);
  }
}
