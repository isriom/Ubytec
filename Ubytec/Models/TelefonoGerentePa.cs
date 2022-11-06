using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class TelefonoGerentePa
    {
        public string Usuario { get; set; } = null!;
        public string Telefono { get; set; } = null!;

        public virtual GerentePa UsuarioNavigation { get; set; } = null!;
    }
}
