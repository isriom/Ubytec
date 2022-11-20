using System;
using System.Collections.Generic;

namespace Ubytec.Models
{
    public partial class Repartidor
    {
        public Repartidor()
        {
            TelefonoRepartidors = new HashSet<TelefonoRepartidor>();
            ComprobantePagos = new HashSet<Pedido>();
        }

        public string NombreCompleto { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public string Distrito { get; set; } = null!;
        public string Provincia { get; set; } = null!;
        public string Canton { get; set; } = null!;
        public string Usuario { get; set; } = null!;
        public string? Contraseña { get; set; }
        public bool? Disponible { get; set; }
        public string Correo { get; set; } = null!;

        public virtual ICollection<TelefonoRepartidor> TelefonoRepartidors { get; set; }

        public virtual ICollection<Pedido> ComprobantePagos { get; set; }
    }
}
