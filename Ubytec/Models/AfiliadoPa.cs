using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class AfiliadoPa
    {
        public AfiliadoPa()
        {
            GerentePas = new HashSet<GerentePa>();
            TelefonoAfiliadoPas = new HashSet<TelefonoAfiliadoPa>();
        }

        public string? Nombre { get; set; }
        public string CedulaJuridica { get; set; } = null!;
        public string? Distrito { get; set; }
        public string? Provincia { get; set; }
        public string? Canton { get; set; }
        public string? Sinpe { get; set; }
        public string? Correo { get; set; }

        public virtual ICollection<GerentePa> GerentePas { get; set; }
        public virtual ICollection<TelefonoAfiliadoPa> TelefonoAfiliadoPas { get; set; }
    }
}
