using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Image.Tag;
using api.Models;

namespace api.Mappers
{
    public static class TagMapper
    {
        public static TagDto ToTagDto(this Tag tagModel)
        {
          return new TagDto
          {
            TagId = tagModel.TagId,
            TagName = tagModel.TagName,
            TagDescription = tagModel.TagDescription,
            ImageId = tagModel.ImageId
          }; 
        }

        public static Tag ToTagFromCreate(this CreateTagDto tagDto, int imageId)
        {
          return new Tag
          {
            
            TagName = tagDto.TagName,
            TagDescription = tagDto.TagDescription,
            ImageId = imageId
          }; 
        }

        public static Tag ToTagFromUpdate(this UpdateTagRequestDto tagDto)
        {
          return new Tag
          {
            
            TagName = tagDto.TagName,
            TagDescription = tagDto.TagDescription,
            
          }; 
        }
    }
}