using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class VentasAfiliado
    {
        public string? Afiliado { get; set; }
        public long? Compras { get; set; }
        public decimal? Sum { get; set; }
        public decimal? MontoServicio { get; set; }
    }
}
