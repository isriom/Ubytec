using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Gerente
    {
        public Gerente()
        {
            TelefonoGerentes = new HashSet<TelefonoGerente>();
        }

        public string Usuario { get; set; } = null!;
        public string? NombreCompleto { get; set; }
        public string? Distrito { get; set; }
        public string? Provincia { get; set; }
        public string? Canton { get; set; }
        public string? Contraseña { get; set; }
        public string CedulaJuridica { get; set; } = null!;

        public virtual Afiliado CedulaJuridicaNavigation { get; set; } = null!;
        public virtual ICollection<TelefonoGerente> TelefonoGerentes { get; set; }
    }
}
