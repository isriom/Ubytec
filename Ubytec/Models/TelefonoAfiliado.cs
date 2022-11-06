using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class TelefonoAfiliado
    {
        public string CedulaJuridica { get; set; } = null!;
        public string Telefono { get; set; } = null!;

        public virtual Afiliado CedulaJuridicaNavigation { get; set; } = null!;
    }
}
