using CustomerSupportCase.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace CustomerSupportCase.Data
{
    public class AppDbContext:DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
        {
        }
        public DbSet<SupportCase> SupportCases => Set<SupportCase>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<SupportCase> (entity=>{

                entity.HasKey(x => x.ID);
                entity.Property(x => x.ReferenceNo).IsRequired().HasMaxLength(50);
                entity.Property(x => x.CustomerName).IsRequired().HasMaxLength(200);
                entity.Property(x => x.CustomerEmail).IsRequired().HasMaxLength(200);
                entity.Property(x => x.Subject).IsRequired().HasMaxLength(200);
                entity.Property(x => x.Description).IsRequired().HasMaxLength(2000);




            });


        }

    }
}
