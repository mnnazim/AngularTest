using Backend.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.API.Data.EentityConfig
{
  public class DeviceEntityConfig : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            //builder.HasOne(e => e.ApplicationUser)
            //    .WithOne(e => e.AdminDetails)
            //    .HasForeignKey<AdminDetails>(e => e.UserId)
            //    .OnDelete(DeleteBehavior.SetNull);
        }
    }
}