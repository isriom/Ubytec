using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class GerentePa
    {
        public GerentePa()
        {
            TelefonoGerentePas = new HashSet<TelefonoGerentePa>();
        }

        public string Usuario { get; set; } = null!;
        public string? NombreCompleto { get; set; }
        public string? Distrito { get; set; }
        public string? Provincia { get; set; }
        public string? Canton { get; set; }
        public string? Contraseña { get; set; }
        public string CedulaJuridica { get; set; } = null!;

        public virtual AfiliadoPa CedulaJuridicaNavigation { get; set; } = null!;
        public virtual ICollection<TelefonoGerentePa> TelefonoGerentePas { get; set; }
    }
}
