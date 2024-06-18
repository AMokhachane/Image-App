using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using api.Dtos.Image;
using api.Data;

namespace api.Controllers
{
    [Route("api/image")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepo;
        private readonly ApplicationDBContext _context;
        public ImageController(IImageRepository imageRepo, ApplicationDBContext context)
        {
            _imageRepo = imageRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var images = await _imageRepo.GetAllAsync();
            var ImageDto = images.Select(s => s.ToImageDto());

            return Ok(images);
        }

        [HttpGet("{id}")]
       public async Task<IActionResult> GetById([FromRoute] int id)
       {
           var image = await _context.Images.FindAsync(id);

           if(image == null)
           {
                return NotFound(); 
           }

           return Ok(image.ToImageDto());
       }

       [HttpPost]
       public async Task<IActionResult> Create([FromBody] CreateImageRequestDto imageDto)
       {
            var imageModel = imageDto.ToImageFromCreateDTO();
            await _context.AddAsync(imageModel);
            
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new {id = imageModel.ImageId }, imageModel.ToImageDto());
       }

       [HttpPut]
       [Route("{id}")]
       public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateImageRequestDto updateDto)
       {
         var imageModel = await _context.Images.FirstOrDefaultAsync(x => x.ImageId == id);

         if(imageModel == null)
         {
            return NotFound();
         }

        //  imageModel.Symbol = updateDto.Symbol;
         imageModel.Title = updateDto.Title;
         imageModel.ImageDescription = updateDto.ImageDescription;
         imageModel.Url = updateDto.Url;

         await _context.SaveChangesAsync();

         return Ok(imageModel.ToImageDto());

       }

       [HttpDelete]
       [Route("{id}")]
       public async Task<IActionResult> Delete([FromRoute] int id)
       {
         var imageModel = await _context.Images.FirstOrDefaultAsync(x => x.ImageId == id);

         if(imageModel == null)
         {
            return NotFound();
         }

         _context.Images.Remove(imageModel);

         await _context.SaveChangesAsync();

         return NoContent();

       }

    }
}