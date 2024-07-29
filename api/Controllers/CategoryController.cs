using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Image.Category;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
       private readonly ICategoryRepository _categoryRepo;
       private readonly IImageRepository _imageRepo;
       public CategoryController(ICategoryRepository categoryRepo, IImageRepository imageRepo)
       {
         _categoryRepo = categoryRepo;
         _imageRepo = imageRepo;
       }

       [HttpGet]
       public async Task<IActionResult> GetAll()
       {
         if (!ModelState.IsValid)
            return BadRequest(ModelState);

         var categories = await _categoryRepo.GetAllAsync();
         var categoryDto = categories.Select(s => s.ToCategoryDto());
         return Ok(categoryDto);
       }

        [HttpGet("{id:int}")]
       public async Task<IActionResult> GetById([FromRoute] int id)
       {  
            if (!ModelState.IsValid)
            return BadRequest(ModelState);
           var category = await _categoryRepo.GetByIdAsync(id);

           if(category == null)
           {
                return NotFound(); 
           }

           return Ok(category.ToCategoryDto());
       }

       [HttpPost("{imageId:int}")]
       public async Task<IActionResult> Create([FromRoute] int imageId, CreateCategoryDto categoryDto)
       {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);

          if (!await _imageRepo.ImageExists(imageId))
          {
            return BadRequest("Image does not exist");
          }

          var categoryModel = categoryDto.ToCategoryFromCreate(imageId);
          await _categoryRepo.CreateAsync(categoryModel);
          return CreatedAtAction(nameof(GetById), new {id = categoryModel.CategoryId}, categoryModel.ToCategoryDto());
       }

       [HttpPut]
       [Route("{id:int}")]
      public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoryRequestDto updateDto)
       {
         if (!ModelState.IsValid)
         return BadRequest(ModelState);

         var category = await _categoryRepo.UpdateAsync(id, updateDto.ToCategoryFromUpdate());
         if (category == null)
         {
           return NotFound("Category not found");
         }

         return Ok(category.ToCategoryDto());
       }

       [HttpDelete]
       [Route("{id:int}")]
       public async Task<IActionResult> Delete([FromRoute] int id)
       {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);
          
          var categoryModel = await _categoryRepo.DeleteAsync(id);
          if(categoryModel == null)
          {
             return NotFound("Category does not exist");
          }

          return Ok(categoryModel);
       }
    }
}