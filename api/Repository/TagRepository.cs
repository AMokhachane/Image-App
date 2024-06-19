using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TagRepository : ITagRepository
    {
        private readonly ApplicationDBContext _context;
        public TagRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Tag> CreateAsync(Tag tagModel)
        {
          await _context.Tags.AddAsync(tagModel);
          await _context.SaveChangesAsync();
          return tagModel;  
        }

        public async Task<Tag?> DeleteAsync(int id)
        {
           var tagModel = await _context.Tags.FirstOrDefaultAsync(x => x.TagId == id);
           if(tagModel == null)
           {
             return null;
           }

           _context.Tags.Remove(tagModel);
           await _context.SaveChangesAsync();
           return tagModel;
        }

        public async Task<List<Tag>> GetAllAsync()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task<Tag?> GetByIdAsync(int id)
        {
            return await _context.Tags.FindAsync(id);
        }

        public async Task<Tag?> UpdateAsync(int id, Tag tagModel)
        {
            var existingTag = await _context.Tags.FindAsync(id);
            if (existingTag == null)
            {
                return null;
            }

            existingTag.TagName = tagModel.TagName;
            existingTag.TagDescription = tagModel.TagDescription;

            await _context.SaveChangesAsync();

            return existingTag;
        }
    }
}