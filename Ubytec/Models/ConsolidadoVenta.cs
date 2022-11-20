using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class ConsolidadoVenta
    {
        public string? Cliente { get; set; }
        public string? Nombre { get; set; }
        public long? Count { get; set; }
        public string? Repartidor { get; set; }
        public decimal? Precio { get; set; }
    }
}
