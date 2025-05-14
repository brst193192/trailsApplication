using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

public partial class TrailsDbContext : DbContext
{
    public TrailsDbContext()
    {
    }

    public TrailsDbContext(DbContextOptions<TrailsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<FavoriteTrailsTbl> FavoriteTrailsTbls { get; set; }

    public virtual DbSet<TrailsTbl> TrailsTbls { get; set; }

    public virtual DbSet<UsersTbl> UsersTbls { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-783IDMP\\SQLEXPRESS;Database=TrailsDB; Trusted_Connection=True; MultipleActiveResultSets=True; Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FavoriteTrailsTbl>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorite__3214EC07AC24C205");

            entity.ToTable("FavoriteTrailsTbl");

            entity.HasOne(d => d.Trail).WithMany(p => p.FavoriteTrailsTbls)
                .HasForeignKey(d => d.TrailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavoriteTrailsTbl_Trails");

            entity.HasOne(d => d.User).WithMany(p => p.FavoriteTrailsTbls)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavoriteTrailsTbl_Users");
        });

        modelBuilder.Entity<TrailsTbl>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TrailsTb__3214EC07C68AA7B6");

            entity.ToTable("TrailsTbl");

            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.HowToCome).HasMaxLength(4000);
            entity.Property(e => e.MoreInfo).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Src).HasMaxLength(50);
            entity.Property(e => e.WaysInTrail).HasMaxLength(4000);

            entity.HasOne(d => d.User).WithMany(p => p.TrailsTbls)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TrailsTbl__UserI__3D5E1FD2");
        });

        modelBuilder.Entity<UsersTbl>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UsersTbl__3214EC0727BEC25C");

            entity.ToTable("UsersTbl");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
