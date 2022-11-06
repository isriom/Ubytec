using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class TelefonoRepartidor
    {
        public string CedulaRepartidor { get; set; } = null!;
        public string Telefono { get; set; } = null!;

        public virtual Repartidor CedulaRepartidorNavigation { get; set; } = null!;
    }
}
