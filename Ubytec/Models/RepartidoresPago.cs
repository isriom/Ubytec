using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class RepartidoresPago
    {
        public string? Repartidor { get; set; }
        public string? Afiliado { get; set; }
        public long? Count { get; set; }
        public decimal? Total { get; set; }
        public decimal? Ganancias { get; set; }
        public decimal? Pago { get; set; }
    }
}
