using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Image;
using api.Models;

namespace api.Mappers
{
    public static class ImageMappers
    {
        public static ImageDto ToImageDto(this Image imageModel)
        {
            return new ImageDto
            {
                ImageId = imageModel.ImageId,
                Title = imageModel.Title,
                ImageDescription = imageModel.ImageDescription,
                Url = imageModel.Url,
                UploadDate = imageModel.UploadDate

            };
        }

        public static Image ToImageFromCreateDTO(this CreateImageRequestDto imageDto)
        {
            return new Image
            {
                // Symbol = imageDto.Symbol,
                Title = imageDto.Title,
                ImageDescription = imageDto.ImageDescription,
                Url = imageDto.Url,
                UploadDate = imageDto.UploadDate
            };
        }
    }
}