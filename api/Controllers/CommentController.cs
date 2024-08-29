using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IImageRepository _imageRepo;
        private readonly UserManager<AppUser> _userManager;

        public CommentController(ICommentRepository commentRepo, IImageRepository imageRepo, UserManager<AppUser> userManager)
        {
            _commentRepo = commentRepo;
            _imageRepo = imageRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepo.GetAllAsync();
            var CommentDto = comments.Select(s => s.ToCommentDto());
            return Ok(CommentDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpGet("by-image/{imageId:int}")]
public async Task<IActionResult> GetByImageId([FromRoute] int imageId)
{
    var comments = await _commentRepo.GetByImageIdAsync(imageId);

    if (comments == null || !comments.Any())
    {
        return NotFound("No comments found for this image.");
    }

    var commentDtos = comments.Select(c => c.ToCommentDto());
    return Ok(commentDtos);
}

      [HttpPost("{imageId:int}")]
      public async Task<IActionResult> Create([FromRoute] int imageId, [FromBody] CreateCommentDto commentDto)
      {
         if (!ModelState.IsValid)
            return BadRequest(ModelState);

         if (!await _imageRepo.ImageExists(imageId))
         {
            return BadRequest("Image does not exist");
         }

         var commentModel = commentDto.ToCommentFromCreate(imageId);
         var UserName = User.GetUsername();
         var user = await _userManager.FindByNameAsync(UserName);

         // Ensure the AppUserId is set
         commentModel.AppUserId = user.Id;

         await _commentRepo.CreateAsync(commentModel);
         return CreatedAtAction(nameof(GetById), new { id = user.Id }, commentModel.ToCommentDto());
      }

      [HttpPut("{commentId:int}")]
        public async Task<IActionResult> Update([FromRoute] int commentId, [FromBody] UpdateCommentRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.UpdateAsync(commentId, updateDto.ToCommentFromUpdate());

            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var commentModel = await _commentRepo.DeleteAsync(id);

            if (commentModel == null)
            {
                return NotFound("Comment does not exist");
            }

            return Ok(commentModel);
        }
    }
}