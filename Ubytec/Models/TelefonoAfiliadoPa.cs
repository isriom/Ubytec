using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class TelefonoAfiliadoPa
    {
        public string CedulaJuridica { get; set; } = null!;
        public string Telefono { get; set; } = null!;

        public virtual AfiliadoPa CedulaJuridicaNavigation { get; set; } = null!;
    }
}
