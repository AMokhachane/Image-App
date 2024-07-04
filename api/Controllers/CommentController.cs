using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
       private readonly ICommentRepository _commentRepo;
       private readonly IImageRepository _imageRepo;
       public CommentController(ICommentRepository commentRepo, IImageRepository imageRepo)
       {
         _commentRepo = commentRepo;
         _imageRepo = imageRepo;
       }

       [HttpGet]
       public async Task<IActionResult> GetAll()
       {
         if (!ModelState.IsValid)
         return BadRequest(ModelState);

         var comments = await _commentRepo.GetAllAsync();
         var CommentDto = comments.Select(s => s.ToCommentDto());
         return Ok(CommentDto);
       }

       [HttpGet("{id:int}")]
       public async Task<IActionResult> GetById([FromRoute] int id)
       {
         if(!ModelState.IsValid)
         return BadRequest(ModelState);
          var comment = await _commentRepo.GetByIdAsync(id);

         if(comment == null)
         {
            return NotFound();
         }

            return Ok(comment.ToCommentDto());
       }

       [HttpPost("{imageId:int}")]
       public async Task<IActionResult> Create([FromRoute] int imageId, CreateCommentDto commentDto)
       {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);

          if (!await _imageRepo.ImageExists(imageId))
          {
             return BadRequest("Image does not exist");
          }

          var commentModel = commentDto.ToCommentFromCreate(imageId);
          await _commentRepo.CreateAsync(commentModel);
          return CreatedAtAction(nameof(GetById), new { imageId = commentModel}, commentModel.ToCommentDto());
       }

       [HttpPut]
       [Route("{id:int}")]
       public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
       {
          if (!ModelState.IsValid)
         return BadRequest(ModelState);

            var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());
            if (comment == null)
            {
               return NotFound("Comment not found");
            }

            return Ok(comment.ToCommentDto());
       }

       [HttpDelete]
       [Route("{id:int}")]
       public async Task<IActionResult> Delete([FromRoute] int id)
       {
          if (!ModelState.IsValid)
         return BadRequest(ModelState);

          var commentModel = await _commentRepo.DeleteAsync(id);
          if (commentModel == null)
          {
             return NotFound("Comment does not exist");
          }

          return Ok(commentModel);
       }
    }
}