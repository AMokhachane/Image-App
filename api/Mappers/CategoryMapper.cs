using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Image.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
          return new CategoryDto
          {
            CategoryId = categoryModel.CategoryId,
            CategoryName = categoryModel.CategoryName,
            CategoryDescription = categoryModel.CategoryDescription,
            ImageId = categoryModel.ImageId
          }; 
        }

        public static Category ToCategoryFromCreate(this CreateCategoryDto categoryDto, int imageId)
        {
          return new Category
          {
            
            CategoryName = categoryDto.CategoryName,
            CategoryDescription = categoryDto.CategoryDescription,
            ImageId = imageId
          }; 
        }

        public static Category ToCategoryFromUpdate(this UpdateCategoryRequestDto categoryDto)
        {
          return new Category
          {
            
            CategoryName = categoryDto.CategoryName,
            CategoryDescription = categoryDto.CategoryDescription,
            
          }; 
        }
    }
}