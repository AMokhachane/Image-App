using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Image;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IImageRepository
    {
       Task<List<Image>> GetAllAsync();
       Task<Image?> GetByIdAsync(int id);
       Task<Image> CreateAsync(Image imageModel, AppUser user);
       Task<Image?> UpdateAsync(int id, UpdateImageRequestDto imageDto);
       Task<Image?> DeleteAsync(int id);
       Task<bool> ImageExists(int id);
       Task<IEnumerable<Image>> GetByUserNameAsync(string userName);
    }
}