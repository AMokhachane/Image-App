using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Image;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/image")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepo;
        private readonly ApplicationDBContext _context;
         private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        public ImageController(IImageRepository imageRepo, ApplicationDBContext context, UserManager<AppUser> userManager,SignInManager<AppUser> signInManager)
        {
            _imageRepo = imageRepo;
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var images = await _imageRepo.GetAllAsync();
            var ImageDto = images.Select(s => s.ToImageDto()).ToList();

            return Ok(ImageDto);
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

       [HttpGet("user/{userName}")]
public async Task<IActionResult> GetByUserName([FromRoute] string userName)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var images = await _imageRepo.GetByUserNameAsync(userName);

    if (images == null || !images.Any())
    {
        return NotFound("No images found for this user.");
    }

    var imageDtos = images.Select(s => s.ToImageDto()).ToList();

    return Ok(imageDtos);
}

       [HttpPost]
       //[Authorize]
        public async Task<IActionResult> Create([FromBody] CreateImageRequestDto imageDto)
        {
                if (!ModelState.IsValid)
                return BadRequest(ModelState);

                var email = User.GetUserEmail();
                if (string.IsNullOrEmpty(email))
                    return Unauthorized("User name not found in claims.");

                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                    return NotFound("User not found.");

                var imageModel = imageDto.ToImageFromCreateDTO();

                
                await _imageRepo.CreateAsync(imageModel, user);
                //return CreatedAtAction(nameof(GetById), new {id = imageModel.ImageId }, imageModel.ToImageDto());
                return Ok("Image successfully uploaded.");
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