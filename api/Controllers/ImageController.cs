using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/image")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepo;
        public ImageController(IImageRepository imageRepo)
        {
            _imageRepo = imageRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var images = await _imageRepo.GetAllAsync();
            var ImageDto = images.Select(s => s.ToImageDto());
            return Ok(ImageDto);
        }

        [HttpGet("{id}")]
       public async Task<IActionResult> GetById([FromRoute] int id)
       {
           var image = await _imageRepo.GetByIdAsync(id);

           if(image == null)
           {
                return NotFound(); 
           }

           return Ok(image.ToImageDto());
       }

    }
}