using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class TelefonoCliente
    {
        public string CedulaCliente { get; set; } = null!;
        public string Telefono { get; set; } = null!;

        public virtual Cliente CedulaClienteNavigation { get; set; } = null!;
    }
}
