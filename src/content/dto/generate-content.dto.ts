import {
    IsString,
    IsOptional,
    IsInt,
    IsBoolean,
    IsEnum,
    IsArray,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  // Correspond aux AppModes du code Flutter
  export enum AppMode {
    Quiz = 'quiz',
    Summary = 'summary',
    Flashcards = 'flashcards',
    FillInBlank = 'fill_in_blank',
    Vocabulary = 'vocabulary',
    Podcast = 'podcast',
  }
  
  export class GenerateContentDto {
    @IsOptional()
    @IsString()
    extractedText?: string;
  
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    selectedQuestionCount: number;
  
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    mcqEnabled: boolean;
  
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    trueFalseEnabled: boolean;
  
    @IsEnum(AppMode)
    selectedMode: AppMode;
  
    @IsString()
    forcedLanguage: string;
  
    @IsString()
    targetLanguage: string;
    
    @IsOptional()
    @IsString()
    apiInstruction?: string;
  }