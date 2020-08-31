using System;
using Backend.API.Data.EentityConfig;
using Backend.API.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.API.Data
{
    public class ApplicationDbContext : DbContext
    {
         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Device> Devices { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<TemplateGroup> TemplateGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new TemplateEntityConfig());
            builder.ApplyConfiguration(new TemplateGroupEntityConfig());
            builder.ApplyConfiguration(new DeviceEntityConfig());
           
        }
    }
}