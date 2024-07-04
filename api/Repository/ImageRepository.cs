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

        public async Task<Image> CreateAsync(Image imageModel)
        {
           await _context.Images.AddAsync(imageModel);
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

        public async Task<List<Image>> GetAllAsync(QueryObject query)
        {
           var images = _context.Images.Include(c => c.Tags).Include(c => c.Comments).AsQueryable();
           if(!string.IsNullOrWhiteSpace(query.Title))
           {
             images = images.Where(s => s.Title.Contains(query.Title));
           }

           var skipNumber = (query.PageNumber - 1) * query.PageSize;

         return await images.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        
        }

        public async Task<Image?> GetByIdAsync(int id)
        {
            return await _context.Images.Include(c => c.Tags).Include(c => c.Comments).FirstOrDefaultAsync(i => i.ImageId == id);
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