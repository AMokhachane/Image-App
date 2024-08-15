using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Image;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDBContext _context;
        public ImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Image> CreateAsync(Image imageModel, AppUser user)
        {

            var image = new Image
            {
                AppUserId = user.Id,
                Title = imageModel.Title,
                ImageDescription = imageModel.ImageDescription,
                Url = imageModel.Url,
                UploadDate = DateTime.Now 
            };



           await _context.Images.AddAsync(image);
           await _context.SaveChangesAsync();
           return imageModel;
        }

        public async Task<Image?> DeleteAsync(int id)
        {
            var imageModel = await _context.Images.FirstOrDefaultAsync(x => x.ImageId == id);
            if(imageModel == null)
            {
                return null;
            }

           _context.Images.Remove(imageModel);
           await _context.SaveChangesAsync();
           return imageModel; 
        }

        public async Task<List<Image>> GetAllAsync()
        {
           return await _context.Images.ToListAsync();
        
        }

        

        public async Task<Image?> GetByIdAsync(int id)
        {
            return await _context.Images.Include(c => c.Tags).Include(c => c.Comments).FirstOrDefaultAsync(i => i.ImageId == id);
        }

        public async Task<IEnumerable<Image>> GetByUserNameAsync(string userName)
        {
            return await _context.Images
                         .Where(img => img.AppUser.UserName == userName)
                         .ToListAsync();
        }

        public Task<bool> ImageExists(int id)
        {
            return _context.Images.AnyAsync(s => s.ImageId == id);
        }

        public async Task<Image?> UpdateAsync(int id, UpdateImageRequestDto imageDto)
        {
            var existingImage = await _context.Images.FirstOrDefaultAsync(x => x.ImageId == id);
            if(existingImage == null)
            {
                return null;
            }

         existingImage.Title = imageDto.Title;
         existingImage.ImageDescription = imageDto.ImageDescription;
         existingImage.Url = imageDto.Url;

         await _context.SaveChangesAsync();

         return existingImage;
        }
    }
}