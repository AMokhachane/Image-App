using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Image.Tag;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/tag")]
    [ApiController]
    public class TagController : ControllerBase
    {
       private readonly ITagRepository _tagRepo;
       private readonly IImageRepository _imageRepo;
       public TagController(ITagRepository tagRepo, IImageRepository imageRepo)
       {
         _tagRepo = tagRepo;
         _imageRepo = imageRepo;
       }

       [HttpGet]
       public async Task<IActionResult> GetAll()
       {
         if (!ModelState.IsValid)
            return BadRequest(ModelState);

         var tags = await _tagRepo.GetAllAsync();
         var tagDto = tags.Select(s => s.ToTagDto());
         return Ok(tagDto);
       }

        [HttpGet("{id:int}")]
       public async Task<IActionResult> GetById([FromRoute] int id)
       {  
            if (!ModelState.IsValid)
            return BadRequest(ModelState);
           var tag = await _tagRepo.GetByIdAsync(id);

           if(tag == null)
           {
                return NotFound(); 
           }

           return Ok(tag.ToTagDto());
       }

       [HttpPost("{imageId:int}")]
       public async Task<IActionResult> Create([FromRoute] int imageId, CreateTagDto tagDto)
       {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);

          if (!await _imageRepo.ImageExists(imageId))
          {
            return BadRequest("Image does not exist");
          }

          var tagModel = tagDto.ToTagFromCreate(imageId);
          await _tagRepo.CreateAsync(tagModel);
          return CreatedAtAction(nameof(GetById), new {id = tagModel.TagId}, tagModel.ToTagDto());
       }

       [HttpPut]
       [Route("{id:int}")]
      public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTagRequestDto updateDto)
       {
         if (!ModelState.IsValid)
         return BadRequest(ModelState);

         var tag = await _tagRepo.UpdateAsync(id, updateDto.ToTagFromUpdate());
         if (tag == null)
         {
           return NotFound("Tag not found");
         }

         return Ok(tag.ToTagDto());
       }

       [HttpDelete]
       [Route("{id:int}")]
       public async Task<IActionResult> Delete([FromRoute] int id)
       {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);
          
          var tagModel = await _tagRepo.DeleteAsync(id);
          if(tagModel == null)
          {
             return NotFound("Tag does not exist");
          }

          return Ok(tagModel);
       }
    }
}