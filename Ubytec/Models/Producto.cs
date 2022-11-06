using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Producto
    {
        public Producto()
        {
            FotosProductos = new HashSet<FotosProducto>();
            ProductoPedidos = new HashSet<ProductoPedido>();
        }

        public string NombreProducto { get; set; } = null!;
        public string CedulaJafiliado { get; set; } = null!;
        public string? Categoria { get; set; }
        public long Precio { get; set; }

        public virtual Afiliado CedulaJafiliadoNavigation { get; set; } = null!;
        public virtual ICollection<FotosProducto> FotosProductos { get; set; }
        public virtual ICollection<ProductoPedido> ProductoPedidos { get; set; }
    }
}
