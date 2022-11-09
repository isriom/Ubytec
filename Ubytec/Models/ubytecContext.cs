using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Ubytec.Models
{
    public partial class ubytecContext : DbContext
    {
        public ubytecContext()
        {
        }

        public ubytecContext(DbContextOptions<ubytecContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Afiliado> Afiliados { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Comentario> Comentarios { get; set; } = null!;
        public virtual DbSet<FotosProducto> FotosProductos { get; set; } = null!;
        public virtual DbSet<Gerente> Gerentes { get; set; } = null!;
        public virtual DbSet<Pedido> Pedidos { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<ProductoPedido> ProductoPedidos { get; set; } = null!;
        public virtual DbSet<Repartidor> Repartidors { get; set; } = null!;
        public virtual DbSet<TelefonoAfiliado> TelefonoAfiliados { get; set; } = null!;
        public virtual DbSet<TelefonoCliente> TelefonoClientes { get; set; } = null!;
        public virtual DbSet<TelefonoGerente> TelefonoGerentes { get; set; } = null!;
        public virtual DbSet<TelefonoRepartidor> TelefonoRepartidors { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=ubytec.postgres.database.azure.com;Database=ubytec;Username=ubytec@ubytec;Password=CE3110.2022.2");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("pg_buffercache")
                .HasPostgresExtension("pg_stat_statements");

            modelBuilder.Entity<Afiliado>(entity =>
            {
                entity.HasKey(e => e.CedulaJuridica)
                    .HasName("Afiliado_pkey");

                entity.ToTable("Afiliado");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.Cedula)
                    .HasName("Cliente_pkey");

                entity.ToTable("Cliente");
            });

            modelBuilder.Entity<Comentario>(entity =>
            {
                entity.HasKey(e => new { e.CedulaJafiliado, e.Comentario1 })
                    .HasName("Comentario_pkey");

                entity.ToTable("Comentario");

                entity.Property(e => e.CedulaJafiliado).HasColumnName("CedulaJAfiliado");

                entity.Property(e => e.Comentario1).HasColumnName("Comentario");

                entity.HasOne(d => d.CedulaJafiliadoNavigation)
                    .WithMany(p => p.Comentarios)
                    .HasForeignKey(d => d.CedulaJafiliado)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("Comentario_CedulaJAfiliado_fkey");
            });

            modelBuilder.Entity<FotosProducto>(entity =>
            {
                entity.HasKey(e => new { e.CedulaJafiliado, e.NombreProducto, e.Urlfoto })
                    .HasName("FotosProducto_pkey");

                entity.ToTable("FotosProducto");

                entity.Property(e => e.CedulaJafiliado).HasColumnName("CedulaJAfiliado");

                entity.Property(e => e.Urlfoto).HasColumnName("URLFoto");

                entity.HasOne(d => d.Producto)
                    .WithMany(p => p.FotosProductos)
                    .HasForeignKey(d => new { d.NombreProducto, d.CedulaJafiliado })
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FotosProducto_NombreProducto_fkey");
            });

            modelBuilder.Entity<Gerente>(entity =>
            {
                entity.HasKey(e => e.Usuario)
                    .HasName("Gerente_pkey");

                entity.ToTable("Gerente");

                entity.HasOne(d => d.CedulaJuridicaNavigation)
                    .WithMany(p => p.Gerentes)
                    .HasForeignKey(d => d.CedulaJuridica)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("Gerente_CedulaJuridica_fkey");
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(e => e.ComprobantePago)
                    .HasName("Pedido_pkey");

                entity.ToTable("Pedido");

                entity.HasIndex(e => e.Id, "Pedido_ID_key")
                    .IsUnique();

                entity.Property(e => e.CedulaJafiliado).HasColumnName("CedulaJAfiliado");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID")
                    .UseIdentityAlwaysColumn();

                entity.HasOne(d => d.CedulaClienteNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.CedulaCliente)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("Pedido_CedulaCliente_fkey");

                entity.HasOne(d => d.CedulaJafiliadoNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.CedulaJafiliado)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("Pedido_CedulaJAfiliado_fkey");

                entity.HasMany(d => d.CedulaRepartidors)
                    .WithMany(p => p.ComprobantePagos)
                    .UsingEntity<Dictionary<string, object>>(
                        "AsignarRepartidor",
                        l => l.HasOne<Repartidor>().WithMany().HasForeignKey("CedulaRepartidor").OnDelete(DeleteBehavior.Restrict).HasConstraintName("AsignarRepartidor_CedulaRepartidor_fkey"),
                        r => r.HasOne<Pedido>().WithMany().HasForeignKey("ComprobantePago").OnDelete(DeleteBehavior.Restrict).HasConstraintName("AsignarRepartidor_ComprobantePago_fkey"),
                        j =>
                        {
                            j.HasKey("ComprobantePago", "CedulaRepartidor").HasName("AsignarRepartidor_pkey");

                            j.ToTable("AsignarRepartidor");
                        });
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => new { e.NombreProducto, e.CedulaJafiliado })
                    .HasName("Producto_pkey");

                entity.ToTable("Producto");

                entity.Property(e => e.CedulaJafiliado).HasColumnName("CedulaJAfiliado");

                entity.HasOne(d => d.CedulaJafiliadoNavigation)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.CedulaJafiliado)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("Producto_CedulaJAfiliado_fkey");
            });

            modelBuilder.Entity<ProductoPedido>(entity =>
            {
                entity.HasKey(e => new { e.ComprobantePago, e.NombreProducto, e.CedulaJafiliado })
                    .HasName("ProductoPedido_pkey");

                entity.ToTable("ProductoPedido");

                entity.Property(e => e.CedulaJafiliado).HasColumnName("CedulaJAfiliado");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.HasOne(d => d.ComprobantePagoNavigation)
                    .WithMany(p => p.ProductoPedidos)
                    .HasForeignKey(d => d.ComprobantePago)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("ProductoPedido_ComprobantePago_fkey");

                entity.HasOne(d => d.Producto)
                    .WithMany(p => p.ProductoPedidos)
                    .HasForeignKey(d => new { d.NombreProducto, d.CedulaJafiliado })
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("ProductoPedido_NombreProducto_fkey");
            });

            modelBuilder.Entity<Repartidor>(entity =>
            {
                entity.HasKey(e => e.Cedula)
                    .HasName("Repartidor_pkey");

                entity.ToTable("Repartidor");
            });

            modelBuilder.Entity<TelefonoAfiliado>(entity =>
            {
                entity.HasKey(e => new { e.CedulaJuridica, e.Telefono })
                    .HasName("TelefonoAfiliado_pkey");

                entity.ToTable("TelefonoAfiliado");

                entity.HasOne(d => d.CedulaJuridicaNavigation)
                    .WithMany(p => p.TelefonoAfiliados)
                    .HasForeignKey(d => d.CedulaJuridica)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("TelefonoAfiliado_CedulaJuridica_fkey");
            });

            modelBuilder.Entity<TelefonoCliente>(entity =>
            {
                entity.HasKey(e => new { e.CedulaCliente, e.Telefono })
                    .HasName("TelefonoCliente_pkey");

                entity.ToTable("TelefonoCliente");

                entity.HasOne(d => d.CedulaClienteNavigation)
                    .WithMany(p => p.TelefonoClientes)
                    .HasForeignKey(d => d.CedulaCliente)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("TelefonoCliente_CedulaCliente_fkey");
            });

            modelBuilder.Entity<TelefonoGerente>(entity =>
            {
                entity.HasKey(e => new { e.Usuario, e.Telefono })
                    .HasName("Telefono Gerente_pkey");

                entity.ToTable("TelefonoGerente");

                entity.HasOne(d => d.UsuarioNavigation)
                    .WithMany(p => p.TelefonoGerentes)
                    .HasForeignKey(d => d.Usuario)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("TelefonoGerente_Usuario_fkey");
            });

            modelBuilder.Entity<TelefonoRepartidor>(entity =>
            {
                entity.HasKey(e => new { e.CedulaRepartidor, e.Telefono })
                    .HasName("TelefonoRepartidor_pkey");

                entity.ToTable("TelefonoRepartidor");

                entity.HasOne(d => d.CedulaRepartidorNavigation)
                    .WithMany(p => p.TelefonoRepartidors)
                    .HasForeignKey(d => d.CedulaRepartidor)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("TelefonoRepartidor_CedulaRepartidor_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
