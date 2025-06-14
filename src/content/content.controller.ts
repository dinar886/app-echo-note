import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
    Body,
    Request,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { ContentService } from './content.service';
  import { GenerateContentDto } from './dto/generate-content.dto';
  import { Express } from 'express'; // Important pour le typage de Multer
  
  @Controller('content')
  export class ContentController {
    constructor(private readonly contentService: ContentService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('generate')
    @UseInterceptors(FilesInterceptor('files[]', 20)) // 'files[]' est le nom du champ, 20 est le nombre max de fichiers
    generateContent(
      @Request() req,
      @Body() generateContentDto: GenerateContentDto,
      @UploadedFiles() files: Array<Express.Multer.File>,
    ) {
      const userId = req.user.userId;
      console.log('User ID:', userId);
      console.log('DTO:', generateContentDto);
      console.log('Files received:', files.length);
  
      // Appeler le service pour la logique métier
      return this.contentService.generate(userId, generateContentDto, files);
    }
  }