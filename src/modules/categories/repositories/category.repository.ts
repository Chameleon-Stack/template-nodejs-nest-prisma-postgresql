import { PrismaService } from '../../../prisma.service';
import { CategoryEntityInterface } from '../interfaces/category-entity.interface';
import { CreateyCategoryDTO } from '../useCases/createCategory/dtos/request/create-category-request.dto';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';

export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async createAndSave(
    { name, color }: CreateyCategoryDTO,
    user: any,
  ): Promise<CategoryEntityInterface> {
    return this.prisma.category.create({
      data: {
        name,
        color,
        user_id: user.id,
      },
    });
  }

  async findAll(
    user_id: string,
    name?: string,
  ): Promise<CategoryEntityInterface[]> {
    return this.prisma.category.findMany({
      where: {
        user_id,
        name: name ? { contains: name.toLowerCase() } : undefined,
      },
    });
  }

  async findById(id: string): Promise<CategoryEntityInterface | null> {
    return this.prisma.category.findFirst({ where: { id } });
  }

  async deleteCategory(category: CategoryEntityInterface): Promise<void> {
    await this.prisma.category.delete({
      where: { id: category.id },
    });
  }
}
