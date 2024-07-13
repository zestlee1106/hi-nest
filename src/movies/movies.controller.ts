import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return on movie with the id: ${id}`;
  }

  @Post()
  createMovie() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string) {
    return `This will update a movie with the id :${movieId}`;
  }
}
