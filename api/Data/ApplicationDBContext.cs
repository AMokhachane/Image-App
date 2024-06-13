using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
       public ApplicationDBContext(DbContextOptions dbContextOptions)
       : base(dbContextOptions)
       {
        
       }

       public DbSet<User> Users { get; set;}
       public DbSet<Image> Images { get; set;}
       public DbSet<Genre> Genres { get; set;}

    }
}