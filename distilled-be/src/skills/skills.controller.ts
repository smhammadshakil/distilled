import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SkillEntity } from './entities/skill.entity';

@Controller('skills')
@ApiTags('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiCreatedResponse({ type: SkillEntity })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOkResponse({ type: SkillEntity, isArray: true })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SkillEntity })
  async findOne(@Param('id') id: string) {
    const skill = await this.skillsService.findOne(id);
    if (!skill) {
      throw new NotFoundException(`Skill with id '${id}' does not exist`);
    }
    return skill;
  }

  @Patch(':id')
  @ApiOkResponse({ type: SkillEntity })
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SkillEntity })
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
