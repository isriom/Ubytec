using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class TelefonoGerente
    {
        public string Usuario { get; set; } = null!;
        public string Telefono { get; set; } = null!;

        public virtual Gerente UsuarioNavigation { get; set; } = null!;
    }
}
