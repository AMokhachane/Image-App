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
using api.Helpers;

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
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var images = await _imageRepo.GetAllAsync(query: query);
            var ImageDto = images.Select(s => s.ToImageDto());

            return Ok(images);
        }

        [HttpGet("{id:int}")]
       public async Task<IActionResult> GetById([FromRoute] int id)
       {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

           var image = await _imageRepo.GetByIdAsync(id);

           if(image == null)
           {
                return NotFound(); 
           }

           return Ok(image.ToImageDto());
       }

       [HttpPost]
       public async Task<IActionResult> Create([FromBody] CreateImageRequestDto imageDto)
       {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var imageModel = imageDto.ToImageFromCreateDTO();
            await _imageRepo.CreateAsync(imageModel);
            return CreatedAtAction(nameof(GetById), new {id = imageModel.ImageId }, imageModel.ToImageDto());
       }

       [HttpPut]
       [Route("{id:int}")]
       public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateImageRequestDto updateDto)
       {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

         var imageModel = await _imageRepo.UpdateAsync(id, updateDto);

         if(imageModel == null)
         {
            return NotFound();
         }

         return Ok(imageModel.ToImageDto());

       }

       [HttpDelete]
       [Route("{id:int}")]
       public async Task<IActionResult> Delete([FromRoute] int id)
       {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

         var imageModel = await _imageRepo.DeleteAsync(id);

         if(imageModel == null)
         {
            return NotFound();
         }

         return NoContent();

       }

    }
}