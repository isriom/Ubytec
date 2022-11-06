using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Pedido
    {
        public Pedido()
        {
            ProductoPedidos = new HashSet<ProductoPedido>();
            CedulaRepartidors = new HashSet<Repartidor>();
        }

        public string ComprobantePago { get; set; } = null!;
        public string Dirreccion { get; set; } = null!;
        public string EstadoPedido { get; set; } = null!;
        public long Id { get; set; }
        public long Monto { get; set; }
        public string CedulaJafiliado { get; set; } = null!;
        public string CedulaCliente { get; set; } = null!;

        public virtual Cliente CedulaClienteNavigation { get; set; } = null!;
        public virtual Afiliado CedulaJafiliadoNavigation { get; set; } = null!;
        public virtual ICollection<ProductoPedido> ProductoPedidos { get; set; }

        public virtual ICollection<Repartidor> CedulaRepartidors { get; set; }
    }
}
