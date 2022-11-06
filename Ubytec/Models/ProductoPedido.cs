using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class ProductoPedido
    {
        public string ComprobantePago { get; set; } = null!;
        public string NombreProducto { get; set; } = null!;
        public string CedulaJafiliado { get; set; } = null!;
        public string? Cantidad { get; set; }

        public virtual Pedido ComprobantePagoNavigation { get; set; } = null!;
        public virtual Producto Producto { get; set; } = null!;
    }
}
